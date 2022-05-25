import Server from "./providers/Server";
import { PORT, NODE_ENV } from "./config";
// Importa middlewares
import express from "express";
import cors from "cors";
// Importa controllers
import UserController from "./controllers/UserController";
import CallController from "./controllers/CallController";
import VIDUserController from "./controllers/VIDUserController";
import SalesContoller from "./controllers/SalesController";

const app = new Server({
  port: PORT,
  middlewares: [express.json(), express.urlencoded({ extended: true }), cors()],
  controllers: [UserController.getInstance(), CallController.getInstance(), VIDUserController.getInstance(), SalesContoller.getInstance()],
  env: NODE_ENV,
});

app.init();
