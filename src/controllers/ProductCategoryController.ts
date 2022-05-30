import { Request, Response } from "express";
import AbstractController from "./AbstractController";
import db from "../models";

class ProductCategoryController extends AbstractController {
  // Singleton
  private static instance: ProductCategoryController;
  private productsID: number = 1;

  public static getInstance(): AbstractController {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProductCategoryController("product");
    return this.instance;
  }

  // Declaración rutas del controlador
  protected initRoutes(): void {
    this.router.get(
      "/getProductsCategorys",
      this.getProductsCategorys.bind(this)
    );
    this.router.post("/postProduct", this.postProduct.bind(this));
    this.router.get("/getProducts", this.getProducts.bind(this));
  }

  private async getProductsCategorys(req: Request, res: Response) {
    try {
      let productsCategory = await db["Product_category"].findAll({
        attributes: ["category_name", "category_id"],
      });
      console.log("products", productsCategory);
      res.status(200).send(productsCategory);
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).send({ message: err.message });
      } else {
        res.status(501).send({ message: "Error externo" });
      }
    }
  }

  private async postProduct(req: Request, res: Response) {
    try {
      this.productsID = req.body.category_id;
      res.status(200).send("Recibi id");
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).send({ message: err.message });
      } else {
        res.status(501).send({ message: "Error externo" });
      }
    }
  }

  private async getProducts(req: Request, res: Response) {
    try {
      let products = 0;
      console.log(products);
      res.status(200).send(products);
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).send({ message: err.message });
      } else {
        res.status(501).send({ message: "Error externo" });
      }
    }
  }
}

export default ProductCategoryController;
