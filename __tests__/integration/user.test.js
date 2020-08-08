import app from '../../src/app';
import factory from '../factories';
import truncate from '../utils/truncate';

const request = require('supertest');

describe('User', () => {
  beforeEach(async () => {
    await truncate();
  }); // reset DB

  afterAll(async () => {
    await new Promise(
      (resolve) => setTimeout(() => resolve(), 500),
    ); // avoid jest open handle error
  });
  it('should run back 401,NOT SEND JTW ', async () => {
    const response = await request(app).put('/user').send({
    });

    expect(response.status).toBe(401);
  });
  it('should turn back 400,NOT SEND body', async () => {
    const user = await factory.create('User', {});

    const response = await request(app).put('/user').send({
    }).set({ Authorization: `Bearer ${user.generateToken()}` });

    expect(response.status).toBe(400);
  });
  it('should turn back 400, email for update already exist', async () => {
    const user = await factory.create('User', {});
    const user2 = await factory.create('User', {
      email: 'example27@gmail.com',
    });

    const response = await request(app).put('/user').send({
      name: user.name,
      email: user2.email,
      password: user.password,
    }).set({ Authorization: `Bearer ${user.generateToken()}` });

    expect(response.status).toBe(400);
  });
  it('should turn back 200 correct', async () => {
    const user = await factory.create('User', {});

    const response = await request(app).put('/user').send({
      name: user.name,
      email: user.email,
      password: user.password,
    }).set({ Authorization: `Bearer ${user.generateToken()}` });

    expect(response.status).toBe(200);
  });
});
