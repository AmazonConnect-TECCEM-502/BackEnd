"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Server_1 = __importDefault(require("./providers/Server"));
const config_1 = require("./config");
const config_2 = require("./config");
// Importa middlewares
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// Importa controllers
const UserController_1 = __importDefault(require("./controllers/UserController"));
const CallController_1 = __importDefault(require("./controllers/CallController"));
const VIDUserController_1 = __importDefault(require("./controllers/VIDUserController"));
const ProblemCategoryController_1 = __importDefault(require("./controllers/ProblemCategoryController"));
const SalesController_1 = __importDefault(require("./controllers/SalesController"));
const ProductCategoryController_1 = __importDefault(require("./controllers/ProductCategoryController"));
const SettingsUserController_1 = __importDefault(require("./controllers/SettingsUserController"));
const AuthenticationController_1 = __importDefault(require("./controllers/AuthenticationController"));
const app = new Server_1.default({
    port: config_1.PORT,
    portS: config_2.PORTS,
    middlewares: [express_1.default.json(), express_1.default.urlencoded({ extended: true }), (0, cors_1.default)()],
    controllers: [
        UserController_1.default.getInstance(),
        CallController_1.default.getInstance(),
        VIDUserController_1.default.getInstance(),
        ProblemCategoryController_1.default.getInstance(),
        SalesController_1.default.getInstance(),
        ProductCategoryController_1.default.getInstance(),
        SettingsUserController_1.default.getInstance(),
        AuthenticationController_1.default.getInstance(),
    ],
    env: config_1.NODE_ENV,
});
app.init();
//# sourceMappingURL=index.js.map