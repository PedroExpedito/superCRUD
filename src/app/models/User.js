import Sequelize, { Model } from 'sequelize';
import bcript from 'bcryptjs';
import jwt from 'jsonwebtoken';

class User extends Model {
  static int(sequelize) {
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
        this.user.password_hash = await bcript.hash(user.password, 2);
      }
    });
    // precisa ser function e não arrow function por causa do acesso ao this
    User.prototype.checkPassword = function (password) {
      return bcript.compare(password, this.password_hash);
    };

    User.prototype.generateToken = function () {
      return jwt.sign({ id: this.id }, process.env.APP_SECRET);
    };

    return User;
  }
}

export default User;
