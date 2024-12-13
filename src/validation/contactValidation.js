import Joi from 'joi';

const contactValidationObject = {
  name: Joi.string().min(3).max(32).required().messages({
    'string.base': 'name should be a string',
    'string.min': 'name should have at least {#limit} characters',
    'string.max': 'name should have at most {#limit} characters',
    'any.required': 'name is required',
  }),
  phoneNumber:Joi.string().min(10).max(16),
  email: Joi.string().email().required(),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid('work', 'home', 'personal').required(),
};
export const createContactValidationSchema = Joi.object(contactValidationObject);

export const updateContactValidationSchema = Joi.object(
  {
    name: Joi.string().min(3).max(32),
    phoneNumber:Joi.string().min(10).max(16),
    email: Joi.string().email(),
    isFavourite: Joi.boolean(),
    contactType: Joi.string().valid('work', 'home', 'personal'),
  });

  /*
const contactsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      // match: '/.+\\@.+\\..+/',
      required: false,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      required: true,
      enum: ['work', 'home', 'personal'],
      default: 'personal',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);
*/
