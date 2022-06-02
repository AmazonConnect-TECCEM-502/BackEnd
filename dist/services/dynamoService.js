"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dynamodb_1 = __importDefault(require("dynamodb"));
const config_1 = require("../config");
//Configuración del SDK de AWS
dynamodb_1.default.AWS.config.update({
    accessKeyId: config_1.AWS_ACCESS_KEY,
    secretAccessKey: config_1.AWS_SECRET_ACCESS_KEY,
    region: config_1.AWS_REGION
});
exports.default = dynamodb_1.default;
//# sourceMappingURL=dynamoService.js.map