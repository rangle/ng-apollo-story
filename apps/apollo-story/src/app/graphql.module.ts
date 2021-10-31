import { NgModule } from '@angular/core';
import { APOLLO_OPTIONS } from 'apollo-angular';
import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync';
import { environment } from '../environments/environment';

@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: () => {
        return new AWSAppSyncClient({
          disableOffline: true,
          url: environment.graphql_url || '',
          region: 'us-east-2',
          auth: {
            type: AUTH_TYPE.API_KEY,
            apiKey: environment.graphql_key || '',
          },
        });
        // return {
        //   cache: new InMemoryCache(),
        //   link: httpLink.create({
        //     uri: 'https://48p1r2roz4.sse.codesandbox.io',
        //   }),
        // };
      },
    },
  ],
})
export class GraphQLModule {}
