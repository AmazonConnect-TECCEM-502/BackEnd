/* 
Tabla manager No llaves foraneas 
*/

import { Model } from "sequelize";

interface ModelAttributes {
  manager_id: number;
  fname: string; 
  lname: string;
  email: string; //Constraint amazon email ?? <----
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Manager extends Model<ModelAttributes> implements ModelAttributes {
    manager_id!: number;
    fname!: string; 
    lname!: string;
    email!: string;

    static associate(models: any) {
      Manager.hasMany(models.Agent)
      Manager.hasMany(models.Solution)
    
    }
  }

  Manager.init(
    {
      manager_id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
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
    },
    {
      sequelize,
      modelName: "Manager",
    }
  );
  return Manager;
};
