import { Router } from 'express';
import { controllerWrapper } from '../controllers/controllerWrapper.js';
import {
  resetAuthUserPasswordSchema,
  requestAuthUserResetEmailSchema,
} from '../validation/authValidation.js';
import {
  sendAuthUserResetPasswordEmailController,
  resetAuthUserPasswordController,
} from '../controllers/authUserResetController.js';
import { validateBody } from '../middlewares/validateBody.js';

const router = Router();

router.post(
  '/request-reset-email',
  validateBody(requestAuthUserResetEmailSchema),
  controllerWrapper(sendAuthUserResetPasswordEmailController),
);

router.post(
  '/reset-password',
  validateBody(resetAuthUserPasswordSchema),
  controllerWrapper(resetAuthUserPasswordController),
);
export default router;
