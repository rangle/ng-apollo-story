const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

const minutesInADay = 1440;

async function getCryptoByTicker(ticker: string, granularity: string) {
  const params = {
    TableName: process.env.RATES_TABLE,
    KeyConditionExpression: 'ticker = :a',
    ExpressionAttributeValues: {
      ':a': ticker,
    },
  };
  try {
    const { Items } = await docClient.query(params).promise();
    if (granularity === 'DAY') {
      return Items.filter(
        (_: any, i: number) => i % (minutesInADay / 10) === 0
      );
    }
    if (granularity === 'HOUR') {
      return Items.filter((_: any, i: number) => i % 6 === 0);
    }
    return Items;
  } catch (err) {
    console.log('DynamoDB error: ', err);
  }
}

export default getCryptoByTicker;
