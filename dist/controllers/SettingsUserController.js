"use strict";
/*
  Author: Eric Alexis Castañeda Bravo
  Description: Routes for the user settings

  Usage:
    Back end Routes
*/
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
class SettingsUserController extends AbstractController_1.default {
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new SettingsUserController("suc");
        return this.instance;
    }
    initRoutes() {
        this.router.post("/changeName", this.postChangeName.bind(this));
        this.router.post("/userData", this.postUserData.bind(this));
    }
    //Change the first and last name of the user on the data base
    postChangeName(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //First name
                if (req.body.first_name != "") {
                    yield models_1.default["User"].update({ first_name: req.body.first_name }, {
                        where: {
                            user_id: req.body.user_id,
                        },
                    });
                }
                //Last Name
                if (req.body.last_name != "") {
                    yield models_1.default["User"].update({ last_name: req.body.last_name }, {
                        where: {
                            user_id: req.body.user_id,
                        },
                    });
                }
                res.status(200).send("Mensaje recibido - Change Name");
            }
            catch (error) {
                console.log(error);
                res.status(500).send("Error fatal");
            }
        });
    }
    //Find the actual data of a user on the data base
    postUserData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let userData = yield models_1.default["User"].findOne({
                    where: { user_id: req.body.user_id },
                });
                console.log("Datos de usuario:", userData);
                res.status(200).send(userData);
            }
            catch (error) {
                console.log(error);
                res.status(500).send("Error fatal");
            }
        });
    }
}
exports.default = SettingsUserController;
//# sourceMappingURL=SettingsUserController.js.map