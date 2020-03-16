const { routesByDepartureStation } = require("./filters");
const each = require("jest-each").default;

describe("filter routesByDepartureStation", () => {
  each([
    [undefined, "le-vesinet-le-pecq"],
    [null, "le-vesinet-le-pecq"],
    ["", "le-vesinet-le-pecq"],
    ["le-vesinet-le-pecq", "le-vesinet-le-pecq"]
  ]).it("should match the route %s and %s", (a, b) => {
    const result = routesByDepartureStation(a)({
      station: { code: b }
    });
    expect(result).toEqual(true);
  });

  each([["le-vesinet", "le-vesinet-le-pecq"]]).it(
    "should not match the route %s and %s",
    (a, b) => {
      const result = routesByDepartureStation(a)({
        station: { code: b }
      });
      expect(result).toEqual(false);
    }
  );
});
