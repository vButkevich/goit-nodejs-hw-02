import { AuthUserCollection } from '../db/models/authUserModel.js';
import { AuthUserSessionCollection } from '../db/models/authUserSessionModel.js';
import { getEncryptedPassword } from '../utils/password.js';

export const getAuthUsersService = async () => {
  const authUsers = AuthUserCollection.find();
  return authUsers;
};

export const getAuthUserById = (id) => AuthUserCollection.findById(id);

export const getAuthUserByEmail = (email) =>
  AuthUserCollection.findOne({ email });

export const createAuthUserService = async (userData) => {
  // const encryptedPassword = await bcrypt.hash(userData.password, 10);
  const encryptedPassword = await getEncryptedPassword(userData.password);

  return await AuthUserCollection.create({
    ...userData,
    password: encryptedPassword,
  });
};

export const logoutAuthUserService = async (sessionId) => {
  await AuthUserSessionCollection.deleteOne({ _id: sessionId });
};
