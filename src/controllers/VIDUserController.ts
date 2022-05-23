import { Request, Response } from "express";
import AbstractController from "./AbstractController";
import db from "../models";


class VIDUserController extends AbstractController {
  private static instance: VIDUserController;
  private phoneNumber: number = -1;
  private authenticationType = "Not yet"; // si no no registrado
  
  public static getInstance(): AbstractController {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new VIDUserController("vid");
    return this.instance;
  }

  protected initRoutes(): void {
    this.router.post('/sendAuthRes',this.postSendAuthRes.bind(this));
    this.router.get('/getAuthRes',this.getAuthRes.bind(this));
    this.router.get("/getUserData", this.getUserData.bind(this));
    //this.router.post("/uploadCall", this.postUploadVideo.bind(this));
  }
  private async postSendAuthRes(req: Request, res: Response) {
    try {
        console.log("El teléfono del usuario es: ");
        console.log(req.body.phoneNumber);

        console.log("Resultado de autenticación: ");
        console.log(req.body.authenticationType);
        //this.phoneNumber = req.body.phone
        //this.phoneNumber = req.body.authenticationType
        res.status(200).send("Mensaje recibido");
    } catch (error: any) {
        console.log(error);
        res.status(500).send("Error fatal");
    }
}

private async getUserData(req: Request, res: Response) {
    try{

        let userData = await db["Client"].findOne({where: {phone: this.phoneNumber.toString()}})
        console.log("Datos de usuario:", userData);
        res.status(200).send(userData);
    }catch(error){
            if(error instanceof Error){
                res.status(500).send({message:error.message});
            }else{
                res.status(501).send({message:"Error externo"})
            }
        }
    }

private async getAuthRes(req: Request, res: Response) {
    try {
        console.log("Enviando autenticación al front")
        res.status(200).send({
            "phoneNumber": this.phoneNumber,
            "authenticationType": this.authenticationType
        });
    } catch (error: any) {
        console.log(error);
        res.status(500).send("Error fatal");
    }
}

}

export default VIDUserController;


    
    
