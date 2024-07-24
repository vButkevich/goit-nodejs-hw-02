import mongoose from 'mongoose';

import { env } from '../utils/env.js';

const getConnectionString = () => {
  const user = env('MONGODB_USER');
  const pwd = env('MONGODB_PASSWORD');
  const url = env('MONGODB_URL');
  const db = env('MONGODB_DB');

  const connectionString = `mongodb+srv://${user}:${pwd}@${url}/${db}?retryWrites=true&w=majority`;
  console.log({ connectionString });
  return connectionString;
};

export const initMongoConnection = async () => {
  try {
    const connectionString = getConnectionString();
    await mongoose.connect(connectionString);
    console.log('MongoDb connection successfully established!');
  } catch (e) {
    console.log('Error while setting up mongo connection', e);
    throw e;
  }
};
