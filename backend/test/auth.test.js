const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const app = require('../server'); // Assuming your app is exported from server.js

describe('Authentication Routes', () => {
  it('should register a new user', (done) => {
    request(app)
      .post('/api/auth/register')
      .send({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        expect(res.body).to.have.property('message', 'User registered successfully');
        done();
      });
  });

  it('should login an existing user', (done) => {
    request(app)
      .post('/api/auth/login')
      .send({
        username: 'testuser',
        password: 'password123'
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.have.property('token');
        done();
      });
  });

  it('should not register a user with an existing username', (done) => {
    request(app)
      .post('/api/auth/register')
      .send({
        username: 'testuser',
        email: 'test2@example.com',
        password: 'password123'
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body).to.have.property('message', 'Username already exists');
        done();
      });
  });
});
