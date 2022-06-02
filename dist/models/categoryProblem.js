'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class CategoryProblem extends sequelize_1.Model {
        static associate(models) {
            // define association here
        }
    }
    CategoryProblem.init({
        problem_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'Problem',
                key: 'problem_id'
            }
        },
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'Problem_category',
                key: 'category_id'
            }
        }
    }, {
        sequelize,
        modelName: 'Category-Problem',
    });
    return CategoryProblem;
};
//# sourceMappingURL=categoryProblem.js.map