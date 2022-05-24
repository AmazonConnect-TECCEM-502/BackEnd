/* 
Tabla cliente No llaves foraneas 
*/

import { Model } from "sequelize";

interface ModelAttributes {
  client_id: number;
  fname: string;  
  lname: string;
  email: string;
  phone: number;
  question:string;
  response: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Client extends Model<ModelAttributes> implements ModelAttributes {
    client_id!: number;
    fname!: string; 
    lname!: string;
    email!: string;
    phone!: number;
    question!:string;
    response!: string;

    static associate(models: any) {
      Client.hasMany(models.Call)
      Client.hasMany(models.Orders)

    
    }
  }

  Client.init(
    {
      client_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      fname: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lname: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false
      },
      question: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      response: {
        type: DataTypes.TEXT,
        allowNull: false
      },
    },
    {
      sequelize,
      modelName: "Client",
    }
  );
  return Client;
};
