const each = require("jest-each").default;
const ErrorCodes = require("./errorCodes");
const { ErrorMessages: errorMessagesFr } = require("./errorMessages.fr");
const { getAppError } = require("./errorManagement");

describe("errorManagement", () => {
  describe("errorMessagesFr", () => {
    each(
      Object.entries(ErrorCodes).map(([errorCodeName, errorCodeValue]) => [
        errorCodeValue,
      ])
    ).test(
      "should have an entry for errorCode %o (in ErrorCodes.js)",
      (errorCode) => {
        const appError = getAppError(errorCode);
        // console.log({ appError });
        expect(appError).toBeTruthy();
        expect(appError.code).toBe(errorCode);
        expect(appError.msg).toBeTruthy();
      }
    );
    each(errorMessagesFr.map((m) => [m])).test(
      "entry %o should match an errorCode in ErrorCodes.js",
      (errorMessage) => {
        const codeInErrorCodeFile = Object.entries(ErrorCodes).find(
          ([key, value]) => value === errorMessage.code
        );
        expect(codeInErrorCodeFile).toBeTruthy();
      }
    );
  });
  describe("getAppError", () => {
    each`
      errorCode     | expectedMessage
      ${40000}      | ${"Erreur de requête"}
      ${50000}      | ${"Erreur serveur inconnue"}
      ${50010}      | ${"Erreur dans la gestion d'erreur du serveur"}
      ${50300}      | ${"Le service externe a rencontré une erreur inconnue"}
    `.test(
      "should get the message for an error $errorCode",
      ({ errorCode, expectedMessage }) => {
        const actualObject = getAppError(errorCode);
        expect(actualObject).toBeTruthy();
        expect(actualObject.msg).toEqual(expectedMessage);
      }
    );
  });
});
