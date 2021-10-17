import { makeExecutableSchema } from '@graphql-tools/schema';
import { addMocksToSchema } from '@graphql-tools/mock';
import { graphql } from 'graphql';
import * as fs from 'fs';

// Fill this in with the schema string
const schemaString = fs.readFileSync(
  'libs/apollo-story-data/src/lib/schemas/schema.graphql',
  'utf8'
);

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
