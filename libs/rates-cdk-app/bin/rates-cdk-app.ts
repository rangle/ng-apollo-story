#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { RatesCdkAppStack } from '../lib/rates-cdk-app-stack';
import * as dotenv from 'dotenv';

dotenv.config();

const app = new cdk.App();
new RatesCdkAppStack(app, 'RatesCdkAppStack', {
  CRYPTO_API_KEY: process.env.CRYPTO_API_KEY,
});
