import * as Yup from 'yup';
import User from '../models/User';

class RegisterController {
  async store(req, res) {
    const { email } = req.body;

    const schema = Yup.object().shape({
      name: Yup.string().required().min(2).max(256),
      email: Yup.string().email().required().min(2)
        .max(256),
      password: Yup.string().required().min(8).max(256),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validations fails' });
    }

    const user = await User.findOne({ where: { email } });

    if (user) {
      return res.status(400).json({ message: 'user already registered' });
    }

    try {
      User.create(req.body);
    } catch (err) {
      res.status(501).json();
    }

    return res.json(req.body);
  }
}

export default new RegisterController();
