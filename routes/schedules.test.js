const request = require("supertest");
const debug = require("debug")("ctt:test");

const app = require("../app");
const api = request(app);
const { mockApiCalls } = require("../tests/mock/ratp-api/mockApiCalls");

describe("GET /next-train/{type}/{line}/{station}?missions=...", () => {
  beforeEach(() => {
    mockApiCalls();
  });

  it("should return all missions for chatelet", async () => {
    const response = await api
      .get("/next-trains/rers/A/chatelet+les+halles")
      .expect(200);
    expect(response.body.routes.length).toBe(2);
  });
  it("should return 'TAXE' missions for chatelet", async () => {
    const response = await api
      .get("/next-trains/rers/A/chatelet+les+halles?missions=TAXE")
      .expect(200);
    expect(response.body.routes.length).toBe(1);
  });
});
