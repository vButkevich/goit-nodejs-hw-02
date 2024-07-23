// src/middlewares/notFoundHandler.js

export const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    status: 404,
    message: 'WARNING: Not found',
  });
};
/**
 *  app.use('*', (req, res, next) => {
    res.status(404).json({
      status: 400,
      message: 'Not found',
    });
  });

  app.use((err, req, res, next) => {
    res.status(500).json({
      status: 500,
      message: 'Something went wrong',
      error: err.message,
    });
  });
 */
