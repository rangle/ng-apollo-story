import * as cdk from '@aws-cdk/core';
import * as appsync from '@aws-cdk/aws-appsync';
import * as ddb from '@aws-cdk/aws-dynamodb';
import * as lambda from '@aws-cdk/aws-lambda';

export class RatesCdkAppStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Creates the AppSync API
    const api = new appsync.GraphqlApi(this, 'Api', {
      name: 'cdk-rates-appsync-api',
      schema: appsync.Schema.fromAsset('graphql/schema.graphql'),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.API_KEY,
          apiKeyConfig: {
            expires: cdk.Expiration.after(cdk.Duration.days(365)),
          },
        },
      },
      xrayEnabled: true,
    });

    // Prints out the AppSync GraphQL endpoint to the terminal
    new cdk.CfnOutput(this, 'GraphQLAPIURL', {
      value: api.graphqlUrl,
    });

    // Prints out the AppSync GraphQL API key to the terminal
    new cdk.CfnOutput(this, 'GraphQLAPIKey', {
      value: api.apiKey || '',
    });

    // Prints out the stack region to the terminal
    new cdk.CfnOutput(this, 'Stack Region', {
      value: this.region,
    });

    const ratesLambda = new lambda.Function(this, 'AppSyncRatesHandler', {
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: 'main.handler',
      code: lambda.Code.fromAsset('lambda-fns'),
      memorySize: 1024,
    });

    // Set the new Lambda function as a data source for the AppSync API
    const lambdaDs = api.addLambdaDataSource('lambdaDatasource', ratesLambda);

    lambdaDs.createResolver({
      typeName: 'Query',
      fieldName: 'getNoteById',
    });

    lambdaDs.createResolver({
      typeName: 'Query',
      fieldName: 'listNotes',
    });

    lambdaDs.createResolver({
      typeName: 'Mutation',
      fieldName: 'createNote',
    });

    lambdaDs.createResolver({
      typeName: 'Mutation',
      fieldName: 'deleteNote',
    });

    lambdaDs.createResolver({
      typeName: 'Mutation',
      fieldName: 'updateNote',
    });

    const notesTable = new ddb.Table(this, 'CDKNotesTable', {
      billingMode: ddb.BillingMode.PAY_PER_REQUEST,
      partitionKey: {
        name: 'id',
        type: ddb.AttributeType.STRING,
      },
    });
    // enable the Lambda function to access the DynamoDB table (using IAM)
    notesTable.grantFullAccess(ratesLambda);

    // Create an environment variable that we will use in the function code
    ratesLambda.addEnvironment('NOTES_TABLE', notesTable.tableName);
  }
}
