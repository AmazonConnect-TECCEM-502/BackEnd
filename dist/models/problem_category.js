"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
Tabla problem_category No llaves foraneas
*/
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Problem_category extends sequelize_1.Model {
        static associate(models) {
            Problem_category.belongsToMany(models.Problem, {
                through: "Category-Problem",
                foreignKey: "category_id",
            });
        }
    }
    Problem_category.init({
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        category_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        category_description: {
            type: DataTypes.TEXT,
        },
    }, {
        sequelize,
        modelName: "Problem_category",
    });
    return Problem_category;
};
//# sourceMappingURL=problem_category.js.map