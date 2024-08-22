// src/controllers/auth.js

import { generateAuthUrl } from '../utils/googleOAuth2.js';

/* Інший код файлу */

export const getGoogleOAuthUrlController = async (req, res) => {
  const url = generateAuthUrl();
  res.json({
    status: 200,
    message: 'Successfully get Google OAuth url!',
    data: {
      url,
    },
  });
};
