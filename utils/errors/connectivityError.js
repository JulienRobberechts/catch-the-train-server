class ConnectivityError extends Error {
  constructor(message) {
    super(message);
    this.name = "ConnectivityError";
  }
}

module.exports = { ConnectivityError };
