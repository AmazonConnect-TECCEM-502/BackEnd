/*
Here we start the server using npm run build-start
*/

import Server from "./providers/Server";
import { PORT, NODE_ENV } from "./config";
import { PORTS } from "./config";
// Import middlewares
import express from "express";
import cors from "cors";
// Import controllers
import UserController from "./controllers/UserController";
import CallController from "./controllers/CallController";
import VIDUserController from "./controllers/VIDUserController";
import ProblemCategoryController from "./controllers/ProblemCategoryController";
import SalesContoller from "./controllers/SalesController";
import SettingsUserController from "./controllers/SettingsUserController";
import AuthenticationController from "./controllers/AuthenticationController";
import { ProcessCredentials } from "aws-sdk";
import CallProblemCategoryController from "./controllers/CallProblemCategoryController";
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
    SettingsUserController.getInstance(),
    AuthenticationController.getInstance(),
    CallProblemCategoryController.getInstance(),
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
