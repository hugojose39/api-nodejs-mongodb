const request = require('supertest');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { start, close } = require('../app');
const authConfig = require('../config/auth.json');
const UserModel = require('../models/User');

describe('Project Routes', () => {
  let server;
  let token;

  beforeAll(async () => {
    const user = await UserModel.create({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password',
    });

    token = jwt.sign({ userId: user._id }, authConfig.secret, { expiresIn: 86400 });

    server = await start();
  });

  afterAll(async () => {
    await UserModel.deleteMany({});
    await mongoose.connection.close();

    await close();
  });

  it('should create a project', async () => {
    const response = await request(server)
      .post('/admin/projects')
      .set('Authorization', `Bearer ${token}`)
      .send({
        'title': 'Primeiro Projeto',
        'description': 'Este projeto esta projetado'
      });

    expect(response.status).toBe(201);
    expect(response.body.error).toBe(false);
    expect(response.body.message).toBe('Project created with success!');
    expect(response.body.project).toHaveProperty('_id');
  });

  it('should get all projects', async () => {
    const response = await request(server)
      .get('/admin/projects')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('projects');
  });

  it('should get a project by ID', async () => {
    const project = await request(server)
      .post('/admin/projects')
      .set('Authorization', `Bearer ${token}`)
      .send({
        'title': 'Primeiro Projeto',
        'description': 'Este projeto esta projetado'
      });

    const response = await request(server)
      .get(`/admin/projects/${project.body.project._id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.error).toBe(false);
    expect(response.body).toHaveProperty('project');
  });

  it('should update a project by ID', async () => {
    const project = await request(server)
      .post('/admin/projects')
      .set('Authorization', `Bearer ${token}`)
      .send({
        'title': 'Primeiro Projeto',
        'description': 'Este projeto esta projetado'
      });

    const response = await request(server)
      .put(`/admin/projects/${project.body.project._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        'title': 'Primeiro Projeto',
        'description': 'Este projeto esta projetado 2'
      });

    expect(response.status).toBe(200);
    expect(response.body.error).toBe(false);
    expect(response.body.message).toBe('Project updated with success!');
    expect(response.body).toHaveProperty('project');
    expect(response.body.project.description).toBe('Este projeto esta projetado 2');
  });

  it('should delete a project by ID', async () => {
    const project = await request(server)
      .post('/admin/projects')
      .set('Authorization', `Bearer ${token}`)
      .send({
        'title': 'Primeiro Projeto',
        'description': 'Este projeto esta projetado'
      });

    const response = await request(server)
      .delete(`/admin/projects/${project.body.project._id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.error).toBe(false);
    expect(response.body.message).toBe('Project deleted with success!');
    expect(response.body).toHaveProperty('project');
  });
});
