import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { GetCryptoByTickerQuery } from '@nx-angular/apollo-story-data';
import * as d3 from 'd3';

type GraphData = {
  value: number;
  datetime: number;
};

@Component({
  selector: 'app-rates-graph',
  templateUrl: './rates-graph.component.html',
  styleUrls: ['./rates-graph.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatesGraphComponent implements OnInit, OnChanges {
  @Input() data?: GetCryptoByTickerQuery;

  private svg?: d3.Selection<any, any, any, any>;
  private x?: d3.ScaleTime<number, number>;
  private y?: d3.ScaleLinear<number, number>;

  private margin = 50;
  private width = 750 - this.margin * 2;
  private height = 400 - this.margin * 2;
  private size = 1;

  ngOnInit(): void {
    this.createSvg();
    this.drawAxis({ yMax: 1, yMin: 0 });
    this.drawData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['data'].currentValue !== changes['data'].previousValue &&
      this.data?.rates
    ) {
      this.drawData();
    }
  }

  private createSvg() {
    this.svg = d3
      .select('figure#rates-graph')
      .append('svg')
      .attr(
        'viewBox',
        `0 0 ${this.width + this.margin * 2} ${this.height + this.margin * 3}`
      )
      .append('g')
      .attr('transform', 'translate(' + this.margin + ',' + this.margin + ')');
  }

  private drawAxis({ yMax, yMin }: { yMax: number; yMin: number }) {
    const minDate = new Date(2021, 9, 31);
    const maxDate = new Date(2021, 10, 12);

    this.x = d3.scaleTime().domain([minDate, maxDate]).range([0, this.width]);

    this.y = d3.scaleLinear().domain([yMin, yMax]).range([this.height, 0]);

    this.svg
      ?.append('g')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3.axisBottom(this.x));

    this.svg?.append('g').call(d3.axisLeft(this.y));
  }

  private drawData = () => {
    if (this.data?.rates) {
      this.svg?.selectAll('*').remove();
      const { max, min } = this.findMaxMin(this.data?.rates, 'price');
      const tenPercent = (max - min) / 10;
      this.drawAxis({ yMax: max + tenPercent, yMin: min - tenPercent });
      this.updateData(
        this.data.rates.map((r) => ({
          datetime: r?.timeUpdated || 0,
          value: r?.price || 0,
        }))
      );
    }
  };

  private findMaxMin = (data: any, field: string) =>
    data?.reduce(
      (acc: any, curr: any) => {
        const max =
          acc.max === null ? curr[field] : Math.max(acc.max, curr[field] || 0);
        const min =
          acc.min === null ? curr[field] : Math.min(acc.min, curr[field] || 0);
        return { max, min };
      },
      { max: null, min: null }
    );

  private updateData(data: GraphData[]) {
    if (this.x && this.y) {
      let previous: GraphData | undefined;
      data.forEach((cryptoData) => {
        const color =
          (previous?.value || 0) > cryptoData.value ? 'red' : 'green';

        this.svg
          ?.append('line')
          .attr(
            'x1',
            (this.x as any)(
              new Date(previous ? previous.datetime : cryptoData.datetime)
            )
          )
          .attr(
            'y1',
            (this.y as any)(previous ? previous.value : cryptoData.value)
          )
          .attr('x2', (this.x as any)(new Date(cryptoData.datetime)))
          .attr('y2', (this.y as any)(cryptoData.value))
          .attr('stroke-width', 1)
          .attr('stroke', color);

        // this.svg
        //   ?.append('g')
        //   .append('circle')
        //   .attr('fill', color)
        //   .attr('cx', (d) => {
        //     return (this.x as any)(new Date(cryptoData.datetime));
        //   })
        //   .attr('cy', (d) => {
        //     return (this.y as any)(cryptoData.value);
        //   })
        //   .attr('r', this.size);
        previous = cryptoData;
      });
    }
  }
}
