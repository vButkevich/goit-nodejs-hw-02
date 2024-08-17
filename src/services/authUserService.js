import bcrypt from 'bcrypt';
import { AuthUserCollection } from '../db/models/authUserModel.js';
import { AuthUserSessionCollection } from '../db/models/authUserSessionModel.js';

export const getAuthUsersService = async (payload) => {
  const authUsers = AuthUserCollection.find();
  //   const user = await AuthUserCollection.findOne({ email: payload.email });
  //   // return user;
  //   if (user) throw createHttpError(409, 'Email has already in use');
  return authUsers;
};

export const getAuthUserById = (id) => AuthUserCollection.findById(id);

export const getAuthUserByEmail = (email) =>
  AuthUserCollection.findOne({ email });

export const createAuthUserService = async (userData) => {
  const encryptedPassword = await bcrypt.hash(userData.password, 10);
  return await AuthUserCollection.create({
    ...userData,
    password: encryptedPassword,
  });
};

export const logoutAuthUserService = async (sessionId) => {
  await AuthUserSessionCollection.deleteOne({ _id: sessionId });
};
