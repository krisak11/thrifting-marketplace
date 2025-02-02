// backend/src/utils/testSetup.ts
import path from 'path';
import dotenv from 'dotenv';
import { resetTestDatabase } from './testDatabase.js';
import sequelize from '../config/database.js';

// Construct an absolute path to the .env.test file
const envPath = path.resolve(__dirname, '../../.env.test');
console.log('envPath:', envPath);
// Load the .env.test file
const result = dotenv.config({ path: envPath });
console.log('result:', result);

if (result.error) {
  console.error('Error loading .env.test:', result.error);
} else {
  console.log('result.parsed:', result.parsed);
}

process.env.DATABASE_URL = result.parsed?.DATABASE_URL || process.env.DATABASE_URL;
console.log('Updated process.env.DATABASE_URL:', process.env.DATABASE_URL);

// Log the loaded environment variables for verification
//console.log('Loaded env:', process.env);

// Log DATABASE_URL for verification
console.log('process.env.DATABASE_URL:', process.env.DATABASE_URL);

beforeAll(async () => {
  await resetTestDatabase(); // Ensure test database is reset before tests
});

afterAll(async () => {
  const sequelize = require('../config/database').default;
  await sequelize.close(); // Close the database connection
});
