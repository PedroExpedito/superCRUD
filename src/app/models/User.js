import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const saltRounds = 2;

class User extends Model {
  static init(sequelize) {
    super.init({
      name: Sequelize.STRING,
      email: Sequelize.STRING,
      password: Sequelize.VIRTUAL,
      password_hash: Sequelize.STRING,
    },
    {
      sequelize,
    });

    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, saltRounds);
      }
    });

    // precisa ser function e não arrow function por causa do acesso ao this
    User.prototype.checkPassword = function (password) {
      return bcrypt.compare(password, this.password_hash);
    };

    User.prototype.generateToken = function () {
      return jwt.sign({ id: this.id }, process.env.APP_SECRET);
    };

    return this;
  }
}

export default User;
