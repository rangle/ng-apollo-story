import { Component, OnInit } from '@angular/core';
import { ExchangeRate, GetCurrencyGQL } from '@nx-angular/apollo-story-data';

@Component({
  selector: 'nx-angular-rates',
  templateUrl: './rates.component.html',
  styleUrls: ['./rates.component.css'],
})
export class RatesComponent implements OnInit {
  rates: ExchangeRate[] = [];
  loading = true;
  error: any;

  constructor(private getCurrencyGQL: GetCurrencyGQL) {}

  ngOnInit() {
    this.getCurrencyGQL.fetch({ currency: 'USD' }).subscribe((result) => {
      const data = result.data as { rates?: ExchangeRate[] };
      this.rates = data?.rates || [];
      this.loading = result.loading;
      this.error = result.error;
    });
  }
}
