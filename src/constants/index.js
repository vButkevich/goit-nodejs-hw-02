// src/constants/index.js

import path from 'node:path';

export const TEMPLATES_DIR = path.join(process.cwd(), 'src', 'templates');
export const UPLOADS_DIR = path.join(process.cwd(), 'uploads');
export const TEMP_DIR = path.join(process.cwd(), 'temp');

export const FIFTEEN_MINUTES = 900000; //15 * 60 * 1000;
export const ONE_DAY = 86400000; //24 * 60 * 60 * 1000;

export const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
};
