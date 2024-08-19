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
  requestAuthUSerResetEmailController,
  resetAuthUserPasswordController,
} from '../controllers/authUserController.js';
import { validateBody } from '../middlewares/validateBody.js';

const router = Router();

router.get('/', controllerWrapper(getAuthController));
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
  controllerWrapper(requestAuthUSerResetEmailController),
);

router.post(
  '/reset-password',
  validateBody(resetAuthUserPasswordSchema),
  controllerWrapper(resetAuthUserPasswordController),
);
export default router;
