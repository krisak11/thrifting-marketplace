// src/app.ts
import express, { type Request, type Response } from 'express';
import cors from 'cors';
import path from 'path';
import productRoutes from './routes/productRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Define __dirname manually (ESM workaround)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


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

// mounting productRoutes at the root.
app.use('/api', productRoutes);

//mounting categoryRoutes at the root.
app.use('/api', categoryRoutes);

// Test Route
app.get('/', (req: Request, res: Response) => {
  res.send('API is running!');
});

// Export the app for use in server.ts or integration tests
export default app;
