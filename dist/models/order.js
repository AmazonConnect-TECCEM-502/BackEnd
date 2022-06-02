"use strict";
/*
Tabla orders tiene llaves foraneas
*/
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Order extends sequelize_1.Model {
        static associate(models) {
            Order.belongsTo(models.Client, { foreignKey: "client_id" });
            Order.belongsTo(models.Product, { foreignKey: "product_id" });
        }
    }
    Order.init({
        order_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        total: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: "Order",
        timestamps: true,
        updatedAt: false,
        createdAt: "purchased_date",
    });
    return Order;
};
//# sourceMappingURL=order.js.map