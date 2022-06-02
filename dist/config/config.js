"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
exports.default = {
    development: {
        username: index_1.DB_USER,
        password: index_1.DB_PASSWORD,
        database: index_1.DB_NAME,
        host: index_1.DB_HOST,
        dialect: "mysql",
    },
    test: {
        username: "root",
        password: null,
        database: "database_test",
        host: "127.0.0.1",
        dialect: "mysql",
    },
    production: {
        username: "root",
        password: null,
        database: "database_production",
        host: "127.0.0.1",
        dialect: "mysql",
    },
};
//# sourceMappingURL=config.js.map