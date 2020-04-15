const each = require("jest-each").default;
const { identifyError } = require("./identifyError");
const errorCases = require("./errorCaseTest");

describe("errorManagement", () => {
  describe("identifyError", () => {
    each`
      errorCaseId | errorCase
      ${1}  | ${errorCases.server_Error}
      ${2}  | ${errorCases.externalService_UsageError}
      ${3}  | ${errorCases.externalService_ServerError}
      ${4}  | ${errorCases.externalService_UnavailableError}
      ${5}  | ${errorCases.externalService_OtherError}
    `.test(
      "should identify an error case number $errorCaseId",
      ({ errorCaseId, errorCase }) => {
        const actualErrorCode = identifyError(errorCase.incomingError);
        expect(actualErrorCode).toEqual(errorCase.expectedErrorCode);
      }
    );
  });
});
