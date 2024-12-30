import User from './User';
import Product from './Product';
import Order from './Order';

// Define model relationships (associations)
Order.belongsTo(User, { foreignKey: 'userId' });
Order.belongsTo(Product, { foreignKey: 'productId' });
User.hasMany(Order, { foreignKey: 'userId' });
Product.hasMany(Order, { foreignKey: 'productId' });

export { User, Product, Order };
