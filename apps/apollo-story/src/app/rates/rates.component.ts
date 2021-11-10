import {
  Component,
  ChangeDetectionStrategy,
  Input,
  EventEmitter,
  Output,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApolloQueryResult } from '@apollo/client';
import { GetCryptoByTickerQuery } from '@nx-angular/apollo-story-data';

@Component({
  selector: 'app-rates',
  templateUrl: './rates.component.html',
  styleUrls: ['./rates.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatesComponent implements OnChanges {
  @Input() ratesData?: ApolloQueryResult<GetCryptoByTickerQuery> | null;
  @Input() currentTicker?: string;

  @Output() tickerChange = new EventEmitter<string>();

  rateForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.rateForm = this.formBuilder.group({
      ticker: [this.currentTicker || ''],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.currentTicker) {
      this.rateForm?.patchValue({ ticker: changes.currentTicker.currentValue });
    }
  }

  updateTicker(): void {
    this.tickerChange.emit(this.rateForm.value.ticker);
  }
}
