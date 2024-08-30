import cors from 'cors';
import pino from 'pino-http';
import express from 'express';
import { env } from './utils/env.js';
import router from './routers/router.js';
import cookieParser from 'cookie-parser';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';
import { UPLOADS_DIR } from './constants/index.js';

export const setupServer = () => {
  const PORT = Number(env('PORT', '3000'));
  const app = express();

  app.use((req, res, next) => {
    console.log('-^-'.repeat(33));
    console.log(`Time: ${new Date().toLocaleString()}`);
    next();
  });

  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());
  app.use(
    express.json({
      type: ['application/json', 'application/vnd.api+json'],
      limit: '100kb',
    }),
  );

  app.use('/api-docs', swaggerDocs());
  app.use('/uploads', express.static(UPLOADS_DIR));
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/', (req, res) => {
    res.json({
      message: 'goit-nodejs-hw-07:google and swagger',
    });
  });
  // app.use(authUserRouter);
  // app.use(contactsRouter);
  app.use(router);

  app.use('*', notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port:[${PORT}]`);
  });
};
