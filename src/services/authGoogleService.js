import {
  getFullNameFromGoogleTokenPayload,
  validateCode,
} from '../utils/googleOAuth2.js';

import createHttpError from 'http-errors';
import { getAuthUserByEmail } from './authUserService.js';
import { getRandomPassword } from '../utils/password.js';
import { AuthUserCollection } from '../db/models/authUserModel.js';
import { getAuthUserSession } from './authUserSessionService.js';

export const loginOrSignupWithGoogle = async (code) => {
  const loginTicket = await validateCode(code);
  const payload = loginTicket.getPayload();
  if (!payload) throw createHttpError(401);

  console.log({ code });
  console.log({ loginTicket });
  console.log({ payload });

  // let user = await UsersCollection.findOne({ email: payload.email });
  const { email } = payload;
  let authUser = await getAuthUserByEmail(email);
  if (!authUser) {
    const password = await getRandomPassword();
    // const password = await bcrypt.hash(randomBytes(10), 10);
    authUser = await AuthUserCollection.create({
      email: payload.email,
      name: getFullNameFromGoogleTokenPayload(payload),
      password,
    });
    // const password = await getRandomPassword();
    // user = createAuthUserService({
    //   name: getFullNameFromGoogleTokenPayload(payload),
    //   email: payload.email,
    //   password,
    // });
  }

  //   const newSession = createSession();

  //   return await AuthUserSessionCollection.create({
  //     userId: user._id,
  //     ...newSession,
  //   });
  return await getAuthUserSession(authUser._id);
};
