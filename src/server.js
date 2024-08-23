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

export const setupServer = () => {
  const PORT = Number(env('PORT', '3000'));
  const app = express();

  app.use('/uploads', express.static(UPLOADS_DIR));

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

  app.get('/', (req, res) => {
    res.json({
      message: 'goit-nodejs-hw-06:emailBy-Brevo and save-img-to-cloudinary',
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
