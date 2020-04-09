const request = require("supertest");
const debug = require("debug")("ctt:test");

const app = require("../app");
const api = request(app);
const {
  mockApiCalls,
  mockApiCallsWithNoConnectivity,
} = require("../tests/mock/ratp-api/mockApiCalls");

const config = require("../config");

describe("GET /next-train/{network}/{line}/{station}?missions=...", () => {
  beforeEach(() => {
    if (config.RATP_API_MOCK_DATA)
      throw Error("RATP_API_MOCK_DATA should be set to 'false' for this test");
    mockApiCalls();
  });
  it("should return all missions for chatelet", async () => {
    const response = await api
      .get("/next-trains/rers/A/chatelet+les+halles")
      .expect(200);
    expect(response.body.departures.length).toBe(8);
  });
  it("should return 'UPAC' missions for chatelet", async () => {
    const response = await api
      .get("/next-trains/rers/A/chatelet+les+halles?missions=UPAC")
      .expect(200);
    expect(response.body.departures.length).toBe(2);
  });
  it("should return 'UPAC' and 'ZEBU' missions for chatelet", async () => {
    const response = await api
      .get("/next-trains/rers/A/chatelet+les+halles?missions=UPAC,ZEBU")
      .expect(200);
    expect(response.body.departures.length).toBe(5);
  });
});

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
    expect(response.body.errorType).toBe("ConnectivityError");
    expect(response.body.errorMessage).toBe(
      "Connectivity Error with the Api 'ratp'"
    );
  });
});
