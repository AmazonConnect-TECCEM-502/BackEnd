/*
Class that represents the entire backend server
*/

import express, { Request, Response, NextFunction } from "express";
import AbstractController from "../controllers/AbstractController";
import https from "https";
import db from "../models";
import * as fs from "fs";
import * as path from "path";
import { readFile, writeFile } from "fs/promises";

var privateKey = fs.readFileSync(
  path.join(__dirname, "./../sslcert/privatekey.pem"),
  "utf8"
);
var certificate = fs.readFileSync(
  path.join(__dirname, "./../sslcert/server.crt"),
  "utf8"
);

var credentials = {
  key: privateKey,
  cert: certificate,
  //In case you protect your key add the passphrase attribute: '<your phrase>'.
};

class Server {
  private app: express.Application;
  private port: number;
  private portS: number;
  private env: string;
  private httpsServer: any;

  constructor(appInit: {
    port: number;
    portS: number;
    middlewares: any;
    controllers: AbstractController[];
    env: string;
  }) {
    this.app = express();
    this.port = appInit.port;
    this.portS = appInit.portS;
    this.env = appInit.env;
    this.loadMiddlewares(appInit.middlewares);
    this.loadRoutes(appInit.controllers);
    this.databases();
  }

  private loadRoutes(controllers: AbstractController[]): void {
    // Test page
    this.app.get("/", (_: any, res: Response) => {
      res.status(200).send({
        message: "The backend is working",
        documentation:
          "https://github.com/AmazonConnect-TECCEM-502/amazonconnect-backend/wiki",
      });
    });

    // Add controllers
    controllers.forEach((controller: AbstractController) => {
      this.app.use(`/${controller.prefix}`, controller.router);
    });
  }

  // Add middlewares
  private loadMiddlewares(middlewares: any[]): void {
    middlewares.forEach((middleware: any) => {
      this.app.use(middleware);
    });
  }

  // Add db connection
  private async databases() {
    await db.sequelize.sync();
  }

  public init(): void {
    this.httpsServer = https.createServer(credentials, this.app);
    this.app.listen(this.port, () => {
      console.log(`Server running @'http://localhost:${this.port}'`);
    });
    this.httpsServer.listen(8443, () => console.log("Corriendo HTTPS 8443"));
  }
}

export default Server;
