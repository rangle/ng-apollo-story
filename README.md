# Apollo Story

[![Netlify Status](https://api.netlify.com/api/v1/badges/283a795e-4253-42c2-be70-2d6f5b709cd1/deploy-status)](https://app.netlify.com/sites/ng-apollo-story/deploys)

[Preview Site](https://ng-apollo-story.netlify.app/)

This project was generated using [Nx](https://nx.dev).

[Nx Documentation](https://nx.dev/angular)

## Development server

Run `ng serve apollo-story` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Storybook

Run `nx run apollo-story:storybook` to build and run Storybook. Navigate to http://localhost:4400/.

## Code Gen

Run `nx run apollo-story-data:generate` to generate GraphQL schemas and mock data.

GraphQL Code Generator: https://www.graphql-code-generator.com/docs/getting-started/codegen-config
GraphQL Tools Mocking Documentation: https://www.graphql-tools.com/docs/mocking

## Build

Run `ng build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `ng e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

## Understand your workspace

Run `nx dep-graph` to see a diagram of the dependencies of your projects.

## Updating configuration

Run `nx migrate latest` to update to the latest version of libraries being used in the project.
