"use strict";
/*
Tabla Problem tiene llaves foraneas
*/
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const fkName = "problem_id";
module.exports = (sequelize, DataTypes) => {
    class Problem extends sequelize_1.Model {
        //submitted_by -- FK
        static associate(models) {
            Problem.belongsToMany(models.Call, {
                through: "Call-Problem",
                foreignKey: fkName,
            });
            Problem.belongsToMany(models.Problem_category, {
                through: "Category-Problem",
                foreignKey: fkName,
            });
            Problem.hasMany(models.Solution, { foreignKey: fkName });
            Problem.belongsTo(models.User, { foreignKey: "submitted_by" });
        }
    }
    Problem.init({
        problem_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        problem_description: {
            type: DataTypes.TEXT,
        },
    }, {
        sequelize,
        modelName: "Problem",
        timestamps: true,
        updatedAt: false,
        createdAt: "created",
    });
    return Problem;
};
//# sourceMappingURL=problem.js.map