const ErrorCodes = require("./errorCodes");
const {
  ErrorMessages,
  errorInErrorManagementObject,
} = require("./errorMessages.fr");

const handleServerError = (rawError) => {
  try {
    const errorCode = identifyError(rawError);
    const errorObject = formatError(errorCode);
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

  if (httpStatus === 500) return ErrorCodes.ERROR_50000_UNKNOWN_SERVER_ERROR;
  if (httpStatus === 503) return ErrorCodes.ERROR_50300_CONNECTIVITY_ERROR;
  if (httpStatus === 400) return ErrorCodes.ERROR_40000_BAD_REQUEST;
  if (!httpStatus) return ErrorCodes.ERROR_50000_UNKNOWN_SERVER_ERROR;
  return ErrorCodes.ERROR_50000_UNKNOWN_SERVER_ERROR;
};

const formatError = (errorCode) => {
  return ErrorMessages.find((e) => e.code === errorCode);
};

const attachErrorContext = (errorObject, context) => {
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
  formatError,
  attachErrorContext,
  LogErrorInternally,
};
