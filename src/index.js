import { initMongoConnection } from './db/initMongoConnection.js';
import { createDirIfNotExists } from './utils/createDirIfNotExists.js';
import { TEMP_DIR, UPLOADS_DIR } from './constants/index.js';

import { setupServer } from './server.js';

const bootstrap = async () => {
  await initMongoConnection();
  await createDirIfNotExists(TEMP_DIR);
  await createDirIfNotExists(UPLOADS_DIR);
  setupServer();
};

bootstrap();
