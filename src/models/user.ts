/* 
Tabla Agent tiene llaves foraneas 
*/

import { Model } from "sequelize";

interface ModelAttributes {
  user_id: number;
  first_name: string;
  last_name: string;
  email: string; //<--- constrain to telmex email
  user_type: number;
  cognito_uuid: string;
  //manager_id -- FK
}

export enum UserRoles {
  ADMIN = "admin",
  AGENT = "agent",
  MANAGER = "manager",
}

module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model<ModelAttributes> implements ModelAttributes {
    user_id!: number;
    first_name!: string;
    last_name!: string;
    email!: string; //<--- constrain to telmex email
    user_type!: number;
    cognito_uuid!: string;

    static associate(models: any) {
      User.hasMany(User, { foreignKey: "manager_id" });
      User.belongsTo(User, { foreignKey: "manager_id" });
      User.hasMany(models.Call, { foreignKey: "agent_id" });
      User.hasMany(models.Problem, { foreignKey: "submitted_by" });
      User.hasMany(models.Solution, { foreignKey: "approved_by" });
      User.hasMany(models.Solution, { foreignKey: "submitted_id" });
    }
  }

  User.init(
    {
      user_id: {
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
        unique: true,
        allowNull: true,
      },
      user_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cognito_uuid: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
