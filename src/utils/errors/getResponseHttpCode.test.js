const each = require("jest-each").default;
const ErrorCodes = require("./errorCodes");
const { getResponseHttpCode } = require("./errorManagement");

describe("errorManagement", () => {
  describe("getResponseHttpCode", () => {
    each`
      errorCode                                               | expectedResponseHttpCode
      ${ErrorCodes.ERROR_40000_BAD_REQUEST}                   | ${400}
      ${ErrorCodes.ERROR_50000_UNKNOWN_SERVER_ERROR}          | ${500}
      ${ErrorCodes.ERROR_50010_SERVER_ERROR_MANAGEMENT_ERROR} | ${500}
      ${ErrorCodes.ERROR_50020_EXTERNAL_SERVICE_USAGE_ERROR}  | ${500}
      ${ErrorCodes.ERROR_50300_EXTERNAL_SERVICE_UNKNOWN_ERROR}| ${503}
      ${ErrorCodes.ERROR_50320_EXTERNAL_SERVICE_SERVER_ERROR} | ${503}
      ${ErrorCodes.ERROR_50310_EXTERNAL_SERVICE_UNAVAILABLE}  | ${503}
    `.test(
      "should get ResponseHttpCode from errorCode $errorCode",
      ({ errorCode, expectedResponseHttpCode }) => {
        const actualResponseHttpCode = getResponseHttpCode(errorCode);
        expect(actualResponseHttpCode).toBe(expectedResponseHttpCode);
      }
    );

    test("should throw an error when the error code is not valid", () => {
      const getCodeAction = () => getResponseHttpCode(500);
      expect(getCodeAction).toThrow();
    });
  });
});
