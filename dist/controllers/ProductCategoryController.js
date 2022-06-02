"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractController_1 = __importDefault(require("./AbstractController"));
const models_1 = __importDefault(require("../models"));
class ProductCategoryController extends AbstractController_1.default {
    constructor() {
        super(...arguments);
        this.productsID = 1;
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProductCategoryController("product");
        return this.instance;
    }
    // Declaración rutas del controlador
    initRoutes() {
        this.router.get("/getProductsCategorys", this.getProductsCategorys.bind(this));
        this.router.post("/postProduct", this.postProduct.bind(this));
        this.router.get("/getProducts", this.getProducts.bind(this));
    }
    getProductsCategorys(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let productsCategory = yield models_1.default["Product_category"].findAll({
                    attributes: ["category_name", "category_id"],
                });
                console.log("products", productsCategory);
                res.status(200).send(productsCategory);
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(500).send({ message: err.message });
                }
                else {
                    res.status(501).send({ message: "Error externo" });
                }
            }
        });
    }
    postProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.productsID = req.body.category_id;
                res.status(200).send("Recibi id");
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(500).send({ message: err.message });
                }
                else {
                    res.status(501).send({ message: "Error externo" });
                }
            }
        });
    }
    getProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let products = 0;
                console.log(products);
                res.status(200).send(products);
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(500).send({ message: err.message });
                }
                else {
                    res.status(501).send({ message: "Error externo" });
                }
            }
        });
    }
}
exports.default = ProductCategoryController;
//# sourceMappingURL=ProductCategoryController.js.map