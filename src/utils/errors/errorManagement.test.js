const each = require("jest-each").default;
const ErrorCodes = require("./errorCodes");
const { handleError } = require("./errorManagement");

const errorCase = {
  server_Error: {
    incomingError: { message: "Any random error on the server" },
    expectedErrorCode: ErrorCodes.ERROR_50000_UNKNOWN_SERVER_ERROR,
  },
  externalService_UsageError: {
    incomingError: { isAxiosError: true, response: { status: 400 } },
    expectedErrorCode: ErrorCodes.ERROR_50020_EXTERNAL_SERVICE_USAGE_ERROR,
  },

  externalService_ServerError: {
    incomingError: { isAxiosError: true, response: { status: 500 } },
    expectedErrorCode: ErrorCodes.ERROR_50320_EXTERNAL_SERVICE_SERVER_ERROR,
  },
  externalService_UnavailableError: {
    incomingError: { isAxiosError: true, response: { status: 503 } },
    expectedErrorCode: ErrorCodes.ERROR_50310_EXTERNAL_SERVICE_UNAVAILABLE,
  },
  externalService_OtherError: {
    incomingError: { isAxiosError: true, response: { status: 501 } },
    expectedErrorCode: ErrorCodes.ERROR_50300_EXTERNAL_SERVICE_UNKNOWN_ERROR,
  },
};

describe("errorManagement", () => {
  // disable console logs for this test
  let originalError;
  let originalWarn;
  let originalLog;
  beforeAll(() => {
    originalError = console.error;
    console.error = jest.fn();
    originalWarn = console.warn;
    console.warn = jest.fn();
    originalLog = console.log;
    console.log = jest.fn();
  });
  afterAll(() => {
    console.error = originalError;
    console.warn = originalWarn;
    console.log = originalLog;
  });

  describe("handleError", () => {
    each`
      errorCaseId | errorCase                  
      ${1} | ${errorCase.server_Error}
      ${2} | ${errorCase.externalService_UsageError}
      ${3} | ${errorCase.externalService_ServerError}
      ${4} | ${errorCase.externalService_UnavailableError}
      ${5} | ${errorCase.externalService_OtherError}
    `.test(
      "should handleError an error number $errorCaseId",
      ({ errorCaseId, errorCase }) => {
        const actualAppError = handleError(errorCase.incomingError);
        expect(actualAppError).toMatchSnapshot();
        expect(actualAppError.code).toBeTruthy();
        expect(actualAppError.msg).toBeTruthy();
        expect(actualAppError.code).toEqual(errorCase.expectedErrorCode);
        expect(actualAppError.responseHttpCode).toBeTruthy();
      }
    );

    test("should reproduce test", () => {
      const actualAppError = handleError(
        errorCase.externalService_ServerError.incomingError
      );
      expect(actualAppError).toBeTruthy();
      expect(actualAppError.code).toEqual(
        errorCase.externalService_ServerError.expectedErrorCode
      );
    });
  });
});
