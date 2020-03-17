const {
  checkParameterStation,
  checkParameterDestination
} = require("./checkParameter");
const each = require("jest-each").default;
const { ValidationError } = require("../../utils/errors");

describe("checkParameterStation", () => {
  each([
    ["le-vesinet-centre"],
    ["charles-de-gaulle-etoile"],
    ["nation"],
    ["gare-de-vincennes"]
  ]).it("should check '%s' as valid", station => {
    checkParameterStation(station);
  });
  each([
    [undefined],
    [null],
    [""],
    [" "],
    ["Le Vesinet - centre"],
    ["invalid-station"]
  ]).it("should check '%s' as valid", station => {
    const check = () => checkParameterStation(station);
    expect(check).toThrow(ValidationError);
  });
});
