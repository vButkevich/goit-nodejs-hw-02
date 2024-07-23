export const controllerWrapper = (controller) => {
  console.log({ controller });

  return async (req, res, next) => {
    try {
      const body = req.body;
      console.log({ body });
      await controller(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};
