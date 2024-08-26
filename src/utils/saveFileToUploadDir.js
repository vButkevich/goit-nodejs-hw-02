import path from 'node:path';
import fs from 'node:fs/promises';
import { TEMP_DIR, UPLOADS_DIR } from '../constants/index.js';
import { env } from './env.js';

export const saveFileToUploadDir = async (file) => {
  console.log('>>saveFileToUploadDir--------------------------------');
  console.log({ file });

  await fs.rename(
    path.join(TEMP_DIR, file.filename),
    path.join(UPLOADS_DIR, file.filename),
  );

  const domain = env('APP_DOMAIN');
  return `${domain}/uploads/${file.filename}`;
};
