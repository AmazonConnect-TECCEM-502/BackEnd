import { Request, Response } from "express";
import AbstractController from "./AbstractController";
import db from "../models";

class CallProblemCategoryController extends AbstractController {
  private static instance: CallProblemCategoryController;
  public static getInstance(): AbstractController {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new CallProblemCategoryController("callProblemCategory");
    return this.instance;
  }

  protected initRoutes(): void {
    this.router.post(
      "/createCallPC",
      this.authMiddleware.verifyToken,
      this.createCallPC.bind(this)
    );
  }

  private async createCallPC(req: Request, res: Response) {
    try {
      const call_id = req.body.call_id;
      const categories = req.body.categories;
      console.log(categories);
      categories.forEach((category: any) => {
        db["Call-Problem_category"].create({
          call_id: call_id,
          category_id: category,
        });
      });
      res.status(201).send();
    } catch (err: any) {
      res.status(500).json({ error: err });
    }
  }
}

export default CallProblemCategoryController;
