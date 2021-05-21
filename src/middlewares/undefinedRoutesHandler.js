const undefinedRoutesHandler = (req, res, next) => {
  res.status(404).json({ status: "ERROR", message: "The route doesn't exist" });
}

module.exports = undefinedRoutesHandler;