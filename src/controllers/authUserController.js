import createHttpError from 'http-errors';

import {
  getAuthUserByEmail,
  getAuthUsersService,
  createAuthUserService,
  logoutAuthUserService,
} from '../services/authUserService.js';
import {
  getAuthUserSessionById,
  getAuthUserSessionService,
  getAuthUsersSessionsService,
  refreshAuthUsersSessionService,
  setupAuthUserSessionCookies,
  isRefreshTockenExpired,
} from '../services/authUserSessionService.js';

// import {
//   resetAuthUserPasswordService,
//   sendAuthUserResetPasswordEmailService,
// } from '../services/authUserResetService.js';
import { comparePasswords } from '../utils/password.js';

export const getAuthController = async (req, res) => {
  res.send({
    sender: 'authUserController',
    methods: {
      login: '/auth/login',
      logout: '/auth/logout',
      refresh: '/auth\refresh',
      register: '/auth\register',
      request: '/auth/request-reset-email',
      reset: '/auth/reset-password',
    },
    datetimestamp: new Date(),
  });
};

export const getAuthUsersController = async (req, res) => {
  const authUsers = await getAuthUsersService(req.query);
  res.send({
    datetimestamp: new Date(),
    count: authUsers.length,
    data: authUsers,
  });
};
export const getAuthUsersSessionsController = async (req, res) => {
  const authUsersSessions = await getAuthUsersSessionsService();
  res.send({
    datetimestamp: new Date(),
    count: authUsersSessions.length,
    data: authUsersSessions,
  });
};

export const registerAuthUserController = async (req, res) => {
  const { email, name } = req.body;
  const authUser = await getAuthUserByEmail(email);
  if (authUser) {
    throw createHttpError(409, 'Email in use');
  }

  await createAuthUserService(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: { name, email },
  });
};

export const loginAuthUserController = async (req, res) => {
  const { email, password } = req.body;
  const authUser = await getAuthUserByEmail(email);
  if (!authUser) {
    throw createHttpError(401, 'Unauthorized');
  }

  const isPasswordCorrect = await comparePasswords(password, authUser.password);
  if (!isPasswordCorrect) {
    throw createHttpError(401, 'Unauthorized');
  }

  const session = await getAuthUserSessionService(authUser._id);
  setupAuthUserSessionCookies(res, session);

  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: { accessToken: session.accessToken },
  });
};

export const logoutAuthUserController = async (req, res) => {
  if (req.cookies.sessionId) {
    await logoutAuthUserService(req.cookies.sessionId);
  }

  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.status(204).send();
};

export const refreshAuthUserSessionController = async (req, res) => {
  const { sessionId } = req.cookies;

  const session = await getAuthUserSessionById(sessionId);
  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  const isSessionTokenExpired = await isRefreshTockenExpired(session);
  if (isSessionTokenExpired) {
    throw createHttpError(401, 'Session token expired');
  }

  const authUserSession = await refreshAuthUsersSessionService(session);
  setupAuthUserSessionCookies(res, authUserSession);

  res.json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: {
      accessToken: authUserSession.accessToken,
    },
  });
};

// export const sendAuthUserResetPasswordEmailController = async (req, res) => {
//   const { email } = req.body;
//   const authUser = await getAuthUserByEmail(email);
//   if (!authUser) {
//     throw createHttpError(404, 'User not found');
//   }

//   res.json({
//     message: 'Reset password email was successfully sent!',
//     status: 200,
//     data: {},
//   });
// };

// export const resetAuthUserPasswordController = async (req, res) => {
//   const { token, password } = req.body;
//   await resetAuthUserPasswordService(token, password);

//   res.json({
//     message: 'Password was successfully reset!',
//     status: 200,
//     data: {},
//   });
// };
