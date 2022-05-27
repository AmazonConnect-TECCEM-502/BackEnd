import { Request, Response } from "express";
import AbstractController from "./AbstractController";
import db from "../models";


class SettingsUserController extends AbstractController {
  private static instance: SettingsUserController;
  
  public static getInstance(): AbstractController {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new SettingsUserController("suc");
    return this.instance;
  }

  protected initRoutes(): void {
    this.router.post('/changeFirstName',this.postChangeFirstName.bind(this));
    this.router.post('/changeLastName',this.postChangeLastName.bind(this));

    //this.router.get('/getAuthRes',this.getAuthRes.bind(this));

  }

  private async postChangeFirstName(req: Request, res: Response) {
        try {
            await db["User"].update({ first_name: req.body.first_name }, {
                where: {
                 user_id : req.body.user_id //Id que sale del TOKEN  
                }
              });
            
            res.status(200).send("Mensaje recibido - - Change First_name");

        } catch (error: any) {
            console.log(error);
            res.status(500).send("Error fatal");
        }
    }
    private async postChangeLastName(req: Request, res: Response) {
        try {
            await db["User"].update({ last_name: req.body.last_name }, {
                where: {
                 user_id : req.body.user_id //Id que sale del TOKEN  
                }
              });
            
            res.status(200).send("Mensaje recibido - Change Last_name");

        } catch (error: any) {
            console.log(error);
            res.status(500).send("Error fatal");
        }
    }
        
}

export default SettingsUserController;