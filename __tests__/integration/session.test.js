import app from '../../src/app';
import factory from '../factories';

const request = require('supertest');

describe('Authentication', () => {
  it('should authenticate with valid credentials', async () => {
    const user = await factory.create('User', {});

    const response = await request(app).post('/sessions').send({
      name: user.name,
      email: user.email,
      password: user.password,
    });

    expect(response.status).toBe(200);
  });

  // it('should authenticate with invalid credentials', async () => {
  //   const user = await factory.create('User', {
  //     password: '12345678',
  //   });
  //
  //   console.log(user);
  //   const response = await request(app).post('/sessions').send({
  //     name: user.name,
  //     email: user.email,
  //     password: '123456799',
  //   });
  //
  //   expect(response.status).toBe(401);
  // });

  // it('should receive JWT token when authenticated with valid credentials', async () => {
  //   const user = await factory.create('User', {
  //     password: '123456',
  //   });
  //
  //   const response = await request(app).post('/sessions').send({
  //     email: user.email,
  //     password: '123456',
  //   });
  //
  //   expect(response.body).toHaveProperty('token');
  // });
  //
  // it('should be able to access private routes when authenticated', async () => {
  //   const user = await factory.create('User', {
  //     password: '123456',
  //   });
  //
  //   const response = await request(app).get('/dashboard')
  //     .set('Authorization', `Bearer ${user.generateToken()}`);
  //
  //   expect(response.status).toBe(200);
  // });
  //
  // it('should NOT be able to access private routes when NOT authenticated', async () => {
  //   const user = await factory.create('User', {
  //     password: '123456',
  //   });
  //
  //   const response = await request(app).get('/dashboard');
  //   // .set("Authorization", `Bearer ${user.generateToken()}`);
  //
  //   expect(response.status).toBe(401);
  // });
  //
  // it('should NOT be able to access private routes with NOT token', async () => {
  //   const response = await request(app).get('/dashboard');
  //
  //   expect(response.status).toBe(401);
  // });
  // it('should NOT be able to access private routes with invalid jwt token', async () => {
  //   const response = await request(app).get('/dashboard')
  //     .set('Authorization', 'Bearer 123hsajdasashasa');
  //
  //   expect(response.status).toBe(401);
  // });
});
