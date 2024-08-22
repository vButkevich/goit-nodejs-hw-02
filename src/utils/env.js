import dotenv from 'dotenv';

dotenv.config();

export function env(name, defaultValue) {
  // console.log({ name });
  const value = process.env[name];
  // console.log({ value });
  if (value) {
    // const env = { name: value };
    // console.log(`env.value: [${name}] : [${value}]`);
    return value;
  }
  if (defaultValue) {
    // || defaultValue === '') {
    // console.log({ env });
    // console.log(`env.default: [${name}] : [${defaultValue}]`);
    return defaultValue;
  }
  console.log({ defaultValue });
  // throw new Error(`Missing: process.env['${name}'].`);
  throw `Missing: process.env['${name}'].`;
}
