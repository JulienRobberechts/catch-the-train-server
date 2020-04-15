const each = require("jest-each").default;
const ErrorCodes = require("./errorCodes");
const { handleError } = require("./errorManagement");
const errorCases = require("./errorCaseTest");

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
      ${1} | ${errorCases.server_Error}
      ${2} | ${errorCases.externalService_UsageError}
      ${3} | ${errorCases.externalService_ServerError}
      ${4} | ${errorCases.externalService_UnavailableError}
      ${5} | ${errorCases.externalService_OtherError}
    `.test(
      "should handleError an error number $errorCaseId",
      ({ errorCaseId, errorCase }) => {
        const actualAppError = handleError(errorCase.incomingError);
        expect(actualAppError).toMatchSnapshot();
        expect(actualAppError.errorCode).toBeTruthy();
        expect(actualAppError.errorMessage).toBeTruthy();
        expect(actualAppError.errorCode).toEqual(errorCase.expectedErrorCode);
        expect(actualAppError.errorHttpCode).toBeTruthy();
      }
    );

    test.skip("should reproduce test", () => {
      const actualAppError = handleError(
        errorCases.externalService_ServerError.incomingError
      );
      expect(actualAppError).toBeTruthy();
      expect(actualAppError.errorCode).toEqual(
        errorCases.externalService_ServerError.expectedErrorCode
      );
    });
  });
});
