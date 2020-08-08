import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import authMiddleware from './app/middleware/auth';

const routes = require('express').Router();

routes.post('/sessions', SessionController.store);
routes.post('/register', UserController.store);

routes.use(authMiddleware);
routes.put('/user', UserController.update);

routes.get('/dashboard', (req, res) => res.send());

export default routes;
