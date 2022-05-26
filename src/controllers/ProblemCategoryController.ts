import { Request, Response } from "express";
import AbstractController from './AbstractController'
import db from '../models'

class ProblemCategoryController extends AbstractController{
  // Singleton
  private static instance: ProblemCategoryController;

  public static getInstance(): AbstractController {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProblemCategoryController("problem");
    return this.instance;
  }

  // Declaración rutas del controlador
  protected initRoutes(): void {
    this.router.get("/getProblemCategorys", this.getProblemCategorys.bind(this));
  }

  private async getProblemCategorys(req: Request, res: Response){
    try {
      let problems = await db["Problem_category"].findAll({
        attributes: ['category_name']
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
}

export default ProblemCategoryController
