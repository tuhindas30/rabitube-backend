const errorHandler = (err, req, res, next) => {
  res.status(500).json({ status: "ERROR", message: err.message });
}

module.exports = errorHandler;