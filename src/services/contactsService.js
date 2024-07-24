import { ContactsCollection } from '../db/models/contactsModel.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

export const getContactsService = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = ContactsCollection.find();
  // const contactsTotal = await ContactsCollection.find()
  //   .merge(contactsQuery)
  //   .countDocuments();
  // console.log({ contactsTotal });

  if (filter.name) {
    contactsQuery.where('name').regex(new RegExp(filter.name, 'i'));
  }
  if (filter.email) {
    contactsQuery.where('email').regex(new RegExp(filter.email, 'i'));
  }
  if (filter.phone) {
    contactsQuery.where('phoneNumber').regex(new RegExp(filter.phone, 'i'));
  }
  if (filter.type) {
    contactsQuery.where('contactType').equals(filter.type);
  }
  if (filter.favorite) {
    contactsQuery.where('isFavourite').equals(filter.favorite);
  }

    const [contactsCount, contacts] = await Promise.all([
    ContactsCollection.find().merge(contactsQuery).countDocuments(),
    contactsQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);
  const paginationData = calculatePaginationData(contactsCount, perPage, page);
  // const paginationData = calculatePaginationData(contactsTotal, perPage, page);

  return {
    // filter,
    // count: contactsCount,//contacts.length,
    contacts: contacts,
    // sort: { sortBy, sortOrder },
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
