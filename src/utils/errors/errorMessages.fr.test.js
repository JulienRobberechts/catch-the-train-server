const each = require("jest-each").default;
const ErrorCodes = require("./errorCodes");
const { getAppError } = require("./errorManagement");

describe("errorManagement", () => {
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
