// src/utils/parseFilterParams.js

const parseType = (type) => {
  const isString = typeof type === 'string';
  if (!isString) return;
  const isType = (gender) => ['work', 'home', 'personal'].includes(type);

  if (isType(type)) return type;
};

// const parseNumber = (number) => {
//   const isString = typeof number === 'string';
//   if (!isString) return;

//   const parsedNumber = parseInt(number);
//   if (Number.isNaN(parsedNumber)) {
//     return;
//   }

//   return parsedNumber;
// };

export const parseFilterParams = (query) => {
  const { name,email,phone,type,isFavourite } = query;
console.log({query});

  const parsedName = name;
  const parsedEmail = email;
  const parsedPhone = phone;
  const parsedType = parseType(type);
  const parsedFavorite = isFavourite;


  return {
    name: parsedName,
    email: parsedEmail,
    phone: parsedPhone,
    type: parsedType,
    favorite: parsedFavorite,

  };
};
