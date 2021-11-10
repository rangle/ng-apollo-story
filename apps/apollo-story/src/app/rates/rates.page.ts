import { Component } from '@angular/core';
import {
  GetCryptoByTickerGQL,
  Granularity,
} from '@nx-angular/apollo-story-data';

@Component({
  selector: 'app-rates-page',
  templateUrl: './rates.page.html',
})
export class RatesPageComponent {
  ratesData$;

  currentTicker = 'CRO';
  granularity = Granularity.Hour;

  constructor(private getCryptoByTicker: GetCryptoByTickerGQL) {
    this.ratesData$ = this.getCryptoByTicker.fetch({
      ticker: 'CRO',
      granularity: this.granularity,
    });
  }

  onTickerChange(ticker: string) {
    this.currentTicker = ticker;
    this.ratesData$ = this.getCryptoByTicker.fetch({
      ticker,
      granularity: this.granularity,
    });
  }
}
