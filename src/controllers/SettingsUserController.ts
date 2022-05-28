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
    this.router.post('/changeName',this.postChangeName.bind(this));
    this.router.post('/userData',this.postUserData.bind(this));

  }


    private async postChangeName(req: Request, res: Response) {
        try {
            //First name
            if(req.body.first_name != ""){
                await db["User"].update({ first_name: req.body.first_name }, {
                    where: {
                     user_id : req.body.user_id //Id que sale del TOKEN  
                    }
                  });
            }
            

              //Last Name
            if(req.body.last_name != ""){
                await db["User"].update({ last_name: req.body.last_name }, {
                    where: {
                    user_id : req.body.user_id //Id que sale del TOKEN  
                    }
                });
            }
              
            res.status(200).send("Mensaje recibido - Change Name");

        } catch (error: any) {
            console.log(error);
            res.status(500).send("Error fatal");
        }
    }
     
    private async postUserData(req: Request, res: Response) {
        try {
            let userData = await db["User"].findOne({where: {user_id: req.body.user_id }})
            console.log("Datos de usuario:", userData);
            res.status(200).send(userData);

        } catch (error: any) {
            console.log(error);
            res.status(500).send("Error fatal");
        }
    }

    
}

export default SettingsUserController;