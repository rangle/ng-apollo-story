import { MockedProvider } from '@apollo/client/testing'; // Use for Apollo Version 3+

export const parameters = {
  apolloClient: {
    MockedProvider,
    // any props you want to pass to MockedProvider on every story
  },
};
