import '../../src/app/models';

import bcript from 'bcryptjs';

import User from '../../src/app/models/User';

describe('User', () => {
  it('should encrypt user password', async () => {
    const user = await User.create({
      name: 'Pedro',
      email: 'Pedro@gmail.com',
      password: '123456',
    });

    expect(await bcript.compare('123456', user.password_hash)).toBe(true);
  });
});
