/* 
Tabla Problem tiene llaves foraneas 
*/

import { Model } from "sequelize";

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
      Problem.belongsToMany(models.Call, { through: 'Call-Problem' })
      Problem.belongsToMany(models.Problem_category, { through: 'Category-Problem' })

      Problem.hasMany(models.Solution)
      
      Problem.belongsTo(models.Agent)
    
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
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Problem",
    }
  );
  return Problem;
};