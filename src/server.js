import cors from 'cors';
import pino from 'pino-http';
import express from 'express';
import { env } from './utils/env.js';
// import contactsRouter from './routers/contactsRouter.js';
// import authUserRouter from './routers/authUserRouter.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import cookieParser from 'cookie-parser';
import router from './routers/router.js';
import { UPLOADS_DIR } from './constants/index.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';
import { log } from './utils/log.js';
// import { swaggerDocs } from './middlewares/swaggerDocs.js';

export const setupServer = () => {
  const PORT = Number(env('PORT', '3000'));
  const app = express();

  // app.use('/uploads', express.static(UPLOADS_DIR));

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
  app.use(cookieParser());
  app.use('/uploads', express.static(UPLOADS_DIR));
  // app.use('/api-docs', swaggerDocs());

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
    log(`Server is running on port:[${PORT}]`);
  });
};
