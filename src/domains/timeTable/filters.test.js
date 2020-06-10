const { checkParameterStation } = require("./checkParameter");
const each = require("jest-each").default;
const { ValidationError } = require("../../utils/errors");
const { routesByRatpMissions } = require("./filters");

describe.only("routesByRatpMissions", () => {
  each([
    [null, { mission: "MIS1", message: "21:46" }, true],
    [["MIS1"], { mission: "MIS1", message: "21:46" }, true],
    [["MIS1", "MIS2"], { mission: "MIS1", message: "21:46" }, true],
    [["MIS1", "MIS2"], { mission: "Mis1", message: "21:46" }, true],
    [["MIS1", "MIS2"], { mission: "MIS2", message: "21:46" }, true],
    [["MIS1", "MIS2"], { mission: "MIS3", message: "21:46" }, false],
    [["MIS2"], { mission: "MIS1", message: "21:46" }, false],
  ]).it(
    "%#. RATP mission filter %s should work on %s",
    (missions, departure, expectedResult) => {
      const actualResult = routesByRatpMissions(missions)(departure);
      expect(actualResult).toBe(expectedResult);
    }
  );
});
