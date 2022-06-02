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
class ManagerController extends AbstractController_1.default {
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ManagerController("Manager");
        return this.instance;
    }
    // Rutas
    initRoutes() {
        this.router.get("/getManagers", this.getManagers.bind(this));
    }
    getManagers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.body);
            }
            catch (_a) { }
        });
    }
}
//# sourceMappingURL=ManagerController.js.map