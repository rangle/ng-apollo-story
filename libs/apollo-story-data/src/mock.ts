import { makeExecutableSchema } from '@graphql-tools/schema';
import { addMocksToSchema } from '@graphql-tools/mock';
import { graphql } from 'graphql';
import * as casual from 'casual';
import * as fs from 'fs';

// Fill this in with the schema string
const schemaString = fs.readFileSync(
  'libs/apollo-story-data/src/lib/schemas/schema.graphql',
  'utf8'
);

const operation = fs.readFileSync(
  'libs/apollo-story-data/src/lib/graphql/ratesPage.graphql',
  'utf8'
);

const oneMonth = 30 * 24 * 60 * 60 * 1000;

const mocks = {
  Note: () => ({
    id: casual.integer(1, 100).toString(),
    name: casual.string,
    completed: casual.boolean,
  }),
  Rate: () => ({
    timeUpdated: casual.integer(Date.now() - oneMonth, Date.now()),
    price: casual.double(0, 100),
  }),
  Query: {
    getTickers: () => ['CRO', 'BTC'],
    getCryptoByTicker: () => [...new Array(casual.integer(100, 100))],
  },
};

const resolvers = {
  Query: {
    getTickers: ['CRO', 'BTC'],
  },
};

// Make a GraphQL schema with no resolvers
const schema = makeExecutableSchema({ typeDefs: schemaString });

// Create a new schema with mocks
const schemaWithMocks = addMocksToSchema({ schema, mocks, resolvers });

const query = operation;

graphql(schemaWithMocks, query, undefined, undefined, {
  ticker: 'CRO',
  granularity: 'DAY',
})
  .then((result) => ({
    ...result,
    data: {
      ...result.data,
      rates: result?.data?.rates.sort(
        (a: any, b: any) => a.timeUpdated - b.timeUpdated
      ),
    },
  }))
  .then((result) => console.log(JSON.stringify(result)));
