import { ContactsCollection } from '../db/models/contactsModel.js';

export const getContactsService = async () => {
  const contacts = await ContactsCollection.find();
  return contacts;
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
