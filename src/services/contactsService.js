import { ContactsCollection } from '../db/models/contactsModel.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getContactsService = async (page = 1, perPage = 10) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = await ContactsCollection.find();
  const contactsCount = await ContactsCollection.find()
    .merge(contactsQuery)
    .countDocuments();

  const contacts = await contactsQuery.skip(skip).limit(limit).exec();

  /*
  const [contactCount, contacts] = await Promise.all([
    ContactsCollection.find().merge(contactsQuery).countDocuments(),
    contactsQuery
      .skip(skip)
      .limit(limit)
      .exec(),
  ]);
  */
  const paginationData = calculatePaginationData(contactsCount, perPage, page);
  return {
    contacts: contacts,
    ...paginationData,
  };
};

export const getContactByIdService = async (studentId) => {
  const contact = await ContactsCollection.findById(studentId);
  return contact;
};

export const createContactService = async (payload) => {
  console.log({ payload });
  const contact = await ContactsCollection.create(payload);
  return contact;
};

export const deleteContactByIdService = async (contactId) => {
  const contact = await ContactsCollection.findOneAndDelete({
    _id: contactId,
  });

  return contact;
};

export const updateContactService = async (
  contactId,
  payload,
  options = {},
) => {
  console.log('updatecontactService');
  console.log({ contactId });
  console.log({ payload });
  console.log({ options });

  const rawResult = await ContactsCollection.findOneAndUpdate(
    { _id: contactId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    contact: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};
