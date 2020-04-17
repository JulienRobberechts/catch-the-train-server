const each = require("jest-each").default;
const { identifyError } = require("./identifyError");
const errorCases = require("./errorCaseTest");

describe("errorManagement", () => {
  describe("identifyError", () => {
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
      "should identify an error case number $errorCaseId",
      ({ errorCaseId, errorCase }) => {
        const actualErrorCode = identifyError(errorCase.incomingError);
        expect(actualErrorCode).toEqual(errorCase.expectedErrorCode);
      }
    );
  });
});
