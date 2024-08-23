import { env } from '../utils/env.js';

export const CLOUDINARY = {
  ENABLE: env('CLOUDINARY-ENABLE', 'false'),
  CLOUD_NAME: env('CLOUDINARY-CLOUD_NAME'),
  API_SECRET: env('CLOUDINARY-API_SECRET'),
  API_KEY: env('CLOUDINARY-API_KEY'),
};
