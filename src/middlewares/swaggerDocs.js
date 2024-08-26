// src/middlewares/swaggerDocs.js

import createHttpError from 'http-errors';
import swaggerUI from 'swagger-ui-express';
import fs from 'node:fs';

import { SWAGGER } from '../constants/swagger.js';
import { log } from '../utils/log.js';

export const swaggerDocs = () => {
  log('swaggerDocs:-------------->->');
  log(SWAGGER.JSON);
  
  try {
    const swagger_json =fs.readFileSync(SWAGGER.JSON).toString();
    const swaggerDoc = JSON.parse(swagger_json);
    log({swagger_json});
    log({swaggerDoc});
    log(swaggerDoc);


    return [...swaggerUI.serve, swaggerUI.setup(swaggerDoc)];
  } catch (err) {
    console.log({err});
    return (req, res, next) =>
      next(createHttpError(500, "Can't load swagger docs."));
  }
};
