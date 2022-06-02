"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
//Middlewares
const validationError_1 = __importDefault(require("../middlewares/validationError"));
const authorization_1 = __importDefault(require("../middlewares/authorization"));
const permission_1 = __importDefault(require("../middlewares/permission"));
//Services
const cognitoService_1 = __importDefault(require("../services/cognitoService"));
class AbstractController {
    constructor(prefix) {
        this._router = (0, express_1.Router)();
        this.handleErrors = validationError_1.default.handleErrors;
        this.authMiddleware = authorization_1.default.getInstance();
        this.permissionMiddleware = permission_1.default.getInstance();
        this.cognitoService = cognitoService_1.default.getInstance();
        this._prefix = prefix;
        this.initRoutes();
    }
    get prefix() {
        return this._prefix;
    }
    get router() {
        return this._router;
    }
}
exports.default = AbstractController;
//# sourceMappingURL=AbstractController.js.map