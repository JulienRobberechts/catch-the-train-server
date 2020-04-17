// Error to carry only an application error code (and some properties)
class ApplicationError extends Error {
  constructor(errorCode, properties) {
    super("ApplicationError");
    this.errorCode = errorCode;
    this.properties = properties;
  }
}

module.exports = { ApplicationError };
