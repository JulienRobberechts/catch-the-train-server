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
      ${1}  | ${errorCases.native_Error}
      ${2}  | ${errorCases.application_Error}
      ${3}  | ${errorCases.application_in_server_Error}
      ${4}  | ${errorCases.externalService_UsageError}
      ${5}  | ${errorCases.externalService_ServerError}
      ${6}  | ${errorCases.externalService_UnavailableError}
      ${7}  | ${errorCases.externalService_OtherError}
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
        errorCases.application_Error.incomingError
      );
      expect(actualAppError).toBeTruthy();
      expect(actualAppError.errorCode).toEqual(
        errorCases.application_Error.expectedErrorCode
      );
    });
  });
});
