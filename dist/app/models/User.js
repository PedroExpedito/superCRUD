"use strict";const bcript = require('bcryptjs');
const jwt = require("jsonwebtoken");

module.exports = (sequelize, Datatypes) => {
  const User = sequelize.define("User", {
    name: Datatypes.STRING,
    email: Datatypes.STRING,
    password: Datatypes.VIRTUAL,
    password_hash: Datatypes.STRING,
  },
    {
      hooks: {
        beforeSave: async user => {
          if (user.password) {
            user.password_hash = await bcript.hash(user.password , 2);
          }
      }
      }
    }
  );

  // precisa ser function e não arrow function por causa do acesso ao this
  User.prototype.checkPassword = function(password) {
    return bcript.compare(password, this.password_hash)
  }

  User.prototype.generateToken = function() {
    return jwt.sign({ id: this.id }, process.env.APP_SECRET)
  }

  return User;
};
