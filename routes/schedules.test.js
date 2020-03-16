const request = require("supertest");
const debug = require("debug")("ctt:test");

const app = require("../app");
const api = request(app);
const { mockRatpApi } = require("../tests/mock/ratp-api");

describe("GET /schedules", () => {
  beforeEach(() => {
    mockRatpApi();
  });
  it("should return the all schedules", async () => {
    const response = await api.get("/schedules").expect(200);
    debug("/schedules body", response.body);
    expect(response.body).toMatchSnapshot();
  });
  it("should return the SGL schedules", async () => {
    const response = await api.get("/schedules/SGL").expect(200);
    debug("/schedules body", response.body);
    expect(response.body).toMatchSnapshot();
  });
  it("should return the SGL schedules", async () => {
    const response = await api.get("/schedules/SGL/Paris").expect(200);
    debug("/schedules body", response.body);
    expect(response.body).toMatchSnapshot();
  });
});
