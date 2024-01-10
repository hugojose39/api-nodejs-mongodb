const request = require('supertest');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { start, close } = require('../app');
const authConfig = require('../config/auth.json');
const UserModel = require('../models/User');

describe('User Routes', () => {
    let server;
    let token;
    let userId;

    beforeAll(async () => {
        const user = await UserModel.create({
            name: 'Test User',
            email: 'test@example.com',
            password: 'password',
        });

        userId = user._id;

        token = jwt.sign({ userId: userId }, authConfig.secret, { expiresIn: 86400 });

        server = await start();
    });

    afterAll(async () => {
        await UserModel.deleteMany({});
        await mongoose.connection.close();

        await close();
    });

    it('should get all users', async () => {
        const response = await request(server)
            .get('/api/users')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('users');
    });

    // it('should get a user by ID', async () => {
        // const response = await request(server)
            // .get(`/api/users/${userId}`)
            // .set('Authorization', `Bearer ${token}`);

        // expect(response.status).toBe(200);
        // expect(response.body.error).toBe(false);
        // expect(response.body).toHaveProperty('user');
    // });

    // it('should update a user by ID', async () => {
        // const response = await request(server)
            // .put(`/api/users/${userId}`)
            // .set('Authorization', `Bearer ${token}`)
            // .send({
                // name: 'Updated User',
            // });

        // expect(response.status).toBe(200);
        // expect(response.body.error).toBe(false);
        // expect(response.body.message).toBe('User updated with success!');
        // expect(response.body).toHaveProperty('user');
        // expect(response.body.user.name).toBe('Updated User');
    // });

    // it('should delete a user by ID', async () => {
        // const response = await request(server)
            // .delete(`/api/users/${userId}`)
            // .set('Authorization', `Bearer ${token}`);

        // expect(response.status).toBe(200);
        // expect(response.body.error).toBe(false);
        // expect(response.body.message).toBe('User deleted with success!');
        // expect(response.body).toHaveProperty('user');
    // });
});
