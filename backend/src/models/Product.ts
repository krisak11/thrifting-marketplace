import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';
import Category from './Category.js';

class Product extends Model {
  public id!: number;
  public name!: string;
  public description!: string;
  public price!: number;
  public quantity!: number;
  public categoryId!: number;     
  public tags!: string[]; 
  public imageUrl!: string;
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // Store only the lowest-level category in the hierarchy.
    categoryId: { 
      type: DataTypes.INTEGER, 
      allowNull: true, 
      references: { 
        model: Category, key: "id" 
      } 
    },
    // Tags for special attributes like on-sale, new-item, vintage.
    tags: { 
      type: DataTypes.ARRAY(DataTypes.STRING), 
      allowNull: true 
    },
    imageUrl: {  // Store only the URL (string)
        type: DataTypes.STRING,
        allowNull: true,  // image is optional - serve placeholder instead
    },
  },
  {
    sequelize,
    tableName: 'products',
    modelName: 'Product',
  }
);

// Define Product ↔ Category Relationship
Product.belongsTo(Category, { foreignKey: "categoryId", as: "category" });

export default Product;
