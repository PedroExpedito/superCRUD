import * as Yup from 'yup';
import User from '../models/User';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

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

    if (!user) {
      return res.status(404).json({ message: 'user not found' });
    }

    if (user.checkPassword(password)) {
      return res.status(401).json({ message: 'invalid password' });
    }

    return res.json({ message: 'sucess' });
  }
}

export default new SessionController();
