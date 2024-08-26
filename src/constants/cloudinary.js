import { env } from '../utils/env.js';

export const CLOUDINARY = {
  CLOUD_NAME: env('CLOUDINARY_CLOUD_NAME'),
  API_SECRET: env('CLOUDINARY_API_SECRET'),
  API_KEY: env('CLOUDINARY_API_KEY'),
};
