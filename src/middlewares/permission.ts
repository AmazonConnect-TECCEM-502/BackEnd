import { Response, Request, NextFunction } from "express";
// Models
import { UserRoles } from "../models/user";
import db from "../models";

export default class PermissionMiddleware {
  // Singleton
  private static instance: PermissionMiddleware;
  public static getInstance(): PermissionMiddleware {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new PermissionMiddleware();
    return this.instance;
  }

  /**
   * Verify that the current user is a Supervisor
   */
  public async checkIsSupervisor(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = await db["User"].findOne({
        where: {
          email: req.user,
        },
        attributes: ["user_type"],
      });
      if (user.user_type === UserRoles.MANAGER) {
        next();
      } else {
        res.status(401).send({
          code: "UserNotSupervisorException",
          message: "The logged account is not an supervisor",
        });
      }
    } catch (error: any) {
      res.status(500).send({ code: error.code, message: error.message });
    }
  }

  /**
   * Verify that the current user is an admin
   */
  public async checkIsAdmin(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = await db["User"].findOne({
        where: {
          email: req.user,
        },
        attributes: ["user_type"],
      });
      if (user.attrs.role === UserRoles.ADMIN) {
        next();
      } else {
        res.status(401).send({
          code: "UserNotAdminException",
          message: "The logged account is not an admin",
        });
      }
    } catch (error: any) {
      res.status(500).send({ code: error.code, message: error.message });
    }
  }
}
