// backend/src/utils/testUtils.ts
import express from 'express';
import productRoutes from '../routes/productRoutes.js';

export function createTestApp() {
    const app = express();
    app.use(express.json());
    app.use('/', productRoutes);
    return app;
}
