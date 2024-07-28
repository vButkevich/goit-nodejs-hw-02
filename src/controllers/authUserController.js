import { ONE_DAY } from '../constants/index.js';
import {
  getAuthUserService,
  loginAuthUserService,
  logoutAuthUserService,
  refreshAuthUsersSessionService,
  registerAuthUserService,
} from '../services/authUserService.js';

export const registerAuthUserController = async (req, res) => {
  const user = await registerAuthUserService(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: user,
  });
};

export const getAuthUserController = async (req, res) => {
  const authUsers = await getAuthUserService(req.query);

  // // res.status(204).send();
  // res.json({
  //   status: 200,
  //   message: `Successfully patched a student!`,
  //   // data: result.student,
  // });

  // const status = 200;
  // res.status(status).json({
  //   status,
  //   message: `Successfully authUserController!`,
  //   // data: result.contact,
  // });

  res.send({
    authUsers,
    body: req.body,
    data: req.data,
    params: req.params,
    query: req.query,
    sender: 'authUserController',
  });
};

export const loginAuthUserController = async (req, res) => {
  const session = await loginAuthUserService(req.body);
  //   res.send({ status:res.status,user,body: req.body, data:req.data, params:req.params, query:req.query,sender: 'loginAuthUserController' });
  // };
  // export const loginUserController = async (req, res) => {
  //   const session = await loginUser(req.body);

  // res.cookie('refreshToken', session.refreshToken, {
  //   httpOnly: true,
  //   expires: new Date(Date.now() + ONE_DAY),
  // });
  // res.cookie('sessionId', session._id, {
  //   httpOnly: true,
  //   expires: new Date(Date.now() + ONE_DAY),
  // });
  setupAuthUserSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      accessToken: session.accessToken,
    },
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

const setupAuthUserSession = (res, session) => {
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

export const refreshAuthUserSessionController = async (req, res) => {
  const session = await refreshAuthUsersSessionService({
    sessionId: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });

  setupAuthUserSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: {
      accessToken: session.accessToken,
    },
  });
};
