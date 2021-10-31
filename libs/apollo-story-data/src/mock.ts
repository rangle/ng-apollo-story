import { makeExecutableSchema } from '@graphql-tools/schema';
import { addMocksToSchema } from '@graphql-tools/mock';
import { graphql } from 'graphql';
import * as casual from 'casual';
import * as fs from 'fs';

// Fill this in with the schema string
const schemaString = fs.readFileSync(
  'libs/apollo-story-data/src/lib/schemas/custom.graphql',
  'utf8'
);

const mocks = {
  Note: () => ({
    id: casual.integer(1, 100).toString(),
    name: casual.string,
    completed: casual.boolean,
  }),
};

// Make a GraphQL schema with no resolvers
const schema = makeExecutableSchema({ typeDefs: schemaString });

// Create a new schema with mocks
const schemaWithMocks = addMocksToSchema({ schema, mocks });

const query = /* GraphQL */ `
  query getNotes {
    listNotes {
      id
      name
      completed
    }
  }
`;

graphql(schemaWithMocks, query).then((result) =>
  console.log(JSON.stringify(result))
);
