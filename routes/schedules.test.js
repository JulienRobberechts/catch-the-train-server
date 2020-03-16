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
    expect(response.body.routes.length).toBe(3);
  });
  it("should return the SGL schedules", async () => {
    const response = await api.get("/schedules/sgl").expect(200);
    expect(response.body.routes.length).toBe(1);
  });
  it("should return the SGL schedules with destination", async () => {
    const response = await api
      .get("/schedules/sgl/le-vesinet-centre")
      .expect(200);
    expect(response.body.routes.length).toBe(1);
  });
  it("should return all ML schedules", async () => {
    const response = await api.get("/schedules/ml").expect(200);
    expect(response.body.routes.length).toBe(2);
  });
  it("should return ML schedules for nation", async () => {
    const response = await api.get("/schedules/ml/nation").expect(200);
    expect(response.body.routes.length).toBe(1);
  });
});
