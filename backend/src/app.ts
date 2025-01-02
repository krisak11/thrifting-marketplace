// src/app.ts
import express, { Request, Response } from 'express';

import productRoutes from './routes/productRoutes';

const app = express();

// Middleware
app.use(express.json());

// mounting productRoutes at the root
app.use('/', productRoutes);

// Test Route
app.get('/', (req: Request, res: Response) => {
  res.send('API is running!');
});

// Export the app for use in server.ts or integration tests
export default app;
