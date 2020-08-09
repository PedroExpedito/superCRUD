import express from 'express';
import './app/models';
import cors from 'cors';
import routes from './routes';

require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

class AppController {
  constructor() {
    this.express = express();
    this.cors();
    this.middlewares();
    this.routes();
  }

  cors() {
    this.express.use(cors());
  }

  middlewares() {
    this.express.use(express.json());
  }

  routes() {
    this.express.use(routes);
  }
}

export default new AppController().express;
