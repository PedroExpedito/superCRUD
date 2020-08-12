import app from '../../src/app';
import factory, { fakeUser } from '../factories';
import truncate from '../utils/truncate';

const request = require('supertest');

describe('Register', () => {
  beforeEach(async () => {
    await truncate();
  });

  afterAll(async () => {
    await new Promise(
      (resolve) => setTimeout(() => resolve(), 500),
    ); // avoid jest open handle error
  });
  it('should validation fails', async () => {
    const response = await request(app).post('/register').send({
      name: fakeUser.name,
      password: fakeUser.password,
    });

    expect(response.status).toBe(400);
  });

  it('should turn back "user already registered"', async () => {
    const user = await factory.create('User', {});

    const response = await request(app).post('/register').send({
      name: user.name,
      email: user.email,
      password: user.password,
    });

    expect(response.status).toBe(400);
  });

  it('should create a new user', async () => {
    const response = await request(app).post('/register').send({
      name: fakeUser.name,
      email: fakeUser.email,
      password: fakeUser.password,
    });

    expect(response.status).toBe(200);
  });
});
