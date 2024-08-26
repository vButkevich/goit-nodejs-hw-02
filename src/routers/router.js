// src/routers/index.js

import { Router } from 'express';
import authUserRouter from './authUserRouter.js';
import authUserResetRouter from './authUserResetRouter.js';
import authGoogleRouter from './authGoogleRouter.js';
import contactsRouter from './contactsRouter.js';
import { auth } from '../middlewares/auth.js';
import { swaggerDocs } from '../middlewares/swaggerDocs.js';

const router = Router();

// router.use('/', (req, res) => {
//   res.json({
//     message: 'goit-nodejs-hw-07:1.google | 2.swagger',
//   });
// });
router.use('/auth', authUserRouter);
router.use('/auth', authUserResetRouter);
router.use('/auth/google', authGoogleRouter);
router.use('/contacts/all', contactsRouter);
router.use('/contacts', auth, contactsRouter);
router.use('/api-docs', swaggerDocs());

export default router;
