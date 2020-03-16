const { routesByDestination } = require("./filters");
const each = require("jest-each").default;

describe("filter routesByDestination", () => {
  each([
    [undefined, "le-vesinet-le-pecq"],
    [null, "le-vesinet-le-pecq"],
    ["", "le-vesinet-le-pecq"],
    ["le-vesinet-le-pecq", "le-vesinet-le-pecq"]
  ]).it(
    "should recognize valid routes query '%s' matches '%s'",
    (query, data) => {
      const result = routesByDestination(query)({
        destinations: [data, "other"]
      });
      expect(result).toEqual(true);
    }
  );

  each([
    ["paris", "le-vesinet-le-pecq"],
    ["le-vesinet", "le-vesinet-le-pecq"]
  ]).it(
    "should recognize invalid routes query '%s' do not match '%s'",
    (query, data) => {
      const result = routesByDestination(query)({
        destinations: [data, "other"]
      });
      expect(result).toEqual(false);
    }
  );
});
