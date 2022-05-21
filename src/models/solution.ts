/* 
Tabla Solution tiene llaves foraneas 
*/
import { binaryType } from "dynamodb/DynamoDB";
import { Model } from "sequelize";

interface ModelAttributes {
  solution_id: number;
  solution_description: string; 
  //Submitted_id -- FK
  //Problem_id -- FK
  //Approved_by -- FK
  approved: number; // ES DE TIPO BIT ESTA BIEN ESO ??
  approved_date: Date; 
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Solution extends Model<ModelAttributes> implements ModelAttributes {
    solution_id!: number;
    solution_description!: string; 
    //Submitted_id -- FK
    //Problem_id -- FK
    //Approved_by -- FK
    approved!: number; // ES DE TIPO BIT ESTA BIEN ESO ??
    approved_date!: Date; 

    static associate(models: any) {
      Solution.belongsTo(models.Agent)
      Solution.belongsTo(models.Manager)
      Solution.belongsTo(models.Problem)
    
    }
  }

  Solution.init(
    {
      solution_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      solution_description: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      approved: {
        type: DataTypes.BOOLEAN, // PREGUNTAR 
        defaultValue: 0
      },
      approved_date: {
        type: DataTypes.DATE,
        allowNull: false
      },
    },
    {
      sequelize,
      modelName: "Solution",
    }
  );
  return Solution;
};