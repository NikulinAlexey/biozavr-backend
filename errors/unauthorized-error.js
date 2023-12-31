class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
    this.name = 'Authorization Error';
  }
}

module.exports = UnauthorizedError;
