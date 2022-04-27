import {DB_NAME, DB_USER, DB_PASSWORD} from './index';


export default{
  development: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: "database-1.cyh4gbcafrph.us-east-1.rds.amazonaws.com", // AWS database URL
    dialect: "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
