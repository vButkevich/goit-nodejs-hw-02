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

router.post('/contacts', controllerWrapper(createContactController));
router.put(
  '/contacts/:contactId',
  validateId,
  validateBody(createContactValidationSchema),
  controllerWrapper(upsertContactController),
);
router.delete(
  '/contacts/:contactId',
  validateId,
  controllerWrapper(deleteContactByIdController),
);
router.patch(
  '/contacts/:contactId',
  validateId,
  validateBody(updateContactValidationSchema),
  controllerWrapper(patchContactController),
);
router.get(
  '/contacts/:contactId',
  validateId,
  controllerWrapper(getContactByIdController),
);
router.get('/contacts', controllerWrapper(getContactsController));

export default router;
