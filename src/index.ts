import Server from "./providers/Server";
import { PORT, NODE_ENV } from "./config";
import { PORTS } from "./config";
// Importa middlewares
import express from "express";
import cors from "cors";
// Importa controllers
import UserController from "./controllers/UserController";
import CallController from "./controllers/CallController";
import VIDUserController from "./controllers/VIDUserController";
import ProblemCategoryController from "./controllers/ProblemCategoryController";
import SalesContoller from "./controllers/SalesController";
import ProductCategoryController from "./controllers/ProductCategoryController";
import SettingsUserController from "./controllers/SettingsUserController";
import AuthenticationController from "./controllers/AuthenticationController";
import { ProcessCredentials } from "aws-sdk";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const app = new Server({
  port: PORT,
  portS: PORTS,
  middlewares: [express.json(), express.urlencoded({ extended: true }), cors()],
  controllers: [
    UserController.getInstance(),
    CallController.getInstance(),
    VIDUserController.getInstance(),
    ProblemCategoryController.getInstance(),
    SalesContoller.getInstance(),
    ProductCategoryController.getInstance(),
    SettingsUserController.getInstance(),
    AuthenticationController.getInstance(),
  ],

  env: NODE_ENV,
});

declare global {
  namespace Express {
    interface Request {
      user: string;
      token: string;
    }
  }
}

app.init();
