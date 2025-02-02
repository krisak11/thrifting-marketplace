import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';

class Category extends Model {
  public id!: number;
  public name!: string;
  public parentId?: number;
}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    // Parent Category (Optional for top-level categories)
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: Category, key: 'id' },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    },
  },
  { sequelize, modelName: 'category' },
);

// Define self-referencing relationship (for hierarchical categories)
Category.hasMany(Category, { as: 'subcategories', foreignKey: 'parentId' });
Category.belongsTo(Category, { as: 'parentCategory', foreignKey: 'parentId' });

export default Category;
