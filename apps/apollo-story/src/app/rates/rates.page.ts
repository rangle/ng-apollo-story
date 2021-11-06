import { Component } from '@angular/core';
import { GetCryptoByTickerGQL } from '@nx-angular/apollo-story-data';

@Component({
  selector: 'app-rates-page',
  templateUrl: './rates.page.html',
})
export class RatesPageComponent {
  ratesData$;

  constructor(private getCryptoByTicker: GetCryptoByTickerGQL) {
    this.ratesData$ = this.getCryptoByTicker.fetch({ ticker: 'ETH' });
  }
}
