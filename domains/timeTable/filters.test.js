const { checkParameterStation } = require("./checkParameter");
const each = require("jest-each").default;
const { ValidationError } = require("../../utils/errors");
const { routesByMissions } = require("./filters");

describe.only("routesByMissions", () => {
  each([
    [null, { code: "MIS1", message: "21:46" }, true],
    [["MIS1"], { code: "MIS1", message: "21:46" }, true],
    [["MIS1", "MIS2"], { code: "MIS1", message: "21:46" }, true],
    [["MIS1", "MIS2"], { code: "MIS2", message: "21:46" }, true],
    [["MIS1", "MIS2"], { code: "MIS3", message: "21:46" }, false],
    [["MIS2"], { code: "MIS1", message: "21:46" }, false],
  ]).it(
    "%#. should check filter %s %s",
    (missions, departure, expectedResult) => {
      // console.log("missions", missions);
      // console.log("departure.code", departure.code.toUpperCase());
      // console.log(
      //   "missions.includes(departure.code);",
      //   missions.includes(departure.code.toUpperCase())
      // );

      // const pets = ["MIS1, MIS2"];
      // console.log("pets includes cat", pets.includes("MIS1"));

      const actualResult = routesByMissions(missions)(departure);
      expect(actualResult).toBe(expectedResult);
    }
  );
});
