import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import createHttpError from 'http-errors';
import { AuthUserCollection } from '../db/models/authUserModel.js';
import { AuthUserSessionCollection } from '../db/models/authUserSessionModel.js';
import { FIFTEEN_MINUTES, ONE_DAY } from '../constants/index.js';

export const getAuthUserService = async (payload) => {
  const authUsers = AuthUserCollection.find();
//   const user = await AuthUserCollection.findOne({ email: payload.email });
//   // return user;
//   if (user) throw createHttpError(409, 'Email has already in use');
  return authUsers;
};

export const registerAuthUserService = async (payload) => {
  const user = await AuthUserCollection.findOne({ email: payload.email });
  if (user) throw createHttpError(409, 'Email in use');

  console.log('registerUserService:', { payload });
  // return await UsersCollection.create(payload);
  const encryptedPassword = await bcrypt.hash(payload.password, 10);
  // const p = { ...payload };
  // console.log({ p });
  return await AuthUserCollection.create({
    ...payload,
    password: encryptedPassword,
  });
};

// src/services/auth.js
// export const registerUser = async (payload) => {
//   const encryptedPassword = await bcrypt.hash(payload.password, 10);
//   return await UsersCollection.create({
//     ...payload,
//     password: encryptedPassword,
//   });
// };

export const loginAuthUserService = async (payload) => {
  const user = await AuthUserCollection.findOne({ email: payload.email });
  if (!user) {
    throw createHttpError(404, 'User not found');
  }
  const isEqual = await bcrypt.compare(payload.password, user.password); // Порівнюємо хеші паролів

  if (!isEqual) {
    throw createHttpError(401, 'Unauthorized');
  }
  //   // далі ми доповнемо цей сервіс
  // };
  // // src/services/auth.js
  // /* Інший код файлу */
  // export const loginUser = async (payload) => {
  //   const user = await UsersCollection.findOne({ email: payload.email });
  //   if (!user) {
  //     throw createHttpError(404, 'User not found');
  //   }
  //   const isEqual = await bcrypt.compare(payload.password, user.password);
  //   if (!isEqual) {
  //     throw createHttpError(401, 'Unauthorized');
  //   }

  await AuthUserSessionCollection.deleteOne({ userId: user._id });

  // const accessToken = randomBytes(30).toString('base64');
  // const refreshToken = randomBytes(30).toString('base64');
  const accessToken = getAccessToken();
  return await AuthUserSessionCollection.create({
    userId: user._id,
    ...accessToken,
    // accessToken,
    // refreshToken,
    // accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    // refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
  });
};

export const logoutAuthUserService = async (sessionId) => {
  await AuthUserSessionCollection.deleteOne({ _id: sessionId });
};

const getAccessToken = () => {
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
  };
};

// src/services/auth.js

/* Інший код файлу */

const createAuthUserSessionService = () => {
  // const accessToken = randomBytes(30).toString('base64');
  // const refreshToken = randomBytes(30).toString('base64');

  // return {
  //   accessToken,
  //   refreshToken,
  //   accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
  //   refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
  // };
  const accessToken = getAccessToken();
  return accessToken;
};

export const refreshAuthUsersSessionService = async ({
  sessionId,
  refreshToken,
}) => {
  const session = await AuthUserSessionCollection.findOne({
    _id: sessionId,
    refreshToken,
  });

  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  const isSessionTokenExpired =
    new Date() > new Date(session.refreshTokenValidUntil);

  if (isSessionTokenExpired) {
    throw createHttpError(401, 'Session token expired');
  }

  const newSession = createAuthUserSessionService();

  await AuthUserSessionCollection.deleteOne({ _id: sessionId, refreshToken });

  return await AuthUserSessionCollection.create({
    userId: session.userId,
    ...newSession,
  });
};
