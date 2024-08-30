// src/controllers/auth.js

import { loginOrSignupWithGoogle } from '../services/authGoogleService.js';
import { setupAuthUserSessionCookies } from '../services/authUserSessionService.js';
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

export const loginWithGoogleController = async (req, res, next) => {
  const session = await loginOrSignupWithGoogle(req.body.code);
  setupAuthUserSessionCookies(res, session);

  res.json({
    status: 200,
    message: 'Successfully logged in via Google OAuth!',
    data: {
      accessToken: session.accessToken,
      session,
    },
  });
};
