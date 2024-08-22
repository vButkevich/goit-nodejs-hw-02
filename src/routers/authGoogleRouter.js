// src/routers/auth.js
import { Router } from 'express';

import {
  getGoogleOAuthUrlController,
  loginWithGoogleController,
} from '../controllers/authGoogleController.js';
import { controllerWrapper } from '../controllers/controllerWrapper.js';
// import { loginUserSchema } from '../validation/auth.js';
// import { loginUserController } from '../controllers/auth.js';
import { loginWithGoogleOAuthSchema } from '../validation/authValidation.js';
import { validateBody } from '../middlewares/validateBody.js';

/* Інший код файлу */

const router = Router();

router.get('/', (req, res) => {
  res.json({
    message: 'goit-nodejs-hw-07:google auth',
    methods: {
      get: '/auth/google/get-oauth-url',
      post: '/auth/google/confirm-oauth',
    },
  });
});

router.get('/get-oauth-url', controllerWrapper(getGoogleOAuthUrlController));

router.post(
  '/confirm-oauth',
  validateBody(loginWithGoogleOAuthSchema),
  controllerWrapper(loginWithGoogleController),
);

export default router;
