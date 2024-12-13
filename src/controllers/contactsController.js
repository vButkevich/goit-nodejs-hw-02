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

export const getContactsController = async (req, res) => {
  const req_query = req.query;
  console.log({ req_query });
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);
  // const contacts = await getContactsService();
  const contacts = await getContactsService({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    // count: contacts.length,
    data: contacts,
  });
};

export const createContactController = async (req, res) => {
  const contact = await createContactService(req.body);
  const req_body = req.body;
  console.log({ req_body });

  const status = 201;
  res.status(status).json({
    status,
    message: `Successfully created a contact!`,
    data: contact,
  });
};

export const upsertContactController = async (req, res, next) => {
  const req_params = req.params;
  console.log({ req_params });

  const { contactId } = req.params;
  const result = await updateContactService(contactId, req.body, {
    upsert: true,
  });
  console.log({ result });

  if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  const status = result.isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: `Successfully upserted a contact!`,
    data: result.contact,
  });
};

export const deleteContactByIdController = async (req, res, next) => {
  const req_params = req.params;
  console.log({ req_params });
  const { contactId } = req.params;

  const contact = await deleteContactByIdService(contactId);

  if (!contact) {
    next(createHttpError(404, `Contact by id:[${contactId}] not exists`));
    return;
  }

  res.status(204).send();
};

export const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactByIdService(contactId);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.json({
    status: 200,
    res_status: res.status,
    message: `Successfully found contact by id:[${contactId}]`,
    data: contact,
  });
};

export const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const body = req.body;

  console.log({ contactId });
  console.log({ body });
  const result = await updateContactService(contactId, body);

  if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully patched a contact!`,
    data: result.contact,
  });
};
