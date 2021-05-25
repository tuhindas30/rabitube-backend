const { HttpError } = require("../utils/helper");

const undefinedRoutesHandler = (req, res, next) => {
  const err = new HttpError(404, "Not Found");
  next(err);
};

module.exports = undefinedRoutesHandler;
