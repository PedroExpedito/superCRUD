import Sequelize from 'sequelize';
import DbConfig from '../../config/database';
import User from './User';

const models = [User];

console.log('chego');

class Database {
  constructor() {
    this.init();
  }

  async init() {
    this.connection = new Sequelize(DbConfig);

    try {
      await this.connection.authenticate();
      console.log('Connection DATABASE has been established successfully.');
    } catch (err) {
      console.error('connection to database ERROR ERROR ERROR:', err);
    }
    /*
    File.init(this.connection);
    User.init(this.connection);
    User.associate(this.connection.models);
    */

    models.map((m) => m.init(this.connection))
      .map((m) => m.associate && m.associate(this.connection.models));
  }
}

export default new Database();
