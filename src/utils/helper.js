function HttpError (statusCode, message) {
  this.statusCode = statusCode;
  this.message = message;
}

module.exports = { HttpError };