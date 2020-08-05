import User from '../models/User';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    User.create({
      email,
      password,
    });

    return res.json({ message: 'sucess create user' });
  }
}

export default new SessionController();
