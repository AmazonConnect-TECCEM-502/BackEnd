"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Solution extends sequelize_1.Model {
        static associate(models) {
            Solution.belongsTo(models.User, { foreignKey: "submitted_id" });
            Solution.belongsTo(models.User, { foreignKey: "approved_by" });
            Solution.belongsTo(models.Problem, { foreignKey: "problem_id" });
        }
    }
    Solution.init({
        solution_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        solution_description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        approved_date: {
            type: DataTypes.DATE,
        },
    }, {
        sequelize,
        modelName: "Solution",
        timestamps: true,
        updatedAt: false,
        createdAt: "created",
    });
    return Solution;
};
//# sourceMappingURL=solution.js.map