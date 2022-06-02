"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const https_1 = __importDefault(require("https"));
const models_1 = __importDefault(require("../models"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
var privateKey = fs.readFileSync(path.join(__dirname, './../sslcert/privatekey.pem'), 'utf8');
var certificate = fs.readFileSync(path.join(__dirname, './../sslcert/server.crt'), 'utf8');
var credentials = {
    key: privateKey,
    cert: certificate
    //En caso de que protejan su llave agreguen el atributo passphrase: '<su frase>'
};
class Server {
    constructor(appInit) {
        this.app = (0, express_1.default)();
        this.port = appInit.port;
        this.portS = appInit.portS;
        this.env = appInit.env;
        this.loadMiddlewares(appInit.middlewares);
        this.loadRoutes(appInit.controllers);
        this.databases();
    }
    loadRoutes(controllers) {
        // Página prueba
        this.app.get("/", (_, res) => {
            res.status(200).send({
                message: "The backend is working",
                documentation: "https://github.com/AmazonConnect-TECCEM-502/amazonconnect-backend/wiki",
            });
        });
        // Agregar controladores
        controllers.forEach((controller) => {
            this.app.use(`/${controller.prefix}`, controller.router);
        });
    }
    // Agregar Middleware
    loadMiddlewares(middlewares) {
        middlewares.forEach((middleware) => {
            this.app.use(middleware);
        });
    }
    // Agregar conexion a bd
    databases() {
        return __awaiter(this, void 0, void 0, function* () {
            yield models_1.default.sequelize.sync();
            // console.log("Termino ? :S")
        });
    }
    init() {
        this.httpsServer = https_1.default.createServer(credentials, this.app);
        this.app.listen(this.port, () => {
            console.log(`Server running @'http://localhost:${this.port}'`);
        });
        this.httpsServer.listen(8443, () => console.log("Corriendo HTTPS 8443"));
    }
}
exports.default = Server;
//# sourceMappingURL=Server.js.map