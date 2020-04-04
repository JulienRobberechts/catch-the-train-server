const { checkParameterStation } = require("./checkParameter");
const each = require("jest-each").default;
const { ValidationError } = require("../../utils/errors");
const { routesByMissions } = require("./filters");

describe("routesByMissions", () => {
  each([
    [null, { code: "MIS1", message: "21:46" }, true],
    [["MIS1"], { code: "MIS1", message: "21:46" }, true],
    [["MIS2"], { code: "MIS1", message: "21:46" }, false],
  ]).it("%#. should check filter", (missions, departure, expectedResult) => {
    const actualResult = routesByMissions(missions)(departure);
    expect(actualResult).toBe(expectedResult);
  });
});
