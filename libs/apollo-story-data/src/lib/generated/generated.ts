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
};

export type Mutation = {
  __typename?: 'Mutation';
  deleteNote?: Maybe<Scalars['String']>;
  updateNote?: Maybe<Note>;
};


export type MutationDeleteNoteArgs = {
  noteId: Scalars['String'];
};


export type MutationUpdateNoteArgs = {
  note: UpdateNoteInput;
};

export type Note = {
  __typename?: 'Note';
  completed: Scalars['Boolean'];
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type NoteInput = {
  completed: Scalars['Boolean'];
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getCryptoByTicker?: Maybe<Array<Maybe<Rate>>>;
  getTickers?: Maybe<Array<Maybe<Scalars['String']>>>;
  listNotes?: Maybe<Array<Maybe<Note>>>;
};


export type QueryGetCryptoByTickerArgs = {
  ticker: Scalars['String'];
};

export type Rate = {
  __typename?: 'Rate';
  name: Scalars['String'];
  price: Scalars['Float'];
  priceCad: Scalars['Float'];
  rank: Scalars['Int'];
  ticker: Scalars['String'];
  timeUpdated: Scalars['Float'];
  volume: Scalars['Float'];
  volumeChange: Scalars['Float'];
};

export type UpdateNoteInput = {
  completed?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
};

export type GetNotesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetNotesQuery = { __typename?: 'Query', listNotes?: Maybe<Array<Maybe<{ __typename?: 'Note', id: string, name: string, completed: boolean }>>> };

export type GetCryptoByTickerQueryVariables = Exact<{
  ticker: Scalars['String'];
}>;


export type GetCryptoByTickerQuery = { __typename?: 'Query', tickers?: Maybe<Array<Maybe<string>>>, rates?: Maybe<Array<Maybe<{ __typename?: 'Rate', price: number, timeUpdated: number }>>> };

export const GetNotesDocument = gql`
    query getNotes {
  listNotes {
    id
    name
    completed
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetNotesGQL extends Apollo.Query<GetNotesQuery, GetNotesQueryVariables> {
    document = GetNotesDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetCryptoByTickerDocument = gql`
    query getCryptoByTicker($ticker: String!) {
  rates: getCryptoByTicker(ticker: $ticker) {
    price
    timeUpdated
  }
  tickers: getTickers
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetCryptoByTickerGQL extends Apollo.Query<GetCryptoByTickerQuery, GetCryptoByTickerQueryVariables> {
    document = GetCryptoByTickerDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }