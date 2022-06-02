"use strict";
/*
  Authors:
  Luis Ignacio Ferro Salinas
  Eric Alexis Castañeda Bravo
  Description: Routes for the voice ID

  Usage:
    Back end Routes

  Last update:
  Luis Ferro may 31
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
const callsStatus_1 = __importDefault(require("../modelsNOSQL/callsStatus"));
class VIDUserController extends AbstractController_1.default {
    //private phoneNumber: string = "";
    //private authenticationType = "Not yet"; // si no no registrado
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new VIDUserController("vid");
        return this.instance;
    }
    initRoutes() {
        this.router.post("/sendAuthRes", this.postSendAuthRes.bind(this));
        this.router.post("/getAuthRes", this.getAuthRes.bind(this));
        this.router.post("/getUserData", this.getUserData.bind(this));
        this.router.post("/sendClientData", this.postSendClientData.bind(this));
        this.router.post("/reset", this.postReset.bind(this));
        //this.router.post("/uploadCall", this.postUploadVideo.bind(this));
    }
    postSendAuthRes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("El teléfono del usuario es: ");
                console.log(req.body.phoneNumber);
                console.log("Resultado de autenticación: ");
                console.log(req.body.authenticationType);
                // Receiving info from voiceID and storing it in dynamoDB.
                yield callsStatus_1.default.create({ phoneNumber: req.body.phoneNumber,
                    authenticationType: req.body.authenticationType });
                res.status(200).send("Mensaje recibido");
            }
            catch (error) {
                console.log(error);
                res.status(500).send("Error fatal");
            }
        });
    }
    postReset(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield callsStatus_1.default.update({ phoneNumber: req.body.phoneNumber, authenticationType: "not yet" });
                res.status(200).send("Orden de resetear recibida");
            }
            catch (error) {
                console.log(error);
                res.status(500).send("Error fatal");
            }
        });
    }
    //get the info of one user
    getUserData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let userData = yield models_1.default["Client"].findOne({
                    where: { phone: req.body.phoneNumber },
                });
                console.log("Datos de usuario:", userData);
                res.status(200).send(userData);
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).send({ message: error.message });
                }
                else {
                    res.status(501).send({ message: "Error externo" });
                }
            }
        });
    }
    getAuthRes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Depending on the phone number given by the agent, we
                // search for authentication results in dynamoDB.
                const callPhoneNumber = req.body.phoneNumber;
                const callsStatus = yield callsStatus_1.default.query(callPhoneNumber).exec().promise();
                console.log("Enviando autenticación al front");
                res.status(200).send(callsStatus[0].Items[0]); // This is the json with phone and authType.
            }
            catch (error) {
                console.log(error);
                res.status(500).send("Error fatal");
            }
        });
    }
    //Create a new client on the data base
    postSendClientData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield models_1.default["Client"].create({
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    email: req.body.email,
                    phone: req.body.phone,
                });
                console.log("Registo exitoso");
                res.status(200).send("Registro exitoso");
            }
            catch (error) {
                console.log(error);
                res.status(500).send("Error fatal");
            }
        });
    }
}
exports.default = VIDUserController;
//# sourceMappingURL=VIDUserController.js.map