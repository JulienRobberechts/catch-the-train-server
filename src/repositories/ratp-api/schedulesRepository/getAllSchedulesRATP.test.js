const getAllSchedulesRATP = require("./getAllSchedulesRATP");
const { ServerError } = require("../../../utils/errors");

describe("getAllSchedulesRATP", () => {
  it("should throw an error if RATP_API_ROOT_URL is not provided", (done) => {
    getAllSchedulesRATP(null, {}).catch((e) => {
      expect(e instanceof Error).toBeTruthy();
      done();
    });
  });
});

describe("getAllSchedulesRATP error management", () => {
  let originalError;
  beforeAll(() => {
    originalError = console.error;
    console.error = jest.fn();
  });
  afterAll(() => {
    console.error = originalError;
  });

  it("should fail with server error immediately with invalid http address", (done) => {
    getAllSchedulesRATP("https://invalid-api.ratp.fr", {}).catch((e) => {
      expect(e instanceof ServerError).toBeTruthy();
      expect(e.name).toEqual("ServerError");
      expect(e.message).toEqual("Server Error");
      done();
    });
  }, 8000);
  it("should fail with server error after the timeout (500ms) with invalid address (non http)", (done) => {
    getAllSchedulesRATP("invalid-api.ratp.fr", {}).catch((e) => {
      expect(e instanceof ServerError).toBeTruthy();
      expect(e.name).toEqual("ServerError");
      expect(e.message).toEqual("Server Error");
      done();
    });
  }, 8000);
});
