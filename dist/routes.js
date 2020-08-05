"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }const routes = require('express').Router();
const { User } = require('./app/models');
var _SessionController = require('./app/controllers/SessionController'); var _SessionController2 = _interopRequireDefault(_SessionController);
const authMiddleware = require('./app/middleware/auth');


routes.post('/sessions', _SessionController2.default.store);

routes.use(authMiddleware);
routes.get('/dashboard', (req, res) => res.send() );

exports. default = routes;
