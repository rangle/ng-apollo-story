import { Component, OnInit, Query } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { ExchangeRate, GetCurrencyGQL } from '@nx-angular/apollo-story-data';

export const RatePageQuery = gql`
  {
    rates(currency: "USD") {
      currency
      rate
    }
  }
`;

@Component({
  selector: 'nx-angular-rates',
  templateUrl: './rates.component.html',
  styleUrls: ['./rates.component.css'],
})
export class RatesComponent implements OnInit {
  rates: ExchangeRate[] = [];
  loading = true;
  error: any;

  constructor(private apollo: Apollo, private getCurrencyGQL: GetCurrencyGQL) {}

  ngOnInit() {
    this.apollo
      .watchQuery({
        query: RatePageQuery,
      })
      .valueChanges.subscribe((result) => {
        const data = result.data as { rates?: ExchangeRate[] };
        this.rates = data?.rates || [];
        this.loading = result.loading;
        this.error = result.error;
      });

    this.getCurrencyGQL.fetch({ currency: 'USD' }).subscribe((result) => {
      console.log(result);
    });
  }
}
