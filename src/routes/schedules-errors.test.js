const request = require("supertest");
const debug = require("debug")("ctt:test");

const app = require("../app");
const api = request(app);
const {
  mockApiCallsWithNoConnectivity,
  mockApiCallsWithScheduleUnavailable,
} = require("../tests/mock/ratp-api/mockApiCalls");

const config = require("../config");

describe("No connectivity", () => {
  const station = "chatelet+les+halles";
  const url = "/next-trains/rers/A/" + station;
  beforeEach(() => {
    if (config.RATP_API_MOCK_DATA)
      throw Error("RATP_API_MOCK_DATA should be set to 'false' for this test");
    mockApiCallsWithNoConnectivity(station);
  });
  it("should return a connectivity error", async () => {
    const response = await api.get(url).expect(503);
    expect(response.body.errorType).toBe("ServerError");
    expect(response.body.errorMessage).toBe("Server Error");
  });
});

describe("Schedule Unavailable", () => {
  const station = "cergy+prefecture";
  const url = "/next-trains/rers/A/" + station;
  beforeEach(() => {
    if (config.RATP_API_MOCK_DATA)
      throw Error("RATP_API_MOCK_DATA should be set to 'false' for this test");
    mockApiCallsWithScheduleUnavailable(station);
  });
  it("should return a connectivity error", async () => {
    const response = await api.get(url).expect(503);
    expect(response.body.errorType).toBe("ServerError");
    expect(response.body.errorMessage).toBe("Server Error");
  });
});
