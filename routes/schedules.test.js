const request = require("supertest");
const debug = require("debug")("ctt:test");

const app = require("../app");
const api = request(app);
const { mockApiCalls } = require("../tests/mock/ratp-api/mockApiCalls");

describe("GET /schedules", () => {
  beforeEach(() => {
    mockApiCalls();
  });

  it("should return the all schedules", async () => {
    const response = await api.get("/schedules").expect(200);
    expect(response.body.routes.length).toBe(3);
  });
  it("should return an error for invalid station", async () => {
    const response = await api.get("/schedules/invalid-station").expect(400);
    expect(response.body.errorType).toBe("ValidationError");
    expect(response.body.errorMessage).toBe(
      "the station 'invalid-station' is not recognized."
    );
  });
  it("should return the SGL schedules", async () => {
    const response = await api
      .get("/schedules/saint-germain-en-laye")
      .expect(200);
    expect(response.body.routes.length).toBe(1);
  });
  it("should return the SGL schedules with destination", async () => {
    const response = await api
      .get("/schedules/saint-germain-en-laye/le-vesinet-centre")
      .expect(200);
    expect(response.body.routes.length).toBe(1);
  });
  it("should return all ML schedules", async () => {
    const response = await api.get("/schedules/maisons-laffitte").expect(200);
    expect(response.body.routes.length).toBe(2);
  });
  it("should return ML schedules for nation", async () => {
    const response = await api
      .get("/schedules/maisons-laffitte/nation")
      .expect(200);
    expect(response.body.routes.length).toBe(1);
  });
});
