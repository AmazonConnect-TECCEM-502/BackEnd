import { Request, Response } from "express";
import AbstractController from "./AbstractController";

class UserController extends AbstractController {
  // Singleton
  private static instance: UserController;
  public static getInstance(): AbstractController {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new UserController("user");
    return this.instance;
  }

  // Declaración rutas del controlador
  protected initRoutes(): void {
    this.router.get("/readUser", this.getReadUser.bind(this));
    this.router.get("/readUsers", this.getReadUsers.bind(this));

    // Agregar más rutas
  }

  private async getReadUser(req: Request, res: Response) {
    try {
      res.status(200).send({ data: "User" });
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).send({ message: err.message });
      } else {
        res.status(501).send({ message: "Error externo" });
      }
    }
  }

  private async getReadUsers(req: Request, res: Response) {}
}

export default UserController;
