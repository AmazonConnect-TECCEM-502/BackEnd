/*
  Authors: 
  Luis Ignacio Ferro Salinas
  Eric Alexis Castañeda Bravo

  Description:
  The possible routes to request services related to the client
  authentication are encapsulated in this VIDUserController class.

  Last update: 
  June 10th
*/


import { Request, Response } from "express";
import AbstractController from "./AbstractController";
import db from "../models";
import CallsStatusModel from "../modelsNOSQL/callsStatus";


class VIDUserController extends AbstractController {
  private static instance: VIDUserController;

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
  }

  private async postSendAuthRes(req: Request, res: Response) {
    try {
      console.log("The client's phone is: ");
      console.log(req.body.phoneNumber);
      console.log("Authentication result: ");
      console.log(req.body.authenticationType);
      
      // Receiving info from voiceID and storing it in dynamoDB.
      await CallsStatusModel.create({phoneNumber: req.body.phoneNumber,
        authenticationType: req.body.authenticationType});

      res.status(200).send("Request to store authentication received");
    } catch (error: any) {
      console.log(error);
      res.status(500).send("Fatal error");
    }
  }

  private async postReset(req: Request, res: Response) {
    try {
      // Restore the authentication state of given user to default in dynamoDB.
      await CallsStatusModel.update({phoneNumber: req.body.phoneNumber, authenticationType: "not yet"});
      res.status(200).send("Order to restore authentication status received");
    } catch (error: any) {
      console.log(error);
      res.status(500).send("Fatal error");
    }
  }

  private async getUserData(req: Request, res: Response) {
    try {
      // Get the personal info of one user given the phone from RDS.
      let userData = await db["Client"].findOne({
        where: { phone: req.body.phoneNumber },
      });
      // Obtain the products that a certain user has bought from RDS.
      const [userProducts, metadata] = await db.sequelize.query(`SELECT Product.product_name FROM Product, capstone.Order, Client WHERE Client.client_id = capstone.Order.client_id AND capstone.Order.product_id = Product.product_id AND Client.client_id = ${userData.client_id}`);

      const data = {userData, userProducts};
      console.log("Data ", data);
      res.status(200).send(data);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send({ message: error.message });
      } else {
        res.status(501).send({ message: "External error" });
      }
    }
  }

  private async getAuthRes(req: Request, res: Response) {
    try {
      /* Depending on the phone number given by the agent, we
         search for authentication state of user in dynamoDB. */
      const callPhoneNumber = req.body.phoneNumber;
      const callsStatus = await CallsStatusModel.query(callPhoneNumber).exec().promise();

      console.log("Sending authentication to the front end");
      res.status(200).send(callsStatus[0].Items[0]);  // This callsStatus[0]... is the json with phone and authType.
    } catch (error: any) {
      console.log(error);
      res.status(500).send("Fatal error");
    }
  }

  private async postSendClientData(req: Request, res: Response) {
    try {
      // Insert a new client tuple into our Client table in the RDS database.
      await db["Client"].create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        phone: req.body.phone,
      });
      console.log("Client insert succesful");
      res.status(200).send("Client insert succesful");
    } catch (error: any) {
      console.log(error);
      res.status(500).send("Fatal error");
    }
  }
}

export default VIDUserController;
