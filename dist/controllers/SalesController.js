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
class SalesContoller extends AbstractController_1.default {
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new SalesContoller("sales");
        return this.instance;
    }
    initRoutes() {
        this.router.get('/getProductCategories', this.getProductCategories.bind(this));
        this.router.get('/getProduct/:product_id', this.getProduct.bind(this));
        this.router.get('/getOwnedProducts/:client_id/:category_id', this.getOwnedProdcuts.bind(this));
        this.router.get('/getNotOwnedProducts/:client_id/:category_id', this.getProductsNotOwned.bind(this));
        this.router.get('/getRecommendedProducts/:client_id/:category_id', this.getRecommendedProducts.bind(this));
        this.router.post('/buyProduct', this.buyProduct.bind(this));
    }
    getOwnedProdcuts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield models_1.default.sequelize.query(`SELECT p.product_id, p.product_name, p.product_description, p.price FROM Product as p, \`Category-Product\` as cp WHERE p.product_id = cp.product_id and cp.category_id = ${req.params.category_id} and p.product_id in (SELECT product_id FROM \`Order\` WHERE client_id = ${req.params.client_id})`);
                res.status(200).send(products[0]);
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).send({ message: error.message });
                }
                else {
                    res.status(501).send({ message: "Error externo" });
                }
            }
        });
    }
    getProductsNotOwned(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield models_1.default.sequelize.query(`SELECT p.product_id, p.product_name, p.product_description, p.price FROM Product as p, \`Category-Product\` as cp WHERE p.product_id = cp.product_id and cp.category_id = ${req.params.category_id} and p.product_id not in (SELECT product_id FROM \`Order\` WHERE client_id = ${req.params.client_id})`);
                res.status(200).send(products[0]);
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).send({ message: error.message });
                }
                else {
                    res.status(501).send({ message: "Error externo" });
                }
            }
        });
    }
    getRecommendedProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (Number(req.params.category_id) < 4) {
                    const products = yield models_1.default.sequelize.query(`SELECT p.product_id, p.product_name, p.product_description, p.price FROM Product as p, \`Category-Product\` as cp WHERE p.product_id = cp.product_id and cp.category_id = ${req.params.category_id} and p.product_id > all (SELECT o.product_id FROM \`Order\` as o, \`Category-Product\` as cp WHERE o.client_id = ${req.params.client_id} and cp.product_id = o.product_id and cp.category_id = ${req.params.category_id})`);
                    res.status(200).send(products[0]);
                }
                else {
                    const products = yield models_1.default.sequelize.query(`SELECT p.product_id, p.product_name, p.product_description, p.price FROM Product as p, \`Category-Product\` as cp WHERE p.product_id = cp.product_id and cp.category_id = ${req.params.category_id} and p.product_id not in (SELECT product_id FROM \`Order\` WHERE client_id = ${req.params.client_id})`);
                    res.status(200).send(products[0]);
                }
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).send({ message: error.message });
                }
                else {
                    res.status(501).send({ message: "Error externo" });
                }
            }
        });
    }
    getProductCategories(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productsCategory = yield models_1.default["Product_category"].findAll({
                    attributes: ["category_name", "category_id"],
                });
                res.status(200).send(productsCategory);
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).send({ message: error.message });
                }
                else {
                    res.status(501).send({ message: "Error externo" });
                }
            }
        });
    }
    getProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield models_1.default["Product"].findOne({
                    where: { product_id: req.params.product_id },
                    attributes: [
                        "product_id",
                        "product_name",
                        "product_description",
                        "price",
                        "stock"
                    ],
                });
                res.status(200).send(product);
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).send({ message: error.message });
                }
                else {
                    res.status(501).send({ message: "Error externo" });
                }
            }
        });
    }
    buyProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield models_1.default["Product"].findOne({
                    where: { product_id: req.body.product_id }
                });
                product.stock = product.stock - 1;
                product.save();
                yield models_1.default["Order"].create({
                    total: product.price,
                    product_id: req.body.product_id,
                    client_id: req.body.client_id
                });
                res.status(200).send(`${product.product_name} added to client ${req.body.client_id}`);
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).send({ message: error.message });
                }
                else {
                    res.status(501).send({ message: "Error externo" });
                }
            }
        });
    }
}
exports.default = SalesContoller;
//# sourceMappingURL=SalesController.js.map