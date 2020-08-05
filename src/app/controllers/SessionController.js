import User from '../models/User';

class SessionController {
  async store(req, res) {
    try {
      await User.create(req.body);
    } catch (err) {
      return res.status(400).json(err);
    }

    return res.json({ message: 'sucess create user' });
  }
}

export default new SessionController();
