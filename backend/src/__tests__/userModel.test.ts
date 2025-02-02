// backend/src/__tests__/userModel.test.ts
import User from '../models/User.js';
import { resetTestDatabase } from '../utils/testDatabase.js';

beforeAll(async () => {
  await resetTestDatabase();
});

describe('User Model', () => {
  it('should create a user in the database', async () => {
    const user = await User.create({ name: 'Alice', email: 'alice@example.com' });
    expect(user.id).toBeDefined(); // Check that an ID is auto-generated
    expect(user.name).toBe('Alice');
    expect(user.email).toBe('alice@example.com');
  });

  it('should retrieve a user from the database', async () => {
    // Create a user
    const createdUser = await User.create({ name: 'Bob', email: 'bob@example.com' });

    // Fetch the user
    const fetchedUser = await User.findOne({ where: { email: 'bob@example.com' } });

    expect(fetchedUser).toBeDefined();
    expect(fetchedUser?.id).toEqual(createdUser.id);
    expect(fetchedUser?.name).toBe('Bob');
  });
});