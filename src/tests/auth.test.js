const request = require('supertest');
const mongoose = require('mongoose');
const { start, close } = require('../app');
const UserModel = require('../models/User');

describe('Auth Routes', () => {
    let server;

    beforeAll(async () => {
        await UserModel.create({
            name: 'Test User',
            email: 'test@example.com',
            password: 'password',
        });

        server = await start();
    });

    afterAll(async () => {
        await UserModel.deleteMany({});
        await mongoose.connection.close();
        await close();
    });

    it('should create a user', async () => {
        const response = await request(server)
            .post('/auth/register')
            .send({
                "name": "John Doe",
                "email": "johndoe@gmail.com",
                "password": "password"
            });

        expect(response.status).toBe(201);
        expect(response.body.error).toBe(false);
        expect(response.body.message).toBe('Registered with success!');
        expect(response.body).toHaveProperty('user');
        expect(response.body).toHaveProperty('token');
    });

    it('should autheticate a user by email', async () => {
        const response = await request(server)
            .post('/auth/autheticate')
            .send({
                "email": "test@example.com",
                "password": "password"
            });

        expect(response.status).toBe(200);
        expect(response.body.error).toBe(false);
        expect(response.body).toHaveProperty('user');
        expect(response.body).toHaveProperty('token');
    });
});
