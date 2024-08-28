import createHttpError from 'http-errors';
import {
  createContactService,
  updateContactService,
  deleteContactByIdService,
  getContactByIdService,
  getContactsService,
} from '../services/contactsService.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
// import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
// import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
// import { env } from '../utils/env.js';

export const getContactsController = async (req, res) => {
  let userId = -1;
  try {
    userId = req.authUser._id;
  } catch (err) {
    console.log(err);
  }

  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);
  const contacts = await getContactsService({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
    userId,
  });

  if (contacts.length === 0) {
    throw createHttpError(404, 'Contacts not found');
  }

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    // count: contacts.length,
    data: contacts,
  });
};

export const createContactController = async (req, res) => {
  const contact = await createContactService(req.contactData);
  res.status(201).json({
    status: 201,
    message: `Successfully created a contact!`,
    data: contact,
  });
};

export const upsertContactController = async (req, res, next) => {
  console.log('upsertContactController:');

  const result = await updateContactService(req.contactData, {
    upsert: true,
  });
  console.log({ result });

  if (!result) {
    throw createHttpError(404, 'Contact not found');
  }

  const status = result.isNew ? 201 : 200;
  res.status(status).json({
    status,
    message: `Successfully upserted a contact!`,
    data: result.contact,
  });
};

export const deleteContactByIdController = async (req, res, next) => {
  const { id } = req.params;
  const userId = req.authUser._id;
  const contact = await deleteContactByIdService(userId, id);

  if (!contact) {
    throw createHttpError(404, `Contact by id:[${id}] not exists`);
  }

  res.status(204).send();
};

export const getContactByIdController = async (req, res, next) => {
  const { id } = req.params;
  const userId = req.authUser._id;
  const contact = await getContactByIdService(userId, id);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }
  if (contact.length === 0) {
    throw createHttpError(404, 'Contact not found');
  }

  res.json({
    status: 200,
    res_status: res.status,
    message: `Successfully found contact by id:[${id}]`,
    data: contact,
  });
};

export const patchContactController = async (req, res, next) => {
  const { id } = req.params;
  const userId = req.authUser._id;
  const result = await updateContactService(userId, id, {
    ...req.contactData,
  });

  if (!result) {
    throw createHttpError(404, 'Contact not found');
  }

  res.json({
    status: 200,
    message: `Successfully patched a contact!`,
    data: result.contact,
  });
};
