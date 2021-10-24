import { Component } from '@angular/core';
import { GetCurrencyGQL } from '@nx-angular/apollo-story-data';

@Component({
  selector: 'app-rates-page',
  templateUrl: './rates.page.html',
})
export class RatesPageComponent {
  rateData$;

  constructor(private getCurrencyGQL: GetCurrencyGQL) {
    this.rateData$ = this.getCurrencyGQL.fetch({ currency: 'USD' });
  }
}
