/* 
Tabla orders tiene llaves foraneas 
*/

import { Model } from "sequelize";

interface ModelAttributes {
  order_id: number;
  //client_id -- FK
  //product_id -- FK
  total: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Order extends Model<ModelAttributes> implements ModelAttributes {
    order_id!: number;
    //client_id -- FK
    //product_id -- FK
    total!: number;

    static associate(models: any) {
      Order.belongsTo(models.Client, { foreignKey: "client_id" });
      Order.belongsTo(models.Product, { foreignKey: "product_id" });
    }
  }

  Order.init(
    {
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
    },
    {
      sequelize,
      modelName: "Order",
      createdAt: "purchased_date",
    }
  );
  return Order;
};
