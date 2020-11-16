import User from '../models/User';

class DashboardController {
  async index(req, res) {
    const user = await User.findByPk(req.userId);
    const { id, name, email } = user;
    return res.json({ id, name, email });
  }
}

export default new DashboardController();
