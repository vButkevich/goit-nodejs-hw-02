import {
  getFullNameFromGoogleTokenPayload,
  validateCode,
} from '../utils/googleOAuth2.js';
import { getRandomPassword } from '../utils/password.js';
import { getAuthUserSessionService } from './authUserSessionService.js';
import createHttpError from 'http-errors';
import {
  createAuthUserService,
  getAuthUserByEmail,
} from './authUserService.js';

export const loginOrSignupWithGoogle = async (code) => {
  const loginTicket = await validateCode(code);
  const payload = loginTicket.getPayload();
  if (!payload) throw createHttpError(401);

  console.log({ code });
  console.log({ loginTicket });
  console.log({ payload });

  const { email } = payload;
  let authUser = await getAuthUserByEmail(email);
  if (!authUser) {
    const password = await getRandomPassword();
    console.log({ password });

    authUser = createAuthUserService({
      name: getFullNameFromGoogleTokenPayload(payload),
      email: payload.email,
      password,
    });
  }
  const session = await getAuthUserSessionService(authUser);
  console.log({ authUser });
  console.log({ session });

  return session;
};
