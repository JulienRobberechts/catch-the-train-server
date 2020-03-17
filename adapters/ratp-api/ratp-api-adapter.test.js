const RatpApiAdapter = require("./ratp-api-adapter");
const { ConnectivityError } = require("../../utils/errors");

describe("ratp-api adapter", () => {
  it("should throw an error if ratpApiRootUrl is not provided part 1", async () => {
    const invalidInit = () => new RatpApiAdapter();
    expect(invalidInit).toThrow();
  });
  it("should throw an error if ratpApiRootUrl is not provided part 2", async () => {
    const invalidInit = () => new RatpApiAdapter({});
    expect(invalidInit).toThrow();
  });
  it("should throw an error if ratpApiRootUrl is not provided part 3", async () => {
    const invalidInit = () => new RatpApiAdapter({ ratpApiRootUrl: null });
    expect(invalidInit).toThrow();
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
    const apiAdapter = new RatpApiAdapter({
      ratpApiRootUrl: "https://invalid-api.ratp.fr"
    });

    apiAdapter.getAllSchedulesRATP().catch(e => {
      expect(e instanceof ConnectivityError).toBeTruthy();
      expect(e.name).toEqual("ConnectivityError");
      expect(e.message).toEqual("Connectivity Error with the Api 'ratp'");
      done();
    });
  }, 200);
  it("should fail with connectivity error after the timeout (500ms) with invalid address (non http)", done => {
    const apiAdapter = new RatpApiAdapter({
      ratpApiRootUrl: "invalid-api.ratp.fr"
    });

    apiAdapter.getAllSchedulesRATP().catch(e => {
      expect(e instanceof ConnectivityError).toBeTruthy();
      expect(e.name).toEqual("ConnectivityError");
      expect(e.message).toEqual("Connectivity Error with the Api 'ratp'");
      done();
    });
  }, 700);
});
