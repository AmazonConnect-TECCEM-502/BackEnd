"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
Tabla producto No llaves foraneas
*/
const sequelize_1 = require("sequelize");
const fkName = "product_id";
module.exports = (sequelize, DataTypes) => {
    class Product extends sequelize_1.Model {
        static associate(models) {
            Product.belongsToMany(models.Product_category, {
                through: "Category-Product",
                foreignKey: fkName,
            });
            Product.hasMany(models.Order, { foreignKey: fkName });
        }
    }
    Product.init({
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        product_sku: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        product_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        product_description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: "Product",
    });
    return Product;
};
//# sourceMappingURL=product.js.map