import { env } from '../utils/env.js';

export const DEBUG = {
  LOG: env('APP_DEBUG_LOG', 'false'),
};
