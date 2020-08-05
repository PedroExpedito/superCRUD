"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _ = require('../models/');

class SessionController {
  async store(req, res) {
    console.log("\n\n\nCHEGUEI\n\n");
    const { email, password } = req.body

    if (!email) {
      return res.status(400).json({ message: 'invalid' });
    }

    const user = await _.User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ message: "incorrect password" });
    }
    return res.status(200).send({user,

      token: user.generateToken()});
  }
}

exports. default = new SessionController();
