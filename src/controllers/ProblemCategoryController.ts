import { Request, Response } from "express";
import AbstractController from "./AbstractController";
import db from "../models";

class ProblemCategoryController extends AbstractController {
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
    this.router.get(
      "/getProblemCategorys",
      this.getProblemCategorys.bind(this)
    );
    this.router.post("/postProblem", this.postProblem.bind(this));
    this.router.get("/getProblem/:id", this.getProblems.bind(this));
    this.router.post("/postProblemId", this.postProblemId.bind(this));

    this.router.get("/getProblemid", this.getProblemid.bind(this));
    this.router.get("/getSolutions/:id", this.getSolutions.bind(this));
    this.router.delete("/deleteSolution/:ID", this.deleteSolution.bind(this));
    this.router.post("/postCreateSolution", this.postCreateSolution.bind(this));
    this.router.post("/postCreateProblem", this.postCreateProblem.bind(this));
    this.router.get("/getCategories",this.getCategories.bind(this));
    this.router.get("/getProposals/:ID",this.getProposals.bind(this));
    this.router.post("/postApproveProposals/:ID", this.postApproveProposals.bind(this));
    this.router.delete("/deleteProblem/:ID",this.deleteProblem.bind(this));
    this.router.post("/postCreateCategory",this.postCreateCategory.bind(this));
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
        "SELECT problem_description, category_id, p.problem_id FROM `Category-Problem` as cp, Problem as p WHERE cp.problem_id = p.problem_id and cp.category_id = " +
          req.params.id,
        {
          model: db["Category-Problem"],
          mapToModel: true,
        }
      );
      res.status(200).send(qna);
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).send({ message: err.message });
      } else {
        res.status(501).send({ message: "Error externo" });
      }
    }
  }

  private async getProblemid(req: Request, res: Response) {
    try {
      console.log(req.body);
      const resultado = await db["Problem"].sequelize.query(
        "Select problem_id as ID, problem_description as question from Problem"
      );
      console.log("Consulta exitosa");
      res.status(200).send(resultado[0]);
    } catch (err: any) {
      console.log("Error");
      res.status(500).send("Error fatal:" + err);
    }
  }

  private async postProblemId(req: Request, res: Response) {
    try {
      console.log("Recibi problem id", req.body.solution_id);
      
      res.status(200).send("Recibi problem id");
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).send({ message: err.message });
      } else {
        res.status(501).send({ message: "Error externo" });
      }
    }
  }

  private async getSolutions(req: Request, res: Response) {
    const ID = req.params.id;
    try {
      let resultado = await db.sequelize.query(
          `SELECT solution_description, problem_id, approved_date FROM Solution AS Solution WHERE Solution.approved_date IS NOT NULL AND problem_id = ${ID}`,
        {
          model: db["Solution"],
          mapToModel: true,
        }
      );

      console.log("Consulta exitosa");
      res.status(200).send(resultado);
    } catch (err: any) {
      console.log("Error");
      res.status(500).send("Error fatal:" + err);
    }
  }

  private async deleteSolution(req: Request, res: Response) {
    const ID = req.params.ID;
    try {
      console.log(req.body);
      await db["Solution"].destroy({
        where: {
          solution_id: ID,
        },
      }),
        console.log("Registro exitoso");
      res.status(200).send("Registro exitoso");
    } catch (err: any) {
      console.log("Error");
      res.status(500).send("Error fatal:" + err);
    }
  }
  private async postCreateSolution(req: Request, res: Response) {
    try {
      await db["Solution"].create({
        problem_id: req.body.problem_id,
        solution_description: req.body.solution_description,
        submitted_id: req.body.submitted_id,
        approved_by: null
      });
      console.log("New Solution:\n", req.body);
      res.status(200).send(req.body);
    } catch (err: any) {
      console.log("Error");
      res.status(500).send("Error fatal:" + err);
    }
  }
  private async postCreateProblem(req:Request,res:Response){
    try{
        await db["Problem"].create({
          problem_description: req.body.problem_description,
          submitted_by: req.body.submitted_by 
        })  
        .then((resultado: any) => {
          const problem_id = resultado.dataValues.problem_id
          db["Category-Problem"].create({
            problem_id: problem_id,
            category_id: req.body.category_id
          })
        });
        console.log("Registro exitoso");
        res.status(200).send("Registro exitoso");
    }catch(err:any){
        console.log("Error")
        res.status(500).send("Error fatal:" +err);
    }
  }
  private async getCategories(req: Request, res: Response) {
    try {
      const resultado = await db["Problem_category"].findAll();
      console.log("Consulta existosa");
      res.status(200).send(resultado);
    } catch (err: any) {
      console.log("Error");
      res.status(500).send("Error fatal:" + err);
    }
  }
  private async getProposals(req: Request, res: Response) {
    const ID = req.params.ID;
    try {
      const resultado = await db["Solution"].findAll({
        where: {
          approved_date: null,
          problem_id: ID
        }
      });
      console.log("Consulta exitosa");
      console.log(resultado);
      res.status(200).send(resultado);
    } catch (err: any) {
      console.log("Error");
      res.status(500).send("Error fatal:" + err);
    }
  }
  private async postApproveProposals(req: Request, res: Response) {
    const ID = req.params.ID;
    const date = req.body.date;
    const approved_by = req.body.approved_by;
    try {
      const resultado = await db["Solution"].findOne({
        where:{
          solution_id : ID,
        }
      });
      resultado.approved_date = date
      resultado.approved_by = approved_by
      await resultado.save()
      console.log("Consulta exitosa");
      console.log(resultado);
      res.status(200).send(resultado);
    } catch (err: any) {
      console.log("Error");
      res.status(500).send("Error fatal:" + err);
    }
  }
  private async deleteProblem(req: Request, res: Response) {
    const ID = req.params.ID;
    try {
      console.log(req.body);
      await db["Problem"].destroy({
        where: {
          problem_id: ID,
        },
      }),
      console.log("Registro exitoso");
      res.status(200).send("Registro exitoso");
    } catch (err: any) {
      console.log("Error");
      res.status(500).send("Error fatal:" + err);
    }
  }
  private async postCreateCategory(req:Request,res:Response){
    try {
      await db["Problem_category"].create(req.body);
      res.status(200).send(req.body);
    } catch (err: any) {
      console.log("Error");
      res.status(500).send("Error fatal:" + err);
    }
  }
}

export default ProblemCategoryController;
