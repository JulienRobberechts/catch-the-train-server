const ErrorCodes = require("./errorCodes");
const { ServerError } = require("./serverError");

const errorCases = {
  server_Error: {
    incomingError: new ServerError("error", {
      message: "Any random error on the server",
    }),
    expectedErrorCode: ErrorCodes.ERROR_50000_UNKNOWN_SERVER_ERROR,
  },
  externalService_UsageError: {
    incomingError: new ServerError("error", {
      isAxiosError: true,
      response: { status: 400 },
    }),
    expectedErrorCode: ErrorCodes.ERROR_50020_EXTERNAL_SERVICE_USAGE_ERROR,
  },

  externalService_ServerError: {
    incomingError: new ServerError("error", {
      isAxiosError: true,
      response: { status: 500 },
    }),
    expectedErrorCode: ErrorCodes.ERROR_50320_EXTERNAL_SERVICE_SERVER_ERROR,
  },
  externalService_UnavailableError: {
    incomingError: new ServerError("error", {
      isAxiosError: true,
      response: { status: 503 },
    }),
    expectedErrorCode: ErrorCodes.ERROR_50310_EXTERNAL_SERVICE_UNAVAILABLE,
  },
  externalService_OtherError: {
    incomingError: new ServerError("error", {
      isAxiosError: true,
      response: { status: 501 },
    }),
    expectedErrorCode: ErrorCodes.ERROR_50300_EXTERNAL_SERVICE_UNKNOWN_ERROR,
  },
};

module.exports = errorCases;
