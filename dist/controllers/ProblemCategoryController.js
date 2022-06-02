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
class ProblemCategoryController extends AbstractController_1.default {
    constructor() {
        super(...arguments);
        this.categoryId = 1;
        this.solutionId = 1;
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProblemCategoryController("problem");
        return this.instance;
    }
    // Declaración rutas del controlador
    initRoutes() {
        this.router.get("/getProblemCategorys", this.getProblemCategorys.bind(this));
        this.router.post("/postProblem", this.postProblem.bind(this));
        this.router.get("/getProblem/:id", this.getProblems.bind(this));
        this.router.post("/postProblemId", this.postProblemId.bind(this));
        this.router.get("/getProblemid", this.getProblemid.bind(this));
        this.router.get("/getSolutions/:id", this.getSolutions.bind(this));
        this.router.delete("/deleteSolution/:ID", this.deleteSolution.bind(this));
        this.router.post("/postCreateSolution", this.postCreateSolution.bind(this));
        this.router.post("/postCreateProblem", this.postCreateProblem.bind(this));
        this.router.get("/getCategories", this.getCategories.bind(this));
        this.router.get("/getProposals/:ID", this.getProposals.bind(this));
        this.router.post("/postApproveProposals/:ID", this.postApproveProposals.bind(this));
        this.router.delete("/deleteProblem/:ID", this.deleteProblem.bind(this));
    }
    getProblemCategorys(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let problems = yield models_1.default["Problem_category"].findAll({
                    attributes: ["category_name", "category_id"],
                });
                // let problems2 = await db.sequelize.query("SELECT * FROM Problem_category",{
                //   model: db["Problem_category"],
                //   mapToModel: true
                // })
                res.status(200).send(problems);
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
    postProblem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.categoryId = req.body.category_id;
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
    getProblems(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let qna = yield models_1.default.sequelize.query("SELECT problem_description, category_id, p.problem_id FROM `Category-Problem` as cp, Problem as p WHERE cp.problem_id = p.problem_id and cp.category_id = " +
                    req.params.id, {
                    model: models_1.default["Category-Problem"],
                    mapToModel: true,
                });
                res.status(200).send(qna);
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
    getProblemid(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.body);
                const resultado = yield models_1.default["Problem"].sequelize.query("Select problem_id as ID, problem_description as question from Problem");
                console.log("Consulta exitosa");
                res.status(200).send(resultado[0]);
            }
            catch (err) {
                console.log("Error");
                res.status(500).send("Error fatal:" + err);
            }
        });
    }
    postProblemId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.solutionId = req.body.solution_id;
                console.log("Recibi problem id", req.body.solution_id);
                res.status(200).send("Recibi problem id");
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
    getSolutions(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const ID = req.params.id;
            try {
                let resultado = yield models_1.default.sequelize.query(`SELECT solution_description, problem_id, approved_date FROM Solution AS Solution WHERE Solution.approved_date IS NOT NULL AND problem_id = ${ID}`, {
                    model: models_1.default["Solution"],
                    mapToModel: true,
                });
                console.log("Consulta exitosa");
                res.status(200).send(resultado);
            }
            catch (err) {
                console.log("Error");
                res.status(500).send("Error fatal:" + err);
            }
        });
    }
    deleteSolution(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const ID = req.params.ID;
            try {
                console.log(req.body);
                yield models_1.default["Solution"].destroy({
                    where: {
                        solution_id: ID,
                    },
                }),
                    console.log("Registro exitoso");
                res.status(200).send("Registro exitoso");
            }
            catch (err) {
                console.log("Error");
                res.status(500).send("Error fatal:" + err);
            }
        });
    }
    postCreateSolution(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield models_1.default["Solution"].create(req.body);
                console.log("Registro exitoso");
                res.status(200).send("Registro exitoso");
            }
            catch (err) {
                console.log("Error");
                res.status(500).send("Error fatal:" + err);
            }
        });
    }
    postCreateProblem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield models_1.default["Problem"].create({
                    problem_description: req.body.problem_description,
                    submitted_by: req.body.submitted_by
                })
                    .then((resultado) => {
                    const problem_id = resultado.dataValues.problem_id;
                    models_1.default["Category-Problem"].create({
                        problem_id: problem_id,
                        category_id: req.body.category_id
                    });
                });
                console.log("Registro exitoso");
                res.status(200).send("Registro exitoso");
            }
            catch (err) {
                console.log("Error");
                res.status(500).send("Error fatal:" + err);
            }
        });
    }
    getCategories(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resultado = yield models_1.default["Problem_category"].findAll();
                console.log("Consulta existosa");
                res.status(200).send(resultado);
            }
            catch (err) {
                console.log("Error");
                res.status(500).send("Error fatal:" + err);
            }
        });
    }
    getProposals(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const ID = req.params.ID;
            try {
                const resultado = yield models_1.default["Solution"].findAll({
                    where: {
                        approved_date: null,
                        problem_id: ID
                    }
                });
                console.log("Consulta exitosa");
                console.log(resultado);
                res.status(200).send(resultado);
            }
            catch (err) {
                console.log("Error");
                res.status(500).send("Error fatal:" + err);
            }
        });
    }
    postApproveProposals(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const ID = req.params.ID;
            const date = req.body.date;
            console.log(date);
            try {
                const resultado = yield models_1.default["Solution"].findOne({
                    where: {
                        solution_id: ID
                    }
                });
                resultado.approved_date = req.body.date;
                yield resultado.save();
                console.log("Consulta exitosa");
                console.log(resultado);
                res.status(200).send(resultado);
            }
            catch (err) {
                console.log("Error");
                res.status(500).send("Error fatal:" + err);
            }
        });
    }
    deleteProblem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const ID = req.params.ID;
            try {
                console.log(req.body);
                yield models_1.default["Problem"].destroy({
                    where: {
                        problem_id: ID,
                    },
                }),
                    console.log("Registro exitoso");
                res.status(200).send("Registro exitoso");
            }
            catch (err) {
                console.log("Error");
                res.status(500).send("Error fatal:" + err);
            }
        });
    }
}
exports.default = ProblemCategoryController;
//# sourceMappingURL=ProblemCategoryController.js.map