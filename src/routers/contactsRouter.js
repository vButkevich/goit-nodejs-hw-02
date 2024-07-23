import { Router } from 'express';
import {
    createContactController,
    upsertContactController,
    deleteContactByIdController,
    getContactByIdController,
    getContactsController,
    patchContactController,
} from '../controllers/contactsController.js';
import { controllerWrapper } from '../controllers/controllerWrapper.js';

const router = Router();

router.post('/contacts', controllerWrapper(createContactController));
router.put('/contacts/:contactId', controllerWrapper(upsertContactController));
router.delete('/contacts/:contactId', controllerWrapper(deleteContactByIdController));
router.patch('/contacts/:contactId', controllerWrapper(patchContactController));
router.get('/contacts/:contactId', controllerWrapper(getContactByIdController));
router.get('/contacts', controllerWrapper(getContactsController));

export default router;

