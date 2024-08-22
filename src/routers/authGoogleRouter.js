// src/routers/auth.js
import { Router } from 'express';

import { getGoogleOAuthUrlController } from '../controllers/authGoogleController.js';
import { controllerWrapper } from '../controllers/controllerWrapper.js';

const router = Router();

router.get('/get-oauth-url', controllerWrapper(getGoogleOAuthUrlController));

export default router;
