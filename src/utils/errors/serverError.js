class ServerError extends Error {
  constructor(message, rootError) {
    super(message);
    this.name = "ServerError";
    this.rootError = rootError;
  }
}

module.exports = { ServerError };
