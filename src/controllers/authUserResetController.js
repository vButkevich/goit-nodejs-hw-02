import createHttpError from 'http-errors';

import { getAuthUserByEmail } from '../services/authUserService.js';

import {
  resetAuthUserPasswordService,
  sendAuthUserResetPasswordEmailService,
} from '../services/authUserResetService.js';

export const sendAuthUserResetPasswordEmailController = async (req, res) => {
  const { email } = req.body;
  const authUser = await getAuthUserByEmail(email);
  if (!authUser) {
    throw createHttpError(404, 'User not found');
  }

  await sendAuthUserResetPasswordEmailService(authUser);

  res.json({
    message: 'Reset password email was successfully sent!',
    status: 200,
    data: {},
  });
};

export const resetAuthUserPasswordController = async (req, res) => {
  // await resetAuthUserPasswordService(req.body);
  const { token, password } = req.body;
  await resetAuthUserPasswordService(token, password);

  res.json({
    message: 'Password was successfully reset!',
    status: 200,
    data: {},
  });
};
