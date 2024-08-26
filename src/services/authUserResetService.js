// import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import createHttpError from 'http-errors';

import { getEncryptedPassword, getRandomPassword } from '../utils/password.js';
import { AuthUserCollection } from '../db/models/authUserModel.js';

import { TEMP_DIR, TEMPLATES_DIR } from '../constants/index.js';
import { SMTP } from '../constants/smtp.js';

import { sendEmail } from '../utils/sendMail.js';
import { env } from '../utils/env.js';

import handlebars from 'handlebars';
import fs from 'node:fs/promises';
import path from 'node:path';

// export const requestResetToken = async (email) => {
//     const user = await AuthUserCollection.findOne({ email });
//     if (!user) {
//       throw createHttpError(404, 'User not found');
//     }

//    //доповнимо її трохи пізніше
//   };

// export const requestAuthUserResetTokenService = async (user) => {
// //   const user = await AuthUserCollection.findOne({ email });
// //   if (!user) {
// //     throw createHttpError(404, 'User not found');
// //   }
export const sendAuthUserResetPasswordEmailService = async (user) => {
  // console.log('sendResetAuthUserTokenEmailService.user:', { user });
  // const jwt_secret = env('JWT_SECRET');
  // console.log('JWT_SECRET:', jwt_secret);
  const resetToken = jwt.sign(
    {
      sub: user._id,
      email: user.email,
    },
    // jwt_secret, //
    env('JWT_SECRET'),
    {
      expiresIn: '15m',
    },
  );
  // console.log({ resetToken });

  const html = await getRequestResetEmailBodyHtml({ user, resetToken });

  await sendEmail({
    from: SMTP.FROM,
    to: user.email, //'buBoot.online@ukr.net,buBoot.online@gmail.com', //
    subject: 'Reset your password',
    html,
  });
};

const getRequestResetEmailBodyHtml = async (data) => {
  const { user, resetToken } = data;

  const resetPasswordTemplateFile = path.join(
    TEMPLATES_DIR,
    'reset-password-email.html',
  );

  const templateSourceFile = (
    await fs.readFile(resetPasswordTemplateFile, { encoding: 'utf-8' })
  ).toString();

  const template = handlebars.compile(templateSourceFile);
  const link = `${env('APP_DOMAIN')}/auth/reset-password`;
  const html = template({
    name: user.name,
    email: user.email,
    token: resetToken,
    link,
  });

  const tempFile = path.join(TEMP_DIR, 'reset-password-email.html');
  await fs.writeFile(tempFile, html);

  console.log('ENVIRONEMNT:');
  // if (env('ENVIRONMENT', '') === 'DEV') {
  console.log({ tempFile });
  console.log({ html });
  // }
  return html;
};

// ResetPassword
// export const resetAuthUserPasswordService = async (payload) => {
export const resetAuthUserPasswordService = async (token, password) => {
  const jwt_secret = env('JWT_SECRET');
  // const token = payload.token;

  // console.log({ payload });
  console.log({ jwt_secret });
  console.log({ token });

  let entries;
  try {
    entries = jwt.verify(token, jwt_secret);
  } catch (err) {
    if (err instanceof Error) throw createHttpError(401, err.message);
    throw err;
  }

  const authUser = await AuthUserCollection.findOne({
    _id: entries.sub,
    email: entries.email,
  });
  if (!authUser) {
    throw createHttpError(404, 'User not found');
  }

  //const encryptedPassword = await bcrypt.hash(payload.password, 10);
  const encryptedPassword = await getEncryptedPassword(password);
  await AuthUserCollection.updateOne(
    { _id: authUser._id },
    { password: encryptedPassword },
  );
};
