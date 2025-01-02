//backend/src/__tests__/productRoutes.integration.test.ts
import request from 'supertest';
import app from '../app';
import Product from '../models/Product';
import { resetTestDatabase } from '../utils/testDatabase';

beforeAll(async () => {
  await resetTestDatabase();
  await Product.bulkCreate([
    { name: 'Vintage Jacket', description: 'A cool jacket', price: 50, quantity: 10 },
    { name: 'Leather Boots', description: 'Stylish boots', price: 75, quantity: 5 },
  ]);
});

afterAll(async () => {
  const sequelize = require('../config/database').default;
  await sequelize.close();
});

describe('Product Routes (Integration Test)', () => {
  it('GET /products should return a list of products', async () => {
    const response = await request(app).get('/products');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      expect.objectContaining({ name: 'Vintage Jacket', price: 50 }),
      expect.objectContaining({ name: 'Leather Boots', price: 75 }),
    ]);
  });

  it('GET /nonexistent should return 404 for unknown route', async () => {
    const response = await request(app).get('/nonexistent');
    expect(response.status).toBe(404);
  });
});

describe('Edge Case Tests', () => {
    it('GET /products should return an empty array if no products exist', async () => {
        await resetTestDatabase(); // Reset database to ensure no data
        const response = await request(app).get('/products');
        expect(response.status).toBe(200);
        expect(response.body).toEqual([]); // Expect an empty array
    });

    it('POST /products should fail with missing required fields', async () => {
        const response = await request(app)
            .post('/products')
            .send({ name: 'Incomplete Product' }); // Missing required fields
        expect(response.status).toBe(400); // Bad Request
        expect(response.body.message).toBe('Validation error');
        expect(response.body.errors).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ msg: 'Description is required' }),
                expect.objectContaining({ msg: 'Price must be a positive number' }),
                expect.objectContaining({ msg: 'Quantity must be a positive integer' }),
            ])
        );
    });
    
});

