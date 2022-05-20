/* 
Tabla orders tiene llaves foraneas 
*/

import { Model } from "sequelize";

interface ModelAttributes {
  order_id: number;
  //client_id -- FK
  //product_id -- FK
  purchased_date: Date;  //<---- SE TIENE QUE PONER DATE ???
  total: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Orders extends Model<ModelAttributes> implements ModelAttributes {
    order_id!: number;
    //client_id -- FK
    //product_id -- FK
    purchased_date!: Date;  //<---- SE TIENE QUE PONER DATE ???
    total!: number;
    
    static associate(models: any) {
      Orders.belongsTo(models.Client)
      Orders.belongsTo(models.Product)
    
    }
  }

  Orders.init(
    {
      order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      purchased_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      total: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },

    },
    {
      sequelize,
      modelName: "Orders",
    }
  );
  return Orders;
};