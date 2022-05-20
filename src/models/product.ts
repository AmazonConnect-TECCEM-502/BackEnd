/* 
Tabla producto No llaves foraneas 
*/
import { Model } from "sequelize";

interface ModelAttributes {
  product_id: number;
  product_name: string; 
  product_description: string;
  price: number; 
  stock: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Product extends Model<ModelAttributes> implements ModelAttributes {
    product_id !: number;
    product_name!: string; 
    product_description!: string;
    price!: number; 
    stock!: number;

    static associate(models: any) {
      Product.belongsToMany(models.Product_category, { through: 'Category-Product' })
      Product.hasMany(models.Orders)
    
    }
  }

  Product.init(
    {
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      product_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      product_description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};