import { Router } from 'express';
import {
  getContactsController,
  getContactByIdController,
  deleteContactByIdController,
  createContactController,
  upsertContactController,
  patchContactController,
} from '../controllers/contactsController.js';
import { controllerWrapper } from '../controllers/controllerWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { validateId } from '../middlewares/validateId.js';
import {
  createContactValidationSchema,
  updateContactValidationSchema,
} from '../validation/contactValidation.js';

const router = Router();

router.post(
  '/',
  validateBody(createContactValidationSchema),
  controllerWrapper(createContactController),
);
router.put(
  '/:id',
  validateId,
  validateBody(createContactValidationSchema),
  controllerWrapper(upsertContactController),
);
router.put(
  '/',
  validateBody(createContactValidationSchema),
  controllerWrapper(createContactController),
);
router.delete(
  '/:id',
  validateId,
  controllerWrapper(deleteContactByIdController),
);
router.patch(
  '/:id',
  validateId,
  validateBody(updateContactValidationSchema),
  controllerWrapper(patchContactController),
);
router.get('/:id', validateId, controllerWrapper(getContactByIdController));
router.get('/', controllerWrapper(getContactsController));

export default router;
