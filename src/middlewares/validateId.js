import { HttpError } from 'http-errors';
import { isValidObjectId } from 'mongoose';

export const validateId = (req, res, next) => {
  const params = req.params;
  const id = params.contactId;
  // const { id } = req.params;
  if (!isValidObjectId(id)) {
    throw HttpError(400, 'invalidIdObject: Bad request');
  }
  next();
};
