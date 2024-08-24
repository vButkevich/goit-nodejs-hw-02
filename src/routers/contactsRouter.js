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
import { defineContactDataObject } from '../middlewares/contact.js';
import { validateBody } from '../middlewares/validateBody.js';
import { validateId } from '../middlewares/validateId.js';
import {
  createContactValidationSchema,
  updateContactValidationSchema,
} from '../validation/contactValidation.js';
import { upload } from '../middlewares/multer.js';

const router = Router();

router.post(
  '/',
  upload.single('photo'),
  validateBody(createContactValidationSchema),
  defineContactDataObject,
  controllerWrapper(createContactController),
);

router.put(
  '/:id',
  validateId,
  upload.single('photo'),
  validateBody(createContactValidationSchema),
  defineContactDataObject,
  controllerWrapper(upsertContactController),
);

router.put(
  '/',
  upload.single('photo'),
  validateBody(createContactValidationSchema),
  defineContactDataObject,
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
  upload.single('photo'),
  validateBody(updateContactValidationSchema),
  defineContactDataObject,
  controllerWrapper(patchContactController),
);

router.get('/:id', validateId, controllerWrapper(getContactByIdController));
router.get('/all', controllerWrapper(getContactsController));
router.get('/', controllerWrapper(getContactsController));

export default router;
