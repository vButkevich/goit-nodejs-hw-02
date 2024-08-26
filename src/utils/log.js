import { LOG } from '../constants/log.js';

export const log = (message) => {
  if (LOG.DEBUG === 'true') {
    console.log(new Date(), message);
    // console.log(new Date().toLocaleString(), ':', message);
  }
};
