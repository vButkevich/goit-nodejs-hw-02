// src/utils/sendMail.js
import { SMTP } from '../constants/smtp.js';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: SMTP.HOST,
  // port: Number(env(SMTP.SMTP_PORT)),
  port: SMTP.PORT,
  // secure:false,
  auth: {
    user: SMTP.USER,
    pass: SMTP.PASSWORD,
  },
});

export const sendEmail = async (options) => {
  return await transporter.sendMail(options);
};
