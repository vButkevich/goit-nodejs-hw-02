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
import { upload } from '../middlewares/multer.js';

const router = Router();

router.post(
  '/',
  upload.single('photo'),
  validateBody(createContactValidationSchema),
  controllerWrapper(createContactController),
);
router.put(
  '/:id',
  validateId,
  upload.single('photo'),
  validateBody(createContactValidationSchema),
  controllerWrapper(upsertContactController),
);
router.put(
  '/',
  upload.single('photo'),
  validateBody(createContactValidationSchema),
  controllerWrapper(createContactController),
);
router.delete(
  '/:id',
  validateId,
  // upload.single('photo'),
  controllerWrapper(deleteContactByIdController),
);
router.patch(
  '/:id',
  validateId,
  upload.single('photo'),
  validateBody(updateContactValidationSchema),
  controllerWrapper(patchContactController),
);
router.get(
  '/:id',
  validateId,
  // upload.single('photo'),
  controllerWrapper(getContactByIdController),
);
router.get('/', controllerWrapper(getContactsController));
router.get('/all', controllerWrapper(getContactsController));

export default router;
