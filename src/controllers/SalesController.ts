import { Request, Response } from "express";
import AbstractController from "./AbstractController";
import db from "../models";
import { any } from "joi";

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
    this.router.get('/getProductCategories', this.getProductCategories.bind(this));
    this.router.get('/getProduct', this.getProduct.bind(this));
    this.router.get('/getOwnedProducts', this.getOwnedProdcuts.bind(this));
    this.router.get('/getNotOwnedProducts', this.getProductsNotOwned.bind(this));
    this.router.get('/getRecommendedProducts', this.getRecommendedProducts.bind(this));
  }

  private async getOwnedProdcuts(req: Request, res: Response) {
    try {
      let products = await db.sequelize.query(`SELECT p.product_id, p.product_name, p.product_description, p.price FROM Product as p, \`Category-Product\` as cp WHERE p.product_id = cp.product_id and cp.category_id = ${req.body.category_id} and p.product_id in (SELECT product_id FROM \`Order\` WHERE client_id = ${req.body.client_id})`);
      res.status(200).send(products);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send({ message: error.message });
      } 
      else {
        res.status(501).send({ message: "Error externo" });
      }
    }
  }

  private async getProductsNotOwned(req: Request, res: Response) {
    try {
      let products = await db.sequelize.query(`SELECT p.product_id, p.product_name, p.product_description, p.price FROM Product as p, \`Category-Product\` as cp WHERE p.product_id = cp.product_id and cp.category_id = ${req.body.category_id} and p.product_id not in (SELECT product_id FROM \`Order\` WHERE client_id = ${req.body.client_id})`);
      res.status(200).send(products);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send({ message: error.message });
      } 
      else {
        res.status(501).send({ message: "Error externo" });
      }
    }
  }

  private async getRecommendedProducts(req: Request, res: Response) {
    try {
      let products = await db.sequelize.query(`SELECT p.product_id, p.product_name, p.product_description, p.price FROM Product as p, \`Category-Product\` as cp WHERE p.product_id = cp.product_id and cp.category_id = ${req.body.category_id} and p.product_id > all (SELECT o.product_id FROM \`Order\` as o, \`Category-Product\` as cp WHERE o.client_id = ${req.body.client_id} and cp.product_id = o.product_id and cp.category_id = ${req.body.category_id})`);
      res.status(200).send(products);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send({ message: error.message });
      } 
      else {
        res.status(501).send({ message: "Error externo" });
      }
    }
  }

  private async getProductCategories(req: Request, res: Response) {
    try {
      let productsCategory = await db["Product_category"].findAll({
        attributes: ["category_name", "category_id"],
      });
      res.status(200).send(productsCategory);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send({ message: error.message });
      } else {
        res.status(501).send({ message: "Error externo" });
      }
    }
  }

  private async getProduct(req: Request, res: Response) {
    try {
      let product = await db["Product"].findOne({where: {product_id: req.body.product_id}, attributes: ["product_id", "product_name", "product_description", "price"]});
      res.status(200).send(product);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send({ message: error.message });
      } else {
        res.status(501).send({ message: "Error externo" });
      }
    }
  }

}

export default SalesContoller;
