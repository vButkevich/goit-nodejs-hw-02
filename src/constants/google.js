import { env } from '../utils/env.js';

export const GOOGLE = {
  AUTH_CLIENT_ID: env('GOOGLE_AUTH_CLIENT_ID'),
  AUTH_CLIENT_SECRET: env('GOOGLE_AUTH_CLIENT_SECRET'),
};
