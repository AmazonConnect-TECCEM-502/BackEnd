import { Request, Response } from "express";
import AbstractController from "./AbstractController";

class ManagerController extends AbstractController {
  private static instance: ManagerController;
  public static getInstance(): AbstractController {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ManagerController("Manager");
    return this.instance;
  }

  // Rutas
  protected initRoutes(): void {
    this.router.get("/getManagers", this.getManagers.bind(this));
  }

  private async getManagers(req: Request, res: Response) {
    try {
      console.log(req.body);
    } catch {}
  }
}
