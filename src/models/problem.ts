/* 
Tabla Problem tiene llaves foraneas 
*/

import { Model } from "sequelize";

const fkName = "problem_id";

interface ModelAttributes {
  problem_id: number;
  problem_description: string;
  //submitted_by -- FK
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Problem extends Model<ModelAttributes> implements ModelAttributes {
    problem_id!: number;
    problem_description!: string;
    //submitted_by -- FK

    static associate(models: any) {
      Problem.belongsToMany(models.Call, {
        through: "Call-Problem",
        foreignKey: fkName,
      });
      Problem.belongsToMany(models.Problem_category, {
        through: "Category-Problem",
        foreignKey: fkName,
      });

      Problem.hasMany(models.Solution, { foreignKey: fkName });

      Problem.belongsTo(models.User, { foreignKey: "submitted_by" });
    }
  }

  Problem.init(
    {
      problem_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      problem_description: {
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: "Problem",
      createdAt: true,
    }
  );
  return Problem;
};
