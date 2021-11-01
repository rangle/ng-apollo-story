const AWS = require('aws-sdk');
const fetch = require('node-fetch');
import Rate from './Rate';

const docClient = new AWS.DynamoDB.DocumentClient();
const CRYPTO_API_KEY = process.env.CRYPTO_API_KEY;

export const handler = async () => {
  const response = await fetch(
    'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
    { headers: { 'X-CMC_PRO_API_KEY': CRYPTO_API_KEY } }
  );
  const result: any = await response.json();

  const fxResponse = await fetch(
    'https://www.bankofcanada.ca/valet/observations/FXUSDCAD?recent=1'
  );
  const fxResult: any = await fxResponse.json();
  const fxRate = fxResult.observations[0].FXUSDCAD.v;

  const filtered = result.data
    .map((item: any) => ({
      ticker: item.symbol,
      timeUpdated: Date.now(),
      name: item.name,
      rank: item.cmc_rank,
      volume: item.quote.USD.volume_24h,
      volumeChange: item.quote.USD.percent_change_24h,
      price: item.quote.USD.price,
      priceCad: item.quote.USD.price * fxRate,
    }))
    .filter((item: Rate) =>
      ['BTC', 'ETH', 'ADA', 'CRO', 'AXS'].includes(item.ticker)
    );

  const params = {
    RequestItems: {
      [(process.env.RATES_TABLE as string) || '']: filtered.map(
        (item: any) => ({
          PutRequest: {
            Item: {
              ticker: item.ticker,
              timeUpdated: item.timeUpdated,
              name: item.name,
              rank: item.rank,
              volume: item.volume,
              volumeChange: item.volumeChange,
              price: item.price,
              priceCad: item.priceCad,
            },
          },
        })
      ),
    },
  };

  try {
    await docClient.batchWrite(params).promise();
    return filtered;
  } catch (err) {
    console.log('DynamoDB error: ', err);
    return null;
  }
};
