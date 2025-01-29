// src/config/database.ts
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Load .env file manually
dotenv.config();

// Throw an error if DATABASE_URL is not defined
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined in .env file');
}

// Initialize Sequelize with the connection string
const sequelize = new Sequelize(
  process.env.DB_NAME || 'thrifting_marketplace', // Database name
  process.env.DB_USER || 'postgres', // Database user
  process.env.DB_PASSWORD , // Database password
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    logging: console.log, // Set to true for debugging queries
  }
);

export default sequelize;

