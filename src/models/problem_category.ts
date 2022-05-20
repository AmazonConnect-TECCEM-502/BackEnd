/* 
Tabla problem_category No llaves foraneas 
*/
import { Model } from "sequelize";

interface ModelAttributes {
  category_id: number;
  category_name: string; 
  category_description : string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Problem_category extends Model<ModelAttributes> implements ModelAttributes {
    category_id!: number;
    category_name!: string; 
    category_description!: string;

    static associate(models: any) {
      Problem_category.belongsToMany(models.Problem, { through: 'Category-Problem' })
    
    }
  }

  Problem_category.init(
    {
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      category_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      category_description: {
        type: DataTypes.TEXT, //Preguntar lo de allow nulls
      },
    },
    {
      sequelize,
      modelName: "Problem_category",
    }
  );
  return Problem_category;
};