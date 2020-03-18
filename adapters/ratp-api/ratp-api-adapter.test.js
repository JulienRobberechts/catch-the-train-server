const apiAdapter = require("./ratp-api-adapter");
const { ConnectivityError } = require("../../utils/errors");

describe("ratp-api adapter", () => {
  it("should throw an error if RATP_API_ROOT_URL is not provided", done => {
    apiAdapter.getAllSchedulesRATP({}).catch(e => {
      expect(e instanceof Error).toBeTruthy();
      done();
    });
  });
});

describe("ratp-api adapter error management", () => {
  let originalError;
  beforeAll(() => {
    originalError = console.error;
    console.error = jest.fn();
  });
  afterAll(() => {
    console.error = originalError;
  });

  it("should fail with connectivity error immediately with invalid http address", done => {
    apiAdapter
      .getAllSchedulesRATP({
        RATP_API_ROOT_URL: "https://invalid-api.ratp.fr"
      })
      .catch(e => {
        expect(e instanceof ConnectivityError).toBeTruthy();
        expect(e.name).toEqual("ConnectivityError");
        expect(e.message).toEqual("Connectivity Error with the Api 'ratp'");
        done();
      });
  }, 2000);
  it("should fail with connectivity error after the timeout (500ms) with invalid address (non http)", done => {
    apiAdapter
      .getAllSchedulesRATP({
        RATP_API_ROOT_URL: "invalid-api.ratp.fr"
      })
      .catch(e => {
        expect(e instanceof ConnectivityError).toBeTruthy();
        expect(e.name).toEqual("ConnectivityError");
        expect(e.message).toEqual("Connectivity Error with the Api 'ratp'");
        done();
      });
  }, 2000);
});
