const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

async function getCryptoByTicker(ticker: string) {
  const params = {
    TableName: process.env.RATES_TABLE,
    KeyConditionExpression: 'ticker = :a',
    ExpressionAttributeValues: {
      ':a': ticker,
    },
  };
  try {
    const { Items } = await docClient.query(params).promise();
    return Items;
  } catch (err) {
    console.log('DynamoDB error: ', err);
  }
}

export default getCryptoByTicker;
