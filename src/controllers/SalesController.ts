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
    //this.router.get("/getProducts", this.getProducts.bind(this));
    //this.router.get("/getProducts", this.getClientProducts.bind(this));
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

  private async getClientProducts(req: Request, res: Response) {
    try {
      let productRelations = await db.sequelize.query(`SELECT product_id, product_name, product_description, price FROM Product WHERE product_id in (SELECT product_id FROM Orders WHERE client_id != ${req.body.client_id})`, {
        model: db["Product"],
        mapToModel: true
      })
      const parsedProducts = await this.parseProducts(productRelations);
      res.status(200).send(parsedProducts);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send({ message: error.message });
      } 
      else {
        res.status(501).send({ message: "Error externo" });
      }
    }
  }

  private async getProductsByCategory(req: Request, res: Response) {
    try {
      let products = await db.sequelize.query(`SELECT product_id, product_name, product_description, price FROM Product, Product-Category WHERE Product.product_id = Product-Category.product_id ORDER BY Procut-Category.category_id`);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send({ message: error.message });
      } 
      else {
        res.status(501).send({ message: "Error externo" });
      }
    }
  }

  private async parseProducts(productRelations: [any]) {
    let ownedProducts = {internet:[any], TV:[any], mobile:[any], streaming:[any], smartphones:[any]};
    await productRelations.forEach(product => {
      if (String(product.product_id)[0] === '1') {
        ownedProducts['internet'].push(product);
      }
      else if (String(product.product_id)[0] === '2') {
        ownedProducts['TV'].push(product);
      }
      else if (String(product.product_id)[0] === '3') {
        ownedProducts['mobile'].push(product);
      }
      else if (String(product.product_id)[0] === '4') {
        ownedProducts['streaming'].push(product);
      }
      else if (String(product.product_id)[0] === '5') {
        ownedProducts['smartphones'].push(product);
      }
    });
    return ownedProducts;
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
