import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';

export const getRandomPassword = async () => {
  // const randomPassword = await bcrypt.hash(randomBytes(10), 10);
  const password = randomBytes(10).toString('base64');
  console.log({ password });
  return await getEncryptedPassword(password);
};

export const getEncryptedPassword = async (password) => {
  const encryptedPassword = await bcrypt.hash(password, 10);
  return encryptedPassword;
};

export const comparePasswords = async (current, origin) => {
  const isPasswordCorrect = await bcrypt.compare(current, origin);
  return isPasswordCorrect;
};
