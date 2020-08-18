import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import authMiddleware from './app/middleware/auth';
import DashboardController from './app/controllers/DashboardController';

const routes = require('express').Router();

routes.post('/sessions', SessionController.store);
routes.post('/register', UserController.store);

routes.use(authMiddleware);
routes.put('/user', UserController.update);
routes.delete('/user', UserController.delete);
routes.get('/dashboard', DashboardController.index);

export default routes;
