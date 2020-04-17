// Error to carry an other exception (native of application)
class ServerError extends Error {
  constructor(message, rootError) {
    super(message);
    this.name = "ServerError";
    this.rootError = rootError;
  }
}

module.exports = { ServerError };
