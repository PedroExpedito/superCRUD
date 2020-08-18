import User from '../models/User';

class DashboardController {
  async index(req, res) {
    const user = await User.findByPk(req.userId);
    return res.json(user);
  }
}

export default new DashboardController();
