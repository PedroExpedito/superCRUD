import { factory } from 'factory-girl';
import faker from 'faker';
import '../src/app/models';
import User from '../src/app/models/User';

factory.define('User', User, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(8),
});

export default factory;
