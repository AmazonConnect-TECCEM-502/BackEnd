/* 
Tabla call-Problem_category
*/

import { Model } from "sequelize";

interface ModelAttributes {
  call_id: number;
  category_id: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class CallProblem_category
    extends Model<ModelAttributes>
    implements ModelAttributes
  {
    call_id!: number;
    category_id!: number;
  }

  CallProblem_category.init(
    {
      call_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
    },
    {
      sequelize,
      modelName: "Call-Problem_category",
    }
  );
  return CallProblem_category;
};
