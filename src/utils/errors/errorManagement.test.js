const each = require("jest-each").default;
const ErrorCodes = require("./errorCodes");
const {
  handleError,
  identifyError,
  formatError,
} = require("./errorManagement");

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
    expectedErrorCode: ErrorCodes.ERROR_50300_CONNECTIVITY_ERROR,
  },
  externalService_UnavailableError: {
    incomingError: { isAxiosError: true, response: { status: 503 } },
    expectedErrorCode: ErrorCodes.ERROR_50310_PROVIDER_SERVICE_UNAVAILABLE,
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
      errorCase                  
      ${errorCase.server_Error}
      ${errorCase.externalService_UsageError}
      ${errorCase.externalService_ServerError}
      ${errorCase.externalService_UnavailableError}
    `.test("%#. should handleError an error", ({ errorCase }) => {
      const actualErrorObject = handleError(errorCase.incomingError);
      expect(actualErrorObject).toMatchSnapshot();
    });
  });
  describe("formatError", () => {
    each`
      errorCode     | expectedMessage
      ${40000}      | ${"Erreur de requete"}
      ${50000}      | ${"Erreur serveur inconnue"}
      ${50010}      | ${"La gestion d'erreur n'a pas fonctionnée"}
      ${50020}      | ${"Erreur server"}
      ${50300}      | ${"Erreur de connectivite avec le service externe"}
      ${50310}      | ${"le fournisseur de donnees est momentanément indisponible"}
    `.test(
      "should format an error $errorCode",
      ({ errorCode, expectedMessage }) => {
        const actualObject = formatError(errorCode);
        expect(actualObject).toBeTruthy();
        expect(actualObject.msg).toEqual(expectedMessage);
      }
    );
  });
});
