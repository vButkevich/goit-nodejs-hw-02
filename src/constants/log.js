import { env } from "../utils/env.js";

export const LOG = {
    DEBUG: env('LOG_DEBUG', 'false'),
  };
