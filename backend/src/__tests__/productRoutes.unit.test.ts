//backend/src/__tests__/productRoutes.unit.test.ts
import request from 'supertest';
import express from 'express';
import productRoutes from '../routes/productRoutes.js';
import Product from '../models/Product.js'; // Sequelize model
import { createTestApp } from '../utils/testUtils.js';

// Mock the Product model
jest.mock('../models/Product', () => ({
  findAll: jest.fn(),
}));

const app = createTestApp();

describe('Product Routes (Unit Test)', () => {
  it('GET /products should return a list of products', async () => {
    // Mock database response
    (Product.findAll as jest.Mock).mockResolvedValue([
      { id: 1, name: 'Vintage Jacket', price: 50 },
      { id: 2, name: 'Leather Boots', price: 75 },
    ]);

    const response = await request(app).get('/products');
    console.log('Response:', response.status, response.body);

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      { id: 1, name: 'Vintage Jacket', price: 50 },
      { id: 2, name: 'Leather Boots', price: 75 },
    ]);
  });

  it('GET /products should return a 500 if the database query fails', async () => {
    // Mock database failure
    (Product.findAll as jest.Mock).mockRejectedValue(
      new Error('Database error'),
    );

    const response = await request(app).get('/products');
    console.log('Response:', response.status, response.body);

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: 'Internal Server Error' });
  });
});
