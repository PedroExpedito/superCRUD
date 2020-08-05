import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middleware/auth';

const routes = require('express').Router();

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.get('/dashboard', (req, res) => res.send());

export default routes;
