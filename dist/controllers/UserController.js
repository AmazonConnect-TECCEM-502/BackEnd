"use strict";
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
const AbstractController_1 = __importDefault(require("./AbstractController"));
const models_1 = __importDefault(require("../models"));
class UserController extends AbstractController_1.default {
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new UserController("user");
        return this.instance;
    }
    // Declaración rutas del controlador
    initRoutes() {
        this.router.get("/readUser", this.getReadUser.bind(this));
        this.router.get("/readUsers", this.getReadUsers.bind(this));
        this.router.get("/readAgents", this.getReadAgents.bind(this));
        this.router.get("/userType", this.authMiddleware.verifyToken, this.getUserType.bind(this));
        // Agregar más rutas
    }
    getReadUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.status(200).send({ data: "User" });
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(500).send({ message: err.message });
                }
                else {
                    res.status(501).send({ message: "Error externo" });
                }
            }
        });
    }
    getReadUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    getReadAgents(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let agent = yield models_1.default.sequelize.query("SELECT first_name, last_name FROM User WHERE user_type like 'agent%'", {
                    model: models_1.default["User"],
                    mapToModel: true,
                });
                //let agent2 = await db["User"].findAll();
                res.status(200).send(agent);
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
    }
    getUserType(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield models_1.default["User"].findOne({
                where: {
                    cognito_uuid: req.user,
                },
            });
            if (user != null) {
                res.status(200).json({
                    email: user.email,
                    user_type: user.user_type,
                });
            }
            else {
                res.status(401).json({
                    error: "Authentication error",
                });
            }
        });
    }
}
exports.default = UserController;
//# sourceMappingURL=UserController.js.map