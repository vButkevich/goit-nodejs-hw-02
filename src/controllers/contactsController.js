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
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { env } from '../utils/env.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

export const getContactsController = async (req, res) => {
  // const userId = req.authUser._id;
  let userId = -1;
  try {
    userId = req.authUser._id;
  } catch (err) {
    console.log(err);
  }

  // const req_query = req.query;
  // console.log({ req_query });
  // console.log('getContactsController:',{ req });
  // console.log('getContactsController.get:', req );
  // console.log({ req });
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
  const contactData = { ...req.body, userId: req.authUser._id };
  const contact = await createContactService(contactData);
  const req_body = req.body;
  console.log({ req_body });
  console.log({ contactData });

  res.status(201).json({
    status: 201,
    message: `Successfully created a contact!`,
    data: contact,
  });
};

export const upsertContactController = async (req, res, next) => {
  console.log('upsertContactController:');
  const { userId } = req.authUser._id;
  const req_params = req.params;
  console.log({ req_params });
  const { id } = req.params;
  console.log({ id });
  // const contactData = { ...req.body, userId };
  const contactData = { ...req.body, userId: req.authUser._id };

  const result = await updateContactService(userId, id, contactData, {
    upsert: true,
  });
  console.log({ result });

  if (!result) {
    throw createHttpError(404, 'Contact not found');
    // next(createHttpError(404, 'Contact not found'));
    // return;
  }

  const status = result.isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: `Successfully upserted a contact!`,
    data: result.contact,
  });
};

export const deleteContactByIdController = async (req, res, next) => {
  const userId = req.authUser._id;
  const req_params = req.params;
  console.log({ req_params });
  const { id } = req.params;

  const contact = await deleteContactByIdService(userId, id);

  if (!contact) {
    throw createHttpError(404, `Contact by id:[${id}] not exists`);
    // next(createHttpError(404, `Contact by id:[${id}] not exists`));
    // return;
  }

  res.status(204).send();
};

export const getContactByIdController = async (req, res, next) => {
  const { id } = req.params;
  const userId = req.authUser._id;
  const contact = await getContactByIdService(userId, id);
  console.log('contact.length', contact.length);
  console.log({ contact });

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
  const authUser = req.authUser;
  const userId = req.authUser._id;
  const { id } = req.params;
  const body = req.body;

  console.log({ id });
  console.log({ body });
  console.log({ authUser });


  let photoUrl;
  const photo = req.photo;
  console.log({photo});
  // if (photo) {
  //   photoUrl = await saveFileToUploadDir(photo);
  // }
  if (photo) {
    if (env('CLOUDINARY_ENABLE') === 'true'){//} || env('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    }
    if (env('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }
  console.log({photoUrl});
  const result = await updateContactService(userId, id, {
    ...body,
    photo: photoUrl,
  });

  if (!result) {
    throw createHttpError(404, 'Contact not found');
    // next(createHttpError(404, 'Contact not found'));
    // return;
  }

  res.json({
    status: 200,
    message: `Successfully patched a contact!`,
    data: result.contact,
  });
};
