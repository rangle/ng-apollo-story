import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-rates-graph',
  templateUrl: './rates-graph.component.html',
  styleUrls: ['./rates-graph.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatesGraphComponent implements OnInit {
  private svg?: d3.Selection<any, any, any, any>;
  private margin = 50;
  private width = 750 - this.margin * 2;
  private height = 400 - this.margin * 2;

  ngOnInit(): void {
    this.createSvg();
    console.log(this.svg);
  }

  private createSvg() {
    this.svg = d3
      .select('figure#rates-graph')
      .append('svg')
      .attr(
        'viewBox',
        `0 0 ${this.width + this.margin} ${this.height + this.margin}`
      )
      .append('g')
      .attr('transform', 'translate(' + this.margin + ',' + this.margin + ')');
  }
}
