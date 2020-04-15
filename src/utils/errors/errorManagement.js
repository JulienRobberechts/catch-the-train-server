const ErrorCodes = require("./errorCodes");
const {
  ErrorMessages,
  errorInErrorManagementObject,
} = require("./errorMessages.fr");
const { identifyError } = require("./identifyError");

var debug = require("debug")("ctt");

const handleError = (incomingError) => {
  try {
    const errorCode = identifyError(incomingError);
    const appError = getAppError(errorCode);
    appError.originalException = incomingError;
    appError.responseHttpCode = getResponseHttpCode(errorCode);
    logError(appError);
    return toPublicError(appError);
  } catch (errorInErrorManagement) {
    console.log("Error in the error treatment", { errorInErrorManagement });
    return errorInErrorManagementObject;
  }
};

const toPublicError = (appError) => {
  const {
    code: errorCode,
    msg: errorMessage,
    responseHttpCode: errorHttpCode,
  } = appError;

  const originalException =
    process.env.NODE_ENV !== "production"
      ? appError.originalException
      : undefined;

  return {
    errorType: "Error",
    errorCode,
    errorMessage,
    originalException,
    errorHttpCode,
  };
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
  // debug({ appError });
  // console.error({ appError });
};

module.exports = {
  handleError,
  identifyError,
  getAppError,
  getResponseHttpCode,
  logError,
};
