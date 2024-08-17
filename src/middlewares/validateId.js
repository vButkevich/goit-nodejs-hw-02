// import { HttpError } from 'http-errors';
import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

export const validateId = (req, res, next) => {
  // const params = req.params;
  // const id = params.contactId;
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    throw createHttpError(400, `invalidIdObject:[${id}]: Bad request`);
  }
  next();
};
