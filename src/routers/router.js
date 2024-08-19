// src/routers/index.js

import { Router } from 'express';
import authUserRouter from './authUserRouter.js';
import contactsRouter from './contactsRouter.js';
import { auth } from '../middlewares/auth.js';

const router = Router();


// router.use('/', (req, res) => {
//   res.json({
//     message: 'goit-nodejs-hw-07:1.google | 2.swagger',
//   });
// });
router.use('/auth', authUserRouter);
router.use('/contacts/all', contactsRouter);
router.use('/contacts', auth, contactsRouter);

export default router;
