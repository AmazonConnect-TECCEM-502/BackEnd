"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dynamoService_1 = __importDefault(require("../services/dynamoService"));
const joi_1 = __importDefault(require("joi"));
const config_1 = require("../config");
const CallsStatusModel = dynamoService_1.default.define('callsStatus', {
    hashKey: 'phoneNumber',
    timestamps: true,
    schema: {
        phoneNumber: joi_1.default.string().required(),
        authenticationType: joi_1.default.string().required()
    },
    tableName: `CallsStatus${config_1.PREFIX_TABLE}`
});
dynamoService_1.default.createTables((err) => {
    if (err)
        return console.log('Error al crear la tabla', err);
    console.log('Tabla creada exitosamente');
});
exports.default = CallsStatusModel;
//# sourceMappingURL=callsStatus.js.map