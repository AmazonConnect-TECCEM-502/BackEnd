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
  approved_date: Date;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Solution extends Model<ModelAttributes> implements ModelAttributes {
    solution_id!: number;
    solution_description!: string;
    //Submitted_id -- FK
    //Problem_id -- FK
    //Approved_by -- FK
    approved_date!: Date;

    static associate(models: any) {
      Solution.belongsTo(models.User, { foreignKey: "submitted_id" });
      Solution.belongsTo(models.User, { foreignKey: "approved_by" });
      Solution.belongsTo(models.Problem, { foreignKey: "problem_id" });
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
        allowNull: false,
      },
      approved_date: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "Solution",
      createdAt: true,
    }
  );
  return Solution;
};
