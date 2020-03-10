const request = require("supertest");
const debug = require("debug")("ctt:test");

const app = require("../app");
const api = request(app);

describe("GET /schedules", () => {
  it("should return the static schedules", async () => {
    const response = await api.get("/schedules").expect(200);
    debug('/schedules body2', response.body);
    expect(response.body.nextDeparture.time).toEqual('2020-03-09T18:43:52+00:00');
  });
});
