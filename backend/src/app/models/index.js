import Sequelize from 'sequelize';
import DbConfig from '../../config/database';
import User from './User';

const models = [User];

class Database {
  constructor() {
    this.init();
  }

  async init() {
    this.connection = new Sequelize(DbConfig);

    try {
      await this.connection.authenticate();
    } catch (err) {
      console.log(`\n\n CONECTION DB ERROR \n\n ${err}`);
    }

    /*
    File.init(this.connection);
    User.associate(this.connection.models);
    User.init(this.connection);
    */

    models.map((m) => m.init(this.connection))
      .map((m) => m.associate && m.associate(this.connection.models));
  }
}

export default new Database();
