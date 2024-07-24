import cors from 'cors';
import pino from 'pino-http';
import express from 'express';
import { env } from './utils/env.js';
import contactsRouter from './routers/contactsRouter.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';


export const setupServer = () => {
  const PORT = Number(env('PORT', '3000'));
  const app = express();

  app.use((req, res, next) => {
    console.log('-^-'.repeat(33));
    console.log(`Time: ${new Date().toLocaleString()}`);
    next();
  });
  app.use(cors());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );
  app.use(express.json());
  app.use(
    express.json({
      type: ['application/json', 'application/vnd.api+json'],
      limit: '100kb',
    }),
  );



  app.get('/', (req, res) => {
    res.json({
      message: 'goit-nodejs-hw-03:validation,pagination,sort',
    });
  });

  app.use(contactsRouter);

  app.use('*', notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port:[${PORT}]`);
  });
};
