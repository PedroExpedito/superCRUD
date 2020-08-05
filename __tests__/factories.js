import { factory } from 'factory-girl';
import faker from 'faker';
import '../src/app/models';
import User from '../src/app/models/User';

factory.define('User', User, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  passowrd: faker.internet.password(),
});

export default factory;
