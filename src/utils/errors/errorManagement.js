const ErrorCodes = require("./errorCodes");
const {
  ErrorMessages,
  errorInErrorManagementObject,
} = require("./errorMessages.fr");

const handleServerError = (rawError) => {
  try {
    const errorCode = identifyError(rawError);
    const appError = getAppError(errorCode);
    appError.OriginalException = rawError;
    appError.responseHttpCode = getResponseHttpCode(errorCode);
    logError(appError);
    return appError;
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
  const appError = ErrorMessages.find((e) => e.code === errorCode);

  if (!appError)
    throw new Error(`Message for error code '${errorCode}' not found`);

  return appError;
};

const getResponseHttpCode = (errorCode) => {
  if (!errorCode || errorCode < 40000 || errorCode >= 60000)
    throw new Error(`The errorCode '${errorCode}' is not valid`);

  return Math.floor(errorCode / 100);
};

const logError = (appError) => {
  console.error({ appError });
};

module.exports = {
  handleError: handleServerError,
  identifyError,
  getAppError,
  getResponseHttpCode,
  logError,
};
