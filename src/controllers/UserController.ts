import { Request, Response } from "express";
import AbstractController from "./AbstractController";
import db from "../models";

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
    this.router.get("/readAgents", this.getReadAgents.bind(this));
    this.router.get(
      "/userType",
      this.authMiddleware.verifyToken,
      this.getUserType.bind(this)
    );

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

  private async getReadAgents(req: Request, res: Response) {
    try {
      let agent = await db.sequelize.query(
        "SELECT first_name, last_name FROM User WHERE user_type like 'agent%'",
        {
          model: db["User"],
          mapToModel: true,
        }
      );
      //let agent2 = await db["User"].findAll();
      res.status(200).send(agent);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  private async getUserType(req: Request, res: Response) {
    const user = await db["User"].findOne({
      where: {
        cognito_uuid: req.user,
      },
    });

    if (user != null) {
      res.status(200).json({
        email: user.email,
        user_type: user.user_type,
        id: user.user_id,
      });
    } else {
      res.status(401).json({
        error: "Authentication error",
      });
    }
  }
}

export default UserController;
