// src/services/auth.js

import {
  getFullNameFromGoogleTokenPayload,
  validateCode,
} from '../utils/googleOAuth2.js';

import createHttpError from 'http-errors';
import { getAuthUserByEmail } from './authUserService.js';
import { getRandomPassword } from '../utils/password.js';

export const loginOrSignupWithGoogle = async (code) => {
  const loginTicket = await validateCode(code);
  const payload = loginTicket.getPayload();
  if (!payload) throw createHttpError(401);

  // let user = await UsersCollection.findOne({ email: payload.email });
  let user = await getAuthUserByEmail({ email: payload.email });
  if (!user) {
    // const password = await bcrypt.hash(randomBytes(10), 10);
    const password = await getRandomPassword();
    user = await UsersCollection.create({
      email: payload.email,
      name: getFullNameFromGoogleTokenPayload(payload),
      password,
      role: 'parent',
    });
  }

  const newSession = createSession();

  return await SessionsCollection.create({
    userId: user._id,
    ...newSession,
  });
};
