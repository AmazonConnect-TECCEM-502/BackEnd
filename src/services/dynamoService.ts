/*
  Authors: 
  Luis Ignacio Ferro Salinas

  Description:
  The configuration of the dynamoDB service for programmatic use
  is detailed in this file.

  Last update: 
  June 10th
*/


import dynamodb from 'dynamodb';
import { AWS_REGION, AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY } from '../config';

// SDK configuration.
dynamodb.AWS.config.update({
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    region: AWS_REGION
});

export default dynamodb;