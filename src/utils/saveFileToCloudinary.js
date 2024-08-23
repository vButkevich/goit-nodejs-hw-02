// src/utils/saveFileToCloudinary.js

import fs from 'node:fs/promises';
import cloudinary from 'cloudinary';

// import { env } from './env.js';
import { CLOUDINARY } from '../constants/cloudinary.js';

cloudinary.v2.config({
  secure: true,
  cloud_name: CLOUDINARY.CLOUD_NAME,
  api_secret: CLOUDINARY.API_SECRET,
  api_key: CLOUDINARY.API_KEY,
});

export const saveFileToCloudinary = async (file) => {
  console.log('>>saveFileToCloudinary');
  console.log({ file });
  const response = await cloudinary.v2.uploader.upload(file.path);
  await fs.unlink(file.path);
  return response.secure_url;
};
