const request = require('supertest');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { start, close } = require('../app');
const authConfig = require('../config/auth.json');
const UserModel = require('../models/User');
const ProjectModel = require('../models/Project');

describe('Project Routes', () => {
  let server;
  let token;
  let projectId;

  beforeAll(async () => {
    const user = await UserModel.create({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password',
    });

    const project = await ProjectModel.create({
      title: 'Primeiro Projeto',
      description: 'Este projeto esta projetado'
    });

    projectId = project._id

    token = jwt.sign({ id: user._id }, authConfig.secret, { expiresIn: 86400 });

    server = await start();
  });

  afterAll(async () => {
    await UserModel.deleteMany({});
    await ProjectModel.deleteMany({});
    await mongoose.connection.close();

    await close();
  });

  it('should create a project', async () => {
    const response = await request(server)
      .post('/api/projects')
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
      .get('/api/projects')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('projects');
  });

  it('should get a project by ID', async () => {
    const response = await request(server)
      .get(`/api/projects/${projectId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.error).toBe(false);
    expect(response.body).toHaveProperty('project');
  });

  it('should update a project by ID', async () => {
    const response = await request(server)
      .put(`/api/projects/${projectId}`)
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
    const response = await request(server)
      .delete(`/api/projects/${projectId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.error).toBe(false);
    expect(response.body.message).toBe('Project deleted with success!');
    expect(response.body).toHaveProperty('project');
  });
});
