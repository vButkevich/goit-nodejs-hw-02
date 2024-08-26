import path from 'node:path';

const swagger_json = path.join(process.cwd(), 'docs', 'swagger.json');

export const SWAGGER = {
  JSON: swagger_json,
};
