import { Component, Inject, OnInit } from '@angular/core';
import { Apollo, gql, APOLLO_OPTIONS } from 'apollo-angular';

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
  rates: any[] = [];
  loading = true;
  error: any;

  // constructor(private apollo: Apollo, @Inject(APOLLO_OPTIONS) options: any) {
  //   console.log('options', options);
  // }
  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.apollo
      .watchQuery({
        query: RatePageQuery,
      })
      .valueChanges.subscribe((result: any) => {
        this.rates = result?.data?.rates;
        this.loading = result.loading;
        this.error = result.error;
      });
  }
}
