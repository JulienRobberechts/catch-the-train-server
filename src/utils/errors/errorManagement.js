const ErrorCodes = require("./errorCodes");
const {
  ErrorMessages,
  errorInErrorManagementObject,
} = require("./errorMessages.fr");

const handleServerError = (rawError) => {
  try {
    const errorCode = identifyError(rawError);
    const errorObject = getAppError(errorCode);
    LogErrorInternally(rawError, errorObject);
    return errorObject;
  } catch (errorInErrorManagement) {
    console.log("Error in the error treatment", { errorInErrorManagement });
    return errorInErrorManagementObject;
  }
};

const identifyError = (rawError) => {
  if (!rawError || !rawError.response || !rawError.response.status)
    return ErrorCodes.ERROR_50000_UNKNOWN_SERVER_ERROR;

  const httpStatus = rawError.response.status;

  return identifyExternalServiceError(httpStatus);
};

const identifyExternalServiceError = (status) => {
  if (status >= 400 && status < 500)
    return ErrorCodes.ERROR_50020_EXTERNAL_SERVICE_USAGE_ERROR;

  switch (status) {
    case 500:
      return ErrorCodes.ERROR_50320_EXTERNAL_SERVICE_SERVER_ERROR;
    case 503:
      return ErrorCodes.ERROR_50310_EXTERNAL_SERVICE_UNAVAILABLE;
    default:
      return ErrorCodes.ERROR_50300_EXTERNAL_SERVICE_UNKNOWN_ERROR;
  }
};

const getAppError = (errorCode) => {
  return ErrorMessages.find((e) => e.code === errorCode);
};

const addResponseHttpCode = (errorObject) => {
  errorObject.context = context;
  return errorObject;
};

const LogErrorInternally = (errorInDev, errorObjectWithContext) => {
  if (
    process.env.NODE_ENV === "development" ||
    process.env.NODE_ENV === "test"
  ) {
    console.error({ errorInDev });
    console.error({ errorObjectWithContext });
  }

  // log via the server
  // todo ...
};

module.exports = {
  handleError: handleServerError,
  identifyError,
  getAppError,
  attachErrorContext: addResponseHttpCode,
  LogErrorInternally,
};
