import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export enum CacheControlScope {
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export type ExchangeRate = {
  __typename?: 'ExchangeRate';
  currency?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  rate?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  rates?: Maybe<Array<Maybe<ExchangeRate>>>;
};


export type QueryRatesArgs = {
  currency: Scalars['String'];
};

export type GetCurrencyQueryVariables = Exact<{
  currency: Scalars['String'];
}>;


export type GetCurrencyQuery = { __typename?: 'Query', rates?: Maybe<Array<Maybe<{ __typename?: 'ExchangeRate', name?: Maybe<string>, currency?: Maybe<string>, rate?: Maybe<string> }>>> };

export const GetCurrencyDocument = gql`
    query getCurrency($currency: String!) {
  rates: rates(currency: $currency) {
    name
    currency
    rate
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetCurrencyGQL extends Apollo.Query<GetCurrencyQuery, GetCurrencyQueryVariables> {
    document = GetCurrencyDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }