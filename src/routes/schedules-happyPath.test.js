const request = require("supertest");
const debug = require("debug")("ctt:test");

const app = require("../app");
const api = request(app);
const { mockApiCalls } = require("../tests/mock/ratp-api/mockApiCalls");
const {
  nockRatpMissionsApiCalls,
} = require("../tests/mock/ratp-api/mockMissionsCalls");

const config = require("../config");

describe("GET schedule by destination", () => {
  const fromStation = "chatelet+les+halles";
  beforeEach(async (done) => {
    if (config.RATP_API_MOCK_DATA)
      throw Error("RATP_API_MOCK_DATA should be set to 'false' for this test");
    mockApiCalls(fromStation);
    await nockRatpMissionsApiCalls();
    done();
  });
  it("should return 5 departures from chatelet+les+halles to maisons+laffitte", async () => {
    const toStation = "maisons+laffitte";
    const url = `/next-trains/rers/A/${fromStation}/${toStation}`;
    const response = await api.get(url).expect(200);
    expect(response.body.departures).toMatchSnapshot();
    expect(response.body.departures.length).toBe(5);
  });
  it("should return 2 departures from chatelet+les+halles to cergy+le+haut", async () => {
    const toStation = "cergy+le+haut";
    const url = `/next-trains/rers/A/${fromStation}/${toStation}`;
    const response = await api.get(url).expect(200);
    expect(response.body.departures).toMatchSnapshot();
    expect(response.body.departures.length).toBe(2);
  });
});
