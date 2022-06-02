"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
Tabla product_category No llaves foraneas
*/
const sequelize_1 = require("sequelize");
const fkName = "category_id";
module.exports = (sequelize, DataTypes) => {
    class Product_category extends sequelize_1.Model {
        static associate(models) {
            Product_category.belongsToMany(models.Product, {
                through: "Category-Product",
                foreignKey: fkName,
            });
        }
    }
    Product_category.init({
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
        modelName: "Product_category",
    });
    return Product_category;
};
//# sourceMappingURL=product_category.js.map