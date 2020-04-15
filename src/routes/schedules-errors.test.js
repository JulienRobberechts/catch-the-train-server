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
  beforeEach(() => {
    if (config.RATP_API_MOCK_DATA)
      throw Error("RATP_API_MOCK_DATA should be set to 'false' for this test");
    mockApiCallsWithNoConnectivity();
  });
  it("should return a connectivity error", async () => {
    const response = await api
      .get("/next-trains/rers/A/chatelet+les+halles")
      .expect(503);
    expect(response.body.errorType).toBe("ServerError");
    expect(response.body.errorMessage).toBe("Server Error");
  });
});

describe("Schedule Unavailable", () => {
  beforeEach(() => {
    if (config.RATP_API_MOCK_DATA)
      throw Error("RATP_API_MOCK_DATA should be set to 'false' for this test");
    mockApiCallsWithScheduleUnavailable();
  });
  it("should return a connectivity error", async () => {
    const response = await api
      .get("/next-trains/rers/A/cergy+prefecture")
      .expect(503);

    expect(response.body.errorType).toBe("ServerError");
    expect(response.body.errorMessage).toBe("Server Error");
  });
});
