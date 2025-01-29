// backend/src/utils/seedProducts.ts

import sequelize from '../config/database';
import Product from '../models/Product';

const seedProducts = async () => {
  await sequelize.sync({ force: true }); // Reset database (ONLY FOR TESTING)

  await Product.bulkCreate([
    { name: 'Vintage Jacket', description: 'A stylish jacket', price: 50, quantity: 10, category: 'vintage', imageUrl: '/uploads/vintage-jacket.png' },
    { name: 'Leather Boots', description: 'Classic boots', price: 75, quantity: 5, category: 'on-sale', imageUrl: '/uploads/leather-boots.png' },
    { name: 'Denim Jeans', description: 'Comfortable and durable', price: 40, quantity: 20, category: 'new-items', imageUrl: '/uploads/denim-jeans.png'},
    { name: 'Pink T-shirt', description: 'Cotton H&M T-shirt', price: 10, quantity: 1, category: 'on-sale', imageUrl: '/uploads/pink-tshirt.png'},
    { name: 'Leather Leggings', description: 'Black leather leggings', price: 30, quantity: 1, category: 'popular', imageUrl: '/uploads/leather-leggings.png'},

  ]);

  console.log('Database seeded with products!');
  process.exit();
};

seedProducts().catch((error) => {
  console.error('Error seeding database:', error);
  process.exit(1);
});
