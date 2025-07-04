process.env.NODE_ENV = 'test';
process.env.DB_URI = 'mongodb://localhost:27017/testdb'; // Replace with your test DB URI
const request = require('supertest');
const mongoose = require('mongoose');
const NewsletterSubscriber = require('../models/NewsletterSubscriber');
const express = require('express');
const app = express();

// Mock middleware
app.use((req, res, next) => {
    req.user = { roles: ['Admin'] }; // Mock user as admin
    next();
});

// Mock upload middleware
const submissionController = require('../controllers/submissionController');
submissionController.upload = {
    single: () => (req, res, next) => {
        next();
    }
};

// Mock authorizeRoles middleware
const checkRole = require('../middleware/checkRole');
checkRole.authorizeRoles = () => (req, res, next) => {
    next();
};

// require('dotenv').config();

describe('Newsletter API', () => {
    beforeAll(async () => {
        await mongoose.connect('mongodb://localhost:27017/testdb', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    });

    afterEach(async () => {
        await NewsletterSubscriber.deleteMany({});
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('subscribes a valid email', async () => {
        const res = await request(app)
            .post('/api/newsletter')
            .send({ email: 'test@znnp.org' });
        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe('Successfully subscribed to newsletter');
    });

    it('gets all newsletter subscribers (Admin only)', async () => {
        const res = await request(app).get('/api/newsletter');
        expect(res.statusCode).toBe(200);
    });

    it('prevents duplicate emails', async () => {
        const res = await request(app)
            .post('/api/newsletter')
            .send({ email: 'dupe@znnp.org' });
        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe('Email already subscribed');
    });
});
