const request = require("supertest");
const debug = require("debug")("ctt:test");

const app = require("../app");
const api = request(app);
const { mockApiCalls } = require("../tests/mock/ratp-api/mockApiCalls");

const config = require("../config");

describe("GET /next-train/{network}/{line}/{station}?missions=...", () => {
  const station = "chatelet+les+halles";
  const url = "/next-trains/rers/A/" + station;
  beforeEach(() => {
    if (config.RATP_API_MOCK_DATA)
      throw Error("RATP_API_MOCK_DATA should be set to 'false' for this test");
    mockApiCalls(station);
  });
  it("should return all missions for chatelet", async () => {
    const response = await api.get(url).expect(200);
    expect(response.body.departures).toMatchSnapshot();
    expect(response.body.departures.length).toBe(8);
  });
  it("should return 'UPAC' missions for chatelet", async () => {
    const response = await api.get(url + "?missions=UPAC").expect(200);
    expect(response.body.departures).toMatchSnapshot();
    expect(response.body.departures.length).toBe(2);
  });
  it("should return 'UPAC' and 'ZEBU' missions for chatelet", async () => {
    const response = await api.get(url + "?missions=UPAC,ZEBU").expect(200);
    expect(response.body.departures).toMatchSnapshot();
    expect(response.body.departures.length).toBe(5);
  });
});

describe("GET schedule by destination", () => {
  const fromStation = "chatelet+les+halles";
  beforeEach(() => {
    if (config.RATP_API_MOCK_DATA)
      throw Error("RATP_API_MOCK_DATA should be set to 'false' for this test");
    mockApiCalls(fromStation);
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
