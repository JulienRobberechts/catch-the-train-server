const { ServerError } = require("../../../utils/errors");

const getMissionDetail = require("./getMissionDetail");

describe("getMissionDetail", () => {
  it("should throw an error if RATP_API_ROOT_URL is not provided", (done) => {
    getMissionDetail({ missionCode: "ABCD" }).catch((e) => {
      expect(e instanceof Error).toBeTruthy();
      done();
    });
  });
  it("should throw an error if missionCode is not provided", (done) => {
    getMissionDetail({ RATP_API_ROOT_URL: "https://api-ratp.fr" }).catch(
      (e) => {
        expect(e instanceof Error).toBeTruthy();
        done();
      }
    );
  });
});

describe("getMissionDetail error management", () => {
  let originalError;
  beforeAll(() => {
    originalError = console.error;
    console.error = jest.fn();
  });
  afterAll(() => {
    console.error = originalError;
  });

  it("should fail with server error immediately with invalid http address", (done) => {
    getMissionDetail({
      RATP_API_ROOT_URL: "https://invalid-api.ratp.fr",
      missionCode: "ABCD",
    }).catch((e) => {
      expect(e instanceof ServerError).toBeTruthy();
      expect(e.name).toEqual("ServerError");
      expect(e.message).toEqual("Server Error");
      done();
    });
  }, 8000);
  it("should fail with server error after the timeout with invalid address (non http)", (done) => {
    getMissionDetail({
      RATP_API_ROOT_URL: "invalid-api.ratp.fr",
      missionCode: "ABCD",
    }).catch((e) => {
      expect(e instanceof ServerError).toBeTruthy();
      expect(e.name).toEqual("ServerError");
      expect(e.message).toEqual("Server Error");
      done();
    });
  }, 8000);
});
