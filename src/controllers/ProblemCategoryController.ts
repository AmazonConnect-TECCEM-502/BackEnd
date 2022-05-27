import { Request, Response } from "express";
import AbstractController from "./AbstractController";
import db from "../models";

class ProblemCategoryController extends AbstractController {
  // Singleton
  private static instance: ProblemCategoryController;

  private categoryId: number = 1;

  public static getInstance(): AbstractController {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProblemCategoryController("problem");
    return this.instance;
  }

  // Declaración rutas del controlador
  protected initRoutes(): void {
    this.router.get(
      "/getProblemCategorys",
      this.getProblemCategorys.bind(this)
    );
    this.router.post("/postProblem", this.postProblem.bind(this));
    this.router.get("/getProblem", this.getProblems.bind(this));
  }

  private async getProblemCategorys(req: Request, res: Response) {
    try {
      let problems = await db["Problem_category"].findAll({
        attributes: ["category_name", "category_id"],
      });
      // let problems2 = await db.sequelize.query("SELECT * FROM Problem_category",{
      //   model: db["Problem_category"],
      //   mapToModel: true
      // })
      console.log("Problemas", problems);
      res.status(200).send(problems);
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).send({ message: err.message });
      } else {
        res.status(501).send({ message: "Error externo" });
      }
    }
  }

  private async postProblem(req: Request, res: Response) {
    try {
      this.categoryId = req.body.category_id
      res.status(200).send("Recibi id");
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).send({ message: err.message });
      } else {
        res.status(501).send({ message: "Error externo" });
      }
    }
  }

  private async getProblems(req: Request, res: Response) {
    try {

      let qna = await db.sequelize.query(
        "SELECT problem_description, category_id FROM `Category-Problem` as cp, Problem as p WHERE cp.problem_id = p.problem_id and cp.category_id = " +
          this.categoryId,
        {
          model: db["Category-Problem"],
          mapToModel: true,
        }
      );
      console.log(qna)
      res.status(200).send(qna);
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).send({ message: err.message });
      } else {
        res.status(501).send({ message: "Error externo" });
      }
    }
  }

}

export default ProblemCategoryController;
