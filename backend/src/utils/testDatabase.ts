// src/utils/testDatabase.ts
import sequelize from '../config/database.js';

export async function resetTestDatabase() {
  console.log(`Resetting database: ${process.env.DATABASE_URL}`); // Ensure test DB is used
  await sequelize.sync({ force: true }); // Recreate the schema
  console.log('Test database reset');
}
