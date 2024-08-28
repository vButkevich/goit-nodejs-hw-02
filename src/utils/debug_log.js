import { DEBUG } from '../constants/debug_log.js';

export const debuglog = (message) => {
  if (DEBUG.LOG === 'true') {
    console.log(new Date(), message);
    // console.log(new Date().toLocaleString(), ':', message);
  }
};
