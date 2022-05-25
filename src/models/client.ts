/* 
Tabla cliente No llaves foraneas 
*/

import { Model } from "sequelize";

const fkName = "client_id";

interface ModelAttributes {
  client_id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Client extends Model<ModelAttributes> implements ModelAttributes {
    client_id!: number;
    first_name!: string;
    last_name!: string;
    email!: string;
    phone!: string;

    static associate(models: any) {
      Client.hasMany(models.Call, { foreignKey: fkName });
      Client.hasMany(models.Order, { foreignKey: fkName });
    }
  }

  Client.init(
    {
      client_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Client",
    }
  );
  return Client;
};
