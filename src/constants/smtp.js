import { env } from '../utils/env.js';

export const SMTP = {
  FROM: env('SMTP_FROM'),
  HOST: env('SMTP_HOST'),
  PORT: env('SMTP_PORT'),
  USER: env('SMTP_USER'),
  PASSWORD: env('SMTP_PASSWORD'),
};
