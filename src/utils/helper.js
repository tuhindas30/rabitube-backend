function HttpError(status, message) {
  this.status = status;
  this.message = message;
}

module.exports = { HttpError };
