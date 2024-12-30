// src/config/database.ts
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';


dotenv.config();

// Throw an error if DATABASE_URL is not defined
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined in .env file');
}

// Initialize Sequelize with the connection string
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: console.log, // Enable SQL query logging for debugging
});

export default sequelize;
