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

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required().min(2).max(256),
      email: Yup.string().email().required().min(2)
        .max(256),
      password: Yup.string().required().min(8).max(256),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validations fails' });
    }

    const user = await User.findByPk(req.userId);

    const { email, password } = req.body;

    if (email !== user.email) {
      const userExist = await User.findOne({ where: { email } });

      if (userExist) {
        return res.status(400).json({ error: 'email already exist' });
      }
    }

    if (!(await user.checkPassword(password))) {
      return res.status(400).json({ error: 'password does not match' });
    }

    if (!req.body.newPassword) {
      req.body.newPassword = password;
    }

    try {
      await user.update({
        name: req.body.name,
        email,
        password: req.body.newPassword,
      });
    } catch (err) {
      return res.status(501).send();
    }

    return res.json({ id: req.userId });
  }

  async delete(req, res) {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ error: 'password not send' });
    }

    const user = await User.findByPk(req.userId);

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'password incorrect' });
    }

    try {
      user.destroy();
    } catch (err) {
      res.status(501);
    }

    return res.json();
  }
}

export default new RegisterController();
