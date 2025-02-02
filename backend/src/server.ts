// src/server.ts
import dotenv from 'dotenv';
import app from './app.js';
import sequelize from './config/database.js';
import './models/index.js'; // Ensure models are registered and relationships are defined

// Load .env for development/production
dotenv.config();

const PORT = process.env.PORT || 5001;

const startServer = async () => {
  try {
    // Test the database connection
    await sequelize.authenticate();
    console.log('Database connected successfully!');

    // Sync all models with the database
    if (process.env.NODE_ENV === 'development') {
      await sequelize.sync({ alter: true }); // Use { force: true } only in non-production environments
      console.log('Database synchronized');
    } else {
      console.log('Skipping Sequelize sync in production');
    }

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to initialize the application:', err);
    process.exit(1); // Exit with a failure code
  }
};

// Handle unexpected errors gracefully
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception thrown:', err);
  process.exit(1); // Exit the process with failure
});

// Start the application
startServer();
