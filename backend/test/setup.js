const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../app');

let mongoServer;

beforeAll(async () => {
  // Start in-memory MongoDB server
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  
  // Connect to in-memory MongoDB
  await mongoose.connect(mongoUri);
  
  // Set up test environment
  process.env.NODE_ENV = 'test';
  process.env.JWT_SECRET = 'test-secret';
  process.env.JWT_EXPIRE = '1d';
  process.env.REFRESH_TOKEN_EXPIRE = '7d';
  process.env.FRONTEND_URL = 'http://localhost:3000';
});

afterAll(async () => {
  // Close database connection
  await mongoose.disconnect();
  
  // Stop in-memory MongoDB server
  await mongoServer.stop();
});

beforeEach(async () => {
  // Clear all collections before each test
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany({});
  }
});
