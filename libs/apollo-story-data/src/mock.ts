import { makeExecutableSchema } from '@graphql-tools/schema';
import { addMocksToSchema } from '@graphql-tools/mock';
import { graphql } from 'graphql';

// Fill this in with the schema string
const schemaString = `""""""
directive @cacheControl on FIELD_DEFINITION | OBJECT | INTERFACE
""""""
type Query {
  """"""
  rates("""""" currency: String!): [ExchangeRate]
}
""""""
type ExchangeRate {
  """"""
  currency: String
  """"""
  rate: String
  """"""
  name: String
}
enum CacheControlScope {
  """"""
  PUBLIC
  """"""
  PRIVATE
}
"""The \`Upload\` scalar type represents a file upload."""
scalar Upload
`;

const mocks = {
  ExchangeRate: () => ({
    currency: 'USD',
    rate: '1.0',
    name: 'United States Dollar',
  }),
};

// Make a GraphQL schema with no resolvers
const schema = makeExecutableSchema({ typeDefs: schemaString });

// Create a new schema with mocks
const schemaWithMocks = addMocksToSchema({ schema, mocks });

const query = /* GraphQL */ `
  query getCurrency {
    rates: rates(currency: "USD") {
      name
      currency
      rate
    }
  }
`;

graphql(schemaWithMocks, query).then((result) =>
  console.log(JSON.stringify(result))
);
