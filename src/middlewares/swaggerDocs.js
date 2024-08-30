// src/middlewares/swaggerDocs.js

import createHttpError from 'http-errors';
import swaggerUI from 'swagger-ui-express';
import fs from 'node:fs';

import { SWAGGER } from '../constants/swagger.js';
import { debuglog } from '../utils/debug_log.js';

export const swaggerDocs = () => {
  debuglog('swaggerDocs:-------------->->');
  debuglog(SWAGGER.JSON);

  try {
    const swagger_json = fs
      .readFileSync(SWAGGER.JSON, { encoding: 'utf-8' })
      .toString();
    const swaggerDoc = JSON.parse(swagger_json);
    debuglog({ swagger_json });
    debuglog({ swaggerDoc });
    debuglog(swaggerDoc);

    return [...swaggerUI.serve, swaggerUI.setup(swaggerDoc)];
  } catch (err) {
    console.log({ err });
    return (req, res, next) =>
      next(createHttpError(500, "Can't load swagger docs."));
  }
};
