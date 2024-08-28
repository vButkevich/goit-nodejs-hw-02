import { env } from '../utils/env.js';

export const APP = {
  PORT: env('PORT', '3000'),
  DOMAIN: env('APP_DOMAIN', 'http://localhost:3000'),
  JWT_SECRET: env('JWT_SCRET', 'VOQjLdrpG1TWCHhDzv3o'),
  DEBUG_LOG: env('APP_DEBUG_LOG', 'false'),
};

/*
Generate a Random JWT Secret Key
https://dev.to/tkirwa/generate-a-random-jwt-secret-key-39j4
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

*/
