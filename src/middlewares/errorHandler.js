const errorHandler = (err, req, res, next) => {
  res.status(err.status).json({ status: "ERROR", message: err.message });
};

module.exports = errorHandler;
