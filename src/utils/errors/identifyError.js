const ErrorCodes = require("./errorCodes");
const { ServerError } = require("./serverError");
const { ApplicationError } = require("./applicationError");

const identifyError = (incomingError) => {
  if (!incomingError) {
    return ErrorCodes.ERROR_50000_UNKNOWN_SERVER_ERROR;
  }

  if (incomingError instanceof ApplicationError) {
    const { errorCode } = incomingError;
    if (!errorCode) {
      throw Error("an ApplicationError should have an errorCode");
    }
    return errorCode;
  }

  if (incomingError instanceof ServerError) {
    return identifyServerError(incomingError);
  }

  return identifyNativeError(incomingError);
};

const identifyServerError = (serverError) => {
  const { rootError } = serverError;

  if (!rootError) {
    return ErrorCodes.ERROR_50000_UNKNOWN_SERVER_ERROR;
  }

  if (rootError instanceof ApplicationError) {
    const { errorCode } = rootError;
    if (!errorCode) {
      throw Error("an ApplicationError should have an errorCode");
    }
    return errorCode;
  }

  if (rootError.code) {
    return identifyExternalServiceErrorByCode(rootError.code);
  }

  if (rootError.response && rootError.response.status) {
    return identifyExternalServiceErrorByHttpStatusCode(
      rootError.response.status
    );
  }

  return ErrorCodes.ERROR_50000_UNKNOWN_SERVER_ERROR;
};

// list of Linux error codes
// https://www-numi.fnal.gov/offline_software/srt_public_context/WebDocs/Errors/unix_system_errors.html
const identifyExternalServiceErrorByCode = (externalCode) => {
  switch (externalCode) {
    case "ETIMEDOUT":
    case "ECONNABORTED":
    case "ECONNRESET":
      return ErrorCodes.ERROR_50340_EXTERNAL_SERVICE_TIMEOUT;
    default:
      console.log(
        `External service error code '${externalCode}' not recognized`
      );
      return ErrorCodes.ERROR_50300_EXTERNAL_SERVICE_UNKNOWN_ERROR;
  }
};

const identifyExternalServiceErrorByHttpStatusCode = (status) => {
  switch (status) {
    case 404:
      return ErrorCodes.ERROR_50330_EXTERNAL_SERVICE_NOT_FOUND;
    case 500:
      return ErrorCodes.ERROR_50320_EXTERNAL_SERVICE_SERVER_ERROR;
    case 503:
      return ErrorCodes.ERROR_50310_EXTERNAL_SERVICE_UNAVAILABLE;
    default:
      if (status >= 400 && status < 500) {
        return ErrorCodes.ERROR_50020_EXTERNAL_SERVICE_USAGE_ERROR;
      }
      return ErrorCodes.ERROR_50300_EXTERNAL_SERVICE_UNKNOWN_ERROR;
  }
};

const identifyNativeError = (nativeError) => {
  return ErrorCodes.ERROR_50000_UNKNOWN_SERVER_ERROR;
};

module.exports = {
  identifyError,
};
