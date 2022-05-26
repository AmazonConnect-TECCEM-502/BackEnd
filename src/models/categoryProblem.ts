'use strict';
import {Model} from 'sequelize';

interface CategoryProblemAttributes{
  problem_id: number;
  category_id: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class CategoryProblem extends Model<CategoryProblemAttributes> implements CategoryProblemAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    problem_id!: number;
    category_id!: number;
    static associate(models: any) {
      // define association here
    }
  }
  CategoryProblem.init({
    problem_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Problem',
        key: 'problem_id'
      }
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Problem_category',
        key: 'category_id'
      }
    }
  }, {
    sequelize,
    modelName: 'Category-Problem',
  });
  return CategoryProblem;
};