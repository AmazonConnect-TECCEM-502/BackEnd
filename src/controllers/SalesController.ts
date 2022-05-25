import { Request, Response } from "express";
import AbstractController from "./AbstractController";
import db from "../models";

class SalesContoller extends AbstractController {
  private static instance: SalesContoller;

  public static getInstance(): AbstractController {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new SalesContoller("sales");
    return this.instance;
  }

  protected initRoutes(): void {
    this.router.get("/getProducts", this.getProducts.bind(this));
  }

  private async getProducts(req: Request, res: Response) {
    try {
      const userProducts = {
        internet: {
          image: "ejemploTelmex",
          name: "Internet plan",
          price: "100",
          desc: "Un plan de servicio de Internet con una velocidad de 50 megas.",
        },
        TV: {
          image: "ejemploTelmex",
          name: "TV plan",
          price: "150",
          desc: "Un plan de servicio de TV con 100 canales.",
        },
        mobile: {
          image: "ejemploTelmex",
          name: "Mobile roaming plan",
          price: "200",
          desc: "Un plan de datos celulares con un limite de consumo de ancho de banda de 1 gigabyte.",
        },
      };
      res.status(200).send(userProducts);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send({ message: error.message });
      } 
      else {
        res.status(501).send({ message: "Error externo" });
      }
    }
  }
}

export default SalesContoller;
