"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.COGNITO_USER_POOL_ID = exports.COGNITO_APP_SECRET_HASH = exports.COGNITO_APP_CLIENT_ID = exports.AWS_S3_BUCKET = exports.AWS_S3_SECRET_ACCESS_KEY = exports.AWS_S3_ACCESS_KEY_ID = exports.PREFIX_TABLE = exports.AWS_SECRET_ACCESS_KEY = exports.AWS_ACCESS_KEY = exports.AWS_REGION = exports.DB_HOST = exports.DB_PASSWORD = exports.DB_USER = exports.DB_DIALECT = exports.DB_NAME = exports.NODE_ENV = exports.PORTS = exports.PORT = void 0;
exports.PORT = process.env.PORT ? +process.env.PORT : 8080;
exports.PORTS = process.env.PORTS ? +process.env.PORTS : 8443;
exports.NODE_ENV = process.env.NODE_ENV
    ? process.env.NODE_ENV
    : "development";
exports.DB_NAME = process.env.DB_NAME
    ? process.env.DB_NAME
    : "aws-capstone-gp2";
exports.DB_DIALECT = process.env.DB_DIALECT
    ? process.env.DB_DIALECT
    : "mysql";
exports.DB_USER = process.env.DB_USER ? process.env.DB_USER : "root";
exports.DB_PASSWORD = process.env.DB_PASSWORD
    ? process.env.DB_PASSWORD
    : "root";
exports.DB_HOST = process.env.DB_HOST
    ? process.env.DB_HOST
    : "aws-capstone-gp2.cjkp3k2seo8m.us-east-1.rds.amazonaws.com";
exports.AWS_REGION = process.env.AWS_REGION
    ? process.env.AWS_REGION
    : "us-east-1";
exports.AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY
    ? process.env.AWS_ACCESS_KEY
    : "";
exports.AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY
    ? process.env.AWS_SECRET_ACCESS_KEY
    : "";
exports.PREFIX_TABLE = exports.NODE_ENV === "production" ? "" : "-DEV";
exports.AWS_S3_ACCESS_KEY_ID = process.env.AWS_S3_ACCESS_KEY_ID
    ? process.env.AWS_S3_ACCESS_KEY_ID
    : "";
exports.AWS_S3_SECRET_ACCESS_KEY = process.env.AWS_S3_SECRET_ACCESS_KEY
    ? process.env.AWS_S3_SECRET_ACCESS_KEY
    : "";
exports.AWS_S3_BUCKET = process.env.AWS_S3_BUCKET
    ? process.env.AWS_S3_BUCKET
    : "";
exports.COGNITO_APP_CLIENT_ID = process.env.COGNITO_APP_CLIENT_ID
    ? process.env.COGNITO_APP_CLIENT_ID
    : "";
exports.COGNITO_APP_SECRET_HASH = process.env.COGNITO_APP_SECRET_HASH
    ? process.env.COGNITO_APP_SECRET_HASH
    : "";
exports.COGNITO_USER_POOL_ID = process.env.COGNITO_USER_POOL_ID
    ? process.env.COGNITO_USER_POOL_ID
    : "";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
//# sourceMappingURL=index.js.map