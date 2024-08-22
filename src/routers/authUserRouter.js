import { Router } from 'express';
import { controllerWrapper } from '../controllers/controllerWrapper.js';
import {
  loginAuthUserSchema,
  registerAuthUserSchema,
  resetAuthUserPasswordSchema,
  requestAuthUserResetEmailSchema,
} from '../validation/authValidation.js';
import {
  getAuthController,
  getAuthUsersController,
  loginAuthUserController,
  logoutAuthUserController,
  registerAuthUserController,
  refreshAuthUserSessionController,
  sendAuthUserResetPasswordEmailController,
  resetAuthUserPasswordController,
} from '../controllers/authUserController.js';
import { validateBody } from '../middlewares/validateBody.js';

const router = Router();

router.get('/users', controllerWrapper(getAuthUsersController));

router.post(
  '/register',
  validateBody(registerAuthUserSchema),
  controllerWrapper(registerAuthUserController),
);

router.post(
  '/login',
  validateBody(loginAuthUserSchema),
  controllerWrapper(loginAuthUserController),
);

router.post(
  '/logout',
  // validateBody(loginAuthUserSchema),
  controllerWrapper(logoutAuthUserController),
);

router.post('/refresh', controllerWrapper(refreshAuthUserSessionController));

router.post(
  '/request-reset-email',
  validateBody(requestAuthUserResetEmailSchema),
  controllerWrapper(sendAuthUserResetPasswordEmailController),
);

router.post(
  '/reset-password',
  // jsonParser,
  validateBody(resetAuthUserPasswordSchema),
  controllerWrapper(resetAuthUserPasswordController),
);
export default router;
