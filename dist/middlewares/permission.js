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
// Models
const user_1 = require("../models/user");
const models_1 = __importDefault(require("../models"));
class PermissionMiddleware {
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new PermissionMiddleware();
        return this.instance;
    }
    /**
     * Verify that the current user is a Supervisor
     */
    checkIsSupervisor(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield models_1.default["User"].findOne({
                    where: {
                        email: req.user,
                    },
                    attributes: ["user_type"],
                });
                if (user.user_type === user_1.UserRoles.MANAGER) {
                    next();
                }
                else {
                    res.status(401).send({
                        code: "UserNotSupervisorException",
                        message: "The logged account is not an supervisor",
                    });
                }
            }
            catch (error) {
                res.status(500).send({ code: error.code, message: error.message });
            }
        });
    }
    /**
     * Verify that the current user is an admin
     */
    checkIsAdmin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield models_1.default["User"].findOne({
                    where: {
                        email: req.user,
                    },
                    attributes: ["user_type"],
                });
                if (user.attrs.role === user_1.UserRoles.ADMIN) {
                    next();
                }
                else {
                    res.status(401).send({
                        code: "UserNotAdminException",
                        message: "The logged account is not an admin",
                    });
                }
            }
            catch (error) {
                res.status(500).send({ code: error.code, message: error.message });
            }
        });
    }
}
exports.default = PermissionMiddleware;
//# sourceMappingURL=permission.js.map