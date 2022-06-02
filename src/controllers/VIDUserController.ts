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

import { Request, Response } from "express";
import AbstractController from "./AbstractController";
import db from "../models";
import CallsStatusModel from "../modelsNOSQL/callsStatus";

class VIDUserController extends AbstractController {
  private static instance: VIDUserController;

  //private phoneNumber: string = "";
  //private authenticationType = "Not yet"; // si no no registrado

  public static getInstance(): AbstractController {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new VIDUserController("vid");
    return this.instance;
  }

  protected initRoutes(): void {
    this.router.post("/sendAuthRes", this.postSendAuthRes.bind(this));
    this.router.post("/getAuthRes", this.getAuthRes.bind(this));
    this.router.post("/getUserData", this.getUserData.bind(this));
    this.router.post("/sendClientData", this.postSendClientData.bind(this));
    this.router.post("/reset", this.postReset.bind(this));
    //this.router.post("/uploadCall", this.postUploadVideo.bind(this));
  }

  private async postSendAuthRes(req: Request, res: Response) {
    try {
      console.log("El teléfono del usuario es: ");
      console.log(req.body.phoneNumber);

      console.log("Resultado de autenticación: ");
      console.log(req.body.authenticationType);
      
      // Receiving info from voiceID and storing it in dynamoDB.
      await CallsStatusModel.create({phoneNumber: req.body.phoneNumber,
        authenticationType: req.body.authenticationType});


      res.status(200).send("Mensaje recibido");
    } catch (error: any) {
      console.log(error);
      res.status(500).send("Error fatal");
    }
  }

  private async postReset(req: Request, res: Response) {
    try {
      await CallsStatusModel.update({phoneNumber: req.body.phoneNumber, authenticationType: "not yet"});
      res.status(200).send("Orden de resetear recibida");
    } catch (error: any) {
      console.log(error);
      res.status(500).send("Error fatal");
    }
  }

  //get the info of one user
  private async getUserData(req: Request, res: Response) {
    try {
      let userData = await db["Client"].findOne({
        where: { phone: req.body.phoneNumber },
      });
      
      const [userProducts, metadata] = await db.sequelize.query(`SELECT Product.product_name FROM Product, capstone.Order, Client WHERE Client.client_id = capstone.Order.client_id AND capstone.Order.product_id = Product.product_id AND Client.client_id = ${userData.client_id}`);

      const data = {userData, userProducts}

      console.log("Datos ", data);
      res.status(200).send(data);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send({ message: error.message });
      } else {
        res.status(501).send({ message: "Error externo" });
      }
    }
  }

  private async getAuthRes(req: Request, res: Response) {
    try {
      // Depending on the phone number given by the agent, we
      // search for authentication results in dynamoDB.

      const callPhoneNumber = req.body.phoneNumber;
      const callsStatus = await CallsStatusModel.query(callPhoneNumber).exec().promise();
      console.log("Enviando autenticación al front")
      res.status(200).send(callsStatus[0].Items[0]);  // This is the json with phone and authType.
    } catch (error: any) {
      console.log(error);
      res.status(500).send("Error fatal");
    }
  }

  //Create a new client on the data base
  private async postSendClientData(req: Request, res: Response) {
    try {
      await db["Client"].create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        phone: req.body.phone,
      });
      console.log("Registo exitoso");
      res.status(200).send("Registro exitoso");
    } catch (error: any) {
      console.log(error);
      res.status(500).send("Error fatal");
    }
  }
}

export default VIDUserController;
