// src/app.ts
import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import productRoutes from './routes/productRoutes';

const app = express();

// ✅ Enable CORS for frontend requests
app.use(
  cors({
    origin: ['http://localhost:5173'], // Allow frontend during development
    credentials: true, // Allow cookies/session tokens if needed
  })
);

// Middleware
app.use(express.json());

// Serve static files from 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// mounting productRoutes at the root
app.use('/', productRoutes);

// Test Route
app.get('/', (req: Request, res: Response) => {
  res.send('API is running!');
});

// Export the app for use in server.ts or integration tests
export default app;
