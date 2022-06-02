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
const express_validator_1 = require("express-validator");
const AbstractController_1 = __importDefault(require("./AbstractController"));
const models_1 = __importDefault(require("../models"));
class AuthenticationController extends AbstractController_1.default {
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new AuthenticationController("auth");
        return this.instance;
    }
    initRoutes() {
        this.router.post("/signup", this.validateBody("signup"), this.handleErrors, this.signup.bind(this));
        this.router.post("/signin", this.validateBody("signin"), this.handleErrors, this.signin.bind(this));
        this.router.post("/verify", this.validateBody("verify"), this.handleErrors, this.verify.bind(this));
        this.router.get("/readUsers", this.handleErrors, this.getReadUsers.bind(this));
    }
    signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const first_name = req.body.first_name;
            const last_name = req.body.last_name;
            const email = req.body.email;
            const user_type = req.body.user_type;
            const manager_id = req.body.manager_id;
            const password = req.body.password;
            try {
                // Create Cognito User
                const user = yield this.cognitoService.signUpUser(email, password, [
                    {
                        Name: "email",
                        Value: email,
                    },
                ]);
                console.log("Cognito user created", user);
                //Save user in DB SQL
                yield models_1.default["User"].create({
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    user_type: user_type,
                    manager_id: manager_id,
                    cognito_uuid: user.UserSub,
                });
                console.log("User created in RDS");
                res.status(201).send({ message: "User signed up" });
            }
            catch (error) {
                res.status(500).send({ code: error.code, message: error.message });
            }
        });
    }
    verify(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, code } = req.body;
            try {
                yield this.cognitoService.verifyUser(email, code);
                //await this.emailService.emailNotificationSingUp( email, email);
                return res.status(200).end();
            }
            catch (error) {
                //console.log('failed auth controller', error);
                res.status(500).send({ code: error.code, message: error.message }).end();
            }
        });
    }
    signin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                const login = yield this.cognitoService.signInUser(email, password);
                // const userDB = await UserModel.query(email).usingIndex('EmailIndex').exec().promise()
                // const userDBResult = userDB[0].Items[0].attrs;
                res.status(200).send(Object.assign({}, login.AuthenticationResult));
                //.end();
            }
            catch (error) {
                res.status(500).send({ code: error.code, message: error.message });
            }
        });
    }
    getReadUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield models_1.default["User"].findAll();
                res.status(200).send(users);
            }
            catch (err) {
                res.status(500).send("Error fatal:" + err);
            }
        });
    }
    validateBody(type) {
        switch (type) {
            case "signup":
                return (0, express_validator_1.checkSchema)({
                    email: {
                        in: "body",
                        isEmail: {
                            errorMessage: "Must be a valid email",
                        },
                    },
                    password: {
                        in: "body",
                        isString: {
                            errorMessage: "Must be a string",
                        },
                        isLength: {
                            options: {
                                min: 8,
                            },
                            errorMessage: "Must be at least 8 characters",
                        },
                    },
                    first_name: {
                        in: "body",
                        isString: {
                            errorMessage: "Must be a string",
                        },
                        isLength: {
                            options: {
                                min: 2,
                                max: 40,
                            },
                            errorMessage: "Must be between 4 and 20 characters",
                        },
                    },
                    last_name: {
                        in: "body",
                        isString: {
                            errorMessage: "Must be a string",
                        },
                        isLength: {
                            options: {
                                min: 2,
                                max: 40,
                            },
                            errorMessage: "Must be between 4 and 20 characters",
                        },
                    },
                });
            case "signin":
                return (0, express_validator_1.checkSchema)({
                    email: {
                        in: "body",
                        isEmail: {
                            errorMessage: "Must be a valid email",
                        },
                    },
                    password: {
                        isString: {
                            errorMessage: "Must be a string",
                        },
                        isLength: {
                            options: {
                                min: 8,
                            },
                            errorMessage: "Must be at least 8 characters",
                        },
                    },
                });
            case "verify":
                return (0, express_validator_1.checkSchema)({
                    email: {
                        in: "body",
                        isEmail: {
                            errorMessage: "Must be a valid email",
                        },
                    },
                    code: {
                        isString: {
                            errorMessage: "Must be a string",
                        },
                        isLength: {
                            options: {
                                min: 6,
                                max: 8,
                            },
                            errorMessage: "Must be between 6 and 8 characters",
                        },
                    },
                });
        }
    }
}
exports.default = AuthenticationController;
//# sourceMappingURL=AuthenticationController.js.map