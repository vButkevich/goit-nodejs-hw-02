import { Router } from 'express';
import { controllerWrapper } from '../controllers/controllerWrapper.js';
import { loginAuthUserSchema, registerAuthUserSchema } from '../validation/authValidation.js';
import { registerAuthUserController, getAuthUserController, loginAuthUserController, logoutAuthUserController, refreshAuthUserSessionController} from '../controllers/authUserController.js';
import { validateBody } from '../middlewares/validateBody.js';

const router = Router();

router.get('/auth/users',controllerWrapper(getAuthUserController));

router.post(
  '/auth/register',
  validateBody(registerAuthUserSchema),
  controllerWrapper(registerAuthUserController),
);

router.post(
  '/auth/login',
  validateBody(loginAuthUserSchema),
  controllerWrapper(loginAuthUserController),
);

router.post(
  '/auth/logout',
  // validateBody(loginAuthUserSchema),
  controllerWrapper(logoutAuthUserController),
);


router.post('/auth/refresh', controllerWrapper(refreshAuthUserSessionController));


export default router;
