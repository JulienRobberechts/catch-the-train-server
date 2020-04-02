const { checkParameterStation } = require("./checkParameter");
const each = require("jest-each").default;
const { ValidationError } = require("../../utils/errors");
const { routesByMissions } = require("./filters");

describe("routesByMissions", () => {
  each([
    [null, { code: "TAXE", message: "21:46" }, true],
    [["TAXE"], { code: "TAXE", message: "21:46" }, true],
    [["NONE"], { code: "TAXE", message: "21:46" }, false]
  ]).it("%#. should check filter", (missions, departure, expectedResult) => {
    const actualResult = routesByMissions(missions)(departure);
    expect(actualResult).toBe(expectedResult);
  });
});
