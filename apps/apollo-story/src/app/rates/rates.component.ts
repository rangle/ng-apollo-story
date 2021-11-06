import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client';
import { GetCryptoByTickerQuery } from '@nx-angular/apollo-story-data';

@Component({
  selector: 'app-rates',
  templateUrl: './rates.component.html',
  styleUrls: ['./rates.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatesComponent {
  @Input() ratesData?: ApolloQueryResult<GetCryptoByTickerQuery> | null;
}
