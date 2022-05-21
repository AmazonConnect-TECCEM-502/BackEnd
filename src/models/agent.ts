/* 
Tabla Agent tiene llaves foraneas 
*/

import { Model } from "sequelize";

interface ModelAttributes {
  agent_id: number;
  fname: string;
  lname: string;
  email: string; //<--- constrain to amazon email
  //manager_id -- FK
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Agent extends Model<ModelAttributes> implements ModelAttributes {
    agent_id!: number;
    fname!: string;
    lname!: string;
    email!: string; //<--- constrain to amazon email
    //manager_id -- FK
    

    static associate(models: any) {
      Agent.hasMany(models.Problem)
      Agent.hasMany(models.Call)
      Agent.hasMany(models.Solution)

      Agent.belongsTo(models.Manager)
    }
  }

  Agent.init(
    {
      agent_id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
      },
      fname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Agent",
    }
  );
  return Agent;
};
