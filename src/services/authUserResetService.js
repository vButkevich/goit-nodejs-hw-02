// import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import createHttpError from 'http-errors';

import { getEncryptedPassword } from '../utils/password.js';
import { AuthUserCollection } from '../db/models/authUserModel.js';

import { SMTP, TEMPLATES_DIR } from '../constants/index.js';
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
export const sendResetAuthUserTokenEmailService = async (user) => {
  console.log('sendResetAuthUserTokenEmailService.user:', { user });
  const jwt_secret = env('JWT_SECRET');
  console.log('JWT_SECRET:', jwt_secret);
  const resetToken = jwt.sign(
    {
      sub: user._id,
      email: user.email,
    },
    jwt_secret, //env('JWT_SECRET'),
    {
      expiresIn: '15m',
    },
  );
  console.log({ resetToken });

  const html = await getEmailBodyHtml({ user, resetToken });

  await sendEmail({
    from: env(SMTP.SMTP_FROM),
    to: user.email,
    subject: 'Reset your password',
    html, //: `<p>Click <a href="${resetToken}">here</a> to reset your password!</p>`,
  });
};

const getEmailBodyHtml = async (data) => {
  // console.log({data});
  const { user, resetToken } = data;

  const resetPasswordTemplatePath = path.join(
    TEMPLATES_DIR,
    'reset-password-email.html',
  );
  const templateSource = (
    await fs.readFile(resetPasswordTemplatePath)
  ).toString();

  const template = handlebars.compile(templateSource);

  const html = template({
    name: user.name,
    email: user.email,
    link: `${env('APP_DOMAIN')}/reset-password?token=${resetToken}`,
    token: resetToken,
  });

  await fs.writeFile('C:\\Slavko\\GitHub\\GoIT\\reset-password-email.html',html);

  console.log({ html });
  return html;
};

// ResetPassword
export const resetAuthUserPasswordService = async (payload) => {
  const jwt_secret = env('JWT_SECRET');
  const token = payload.token;

  console.log({payload});
  console.log({jwt_secret});
  console.log({token});

  let entries;
  try {
    entries = jwt.verify(token, jwt_secret);
  } catch (err) {
    if (err instanceof Error) throw createHttpError(401, err.message);
    throw err;
  }

  const authUser = await AuthUserCollection.findOne({
    email: entries.email,
    _id: entries.sub,
  });
  if (!authUser) {
    throw createHttpError(404, 'User not found');
  }

  //const encryptedPassword = await bcrypt.hash(payload.password, 10);
  const encryptedPassword = await getEncryptedPassword(payload.password);
  await AuthUserCollection.updateOne(
    { _id: authUser._id },
    { password: encryptedPassword },
  );
};
