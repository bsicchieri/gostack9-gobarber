// Starting GoBarber Backend

// importando o express
import express from 'express';

// importando as rotas de outro arquivo
import routes from './routes';

import './database';

class App {
  // constructor - executado sempre que a classe for chamada
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
