import { Router } from 'express';
import { controllerWrapper } from '../controllers/controllerWrapper.js';
import {
  loginAuthUserSchema,
  registerAuthUserSchema,
} from '../validation/authValidation.js';
import {
  registerAuthUserController,
  getAuthUsersController,
  loginAuthUserController,
  logoutAuthUserController,
  refreshAuthUserSessionController,
  getAuthController,
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

export default router;
