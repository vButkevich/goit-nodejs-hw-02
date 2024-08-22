import { randomBytes } from 'crypto';
import { AuthUserSessionCollection } from '../db/models/authUserSessionModel.js';
import { FIFTEEN_MINUTES, ONE_DAY } from '../constants/index.js';

export const getAuthUserSessionById = (id) =>
  AuthUserSessionCollection.findById(id);

export const isRefreshTockenExpired = (session) => {
  return new Date() > new Date(session.refreshTokenValidUntil);
};

export const refreshAuthUsersSessionService = async (session) => {
  // await AuthUserSessionCollection.deleteOne({_id:session._id });
  await AuthUserSessionCollection.findByIdAndDelete(session._id);
  const authUserSession = getAuthUserSession(session.userId);
  return authUserSession;
};

export const getAuthUserSessionObject = () => {
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
  };
};

export const getAuthUserSession = async (userId) => {
  const sessionObject = getAuthUserSessionObject();
  const authUserSession = await AuthUserSessionCollection.create({
    userId,
    ...sessionObject,
  });
  return authUserSession;
};

export const getAuthUserSessionService = async (authUser) => {
  await AuthUserSessionCollection.deleteOne({ userId: authUser._id });

  const session = await getAuthUserSession(authUser._id);
  return session;
};

export const getAuthUserSessionByAccessToken = (accessToken) =>
  AuthUserSessionCollection.findOne({ accessToken });

export const setupAuthUserSessionCookies = (res, session) => {
  const expires = new Date(Date.now() + ONE_DAY);
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires,
  });
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires,
  });
};
