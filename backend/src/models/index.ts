import User from './User.js';
import Category from './Category.js';
import Product from './Product.js';
import Order from './Order.js';

// Define model relationships (associations)

// ✅ Corrected Category-Product Associations
Product.belongsTo(Category, { foreignKey: 'categoryId', as: 'productCategory' });  // Use 'productCategory' instead of 'category'
Category.hasMany(Product, { foreignKey: 'categoryId', as: 'categoryProducts' });   // Use 'categoryProducts' instead of 'category'

// ✅ Order Associations
Order.belongsTo(User, { foreignKey: 'userId' });
Order.belongsTo(Product, { foreignKey: 'productId' });
User.hasMany(Order, { foreignKey: 'userId' });
Product.hasMany(Order, { foreignKey: 'productId' });

export { User, Product, Order, Category };
