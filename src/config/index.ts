/*
Here we define all our environment variables
*/

export const PORT: number = process.env.PORT ? +process.env.PORT : 8080;
export const PORTS: number = process.env.PORTS ? +process.env.PORTS : 8443;
export const NODE_ENV = process.env.NODE_ENV
  ? process.env.NODE_ENV
  : "development";
export const DB_NAME = process.env.DB_NAME
  ? process.env.DB_NAME
  : "aws-capstone-gp2";
export const DB_DIALECT = process.env.DB_DIALECT
  ? process.env.DB_DIALECT
  : "mysql";
export const DB_USER = process.env.DB_USER ? process.env.DB_USER : "root";
export const DB_PASSWORD = process.env.DB_PASSWORD
  ? process.env.DB_PASSWORD
  : "root";
export const DB_HOST = process.env.DB_HOST
  ? process.env.DB_HOST
  : "aws-capstone-gp2.cjkp3k2seo8m.us-east-1.rds.amazonaws.com";
export const AWS_REGION = process.env.AWS_REGION
  ? process.env.AWS_REGION
  : "us-east-1";
export const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY
  ? process.env.AWS_ACCESS_KEY
  : "";
export const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY
  ? process.env.AWS_SECRET_ACCESS_KEY
  : "";
export const PREFIX_TABLE = NODE_ENV === "production" ? "" : "-DEV";
export const AWS_S3_ACCESS_KEY_ID = process.env.AWS_S3_ACCESS_KEY_ID
  ? process.env.AWS_S3_ACCESS_KEY_ID
  : "";
export const AWS_S3_SECRET_ACCESS_KEY = process.env.AWS_S3_SECRET_ACCESS_KEY
  ? process.env.AWS_S3_SECRET_ACCESS_KEY
  : "";
export const AWS_S3_BUCKET = process.env.AWS_S3_BUCKET
  ? process.env.AWS_S3_BUCKET
  : "";
export const COGNITO_APP_CLIENT_ID = process.env.COGNITO_APP_CLIENT_ID
  ? process.env.COGNITO_APP_CLIENT_ID
  : "";
export const COGNITO_APP_SECRET_HASH = process.env.COGNITO_APP_SECRET_HASH
  ? process.env.COGNITO_APP_SECRET_HASH
  : "";
export const COGNITO_USER_POOL_ID = process.env.COGNITO_USER_POOL_ID
  ? process.env.COGNITO_USER_POOL_ID
  : "";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
