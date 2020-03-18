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
  ]).it("should check '%s' as invalid", station => {
    const check = () => checkParameterStation(station);
    expect(check).toThrow(ValidationError);
  });
});

describe("checkParameterDestination", () => {
  each([
    ["whatever", "le-vesinet-centre"],
    ["whatever", "charles-de-gaulle-etoile"],
    ["whatever", "nation"],
    ["whatever", "gare-de-vincennes"]
  ]).it("should check '%s' as valid", (station, destination) => {
    checkParameterDestination(station, destination);
  });
  each([
    ["whatever", undefined],
    ["whatever", null],
    ["whatever", ""],
    ["whatever", " "],
    ["whatever", "Le Vesinet - centre"],
    ["whatever", "invalid-station"]
  ]).it("should check '%2' as invalid", (station, destination) => {
    const check = () => checkParameterDestination(station, destination);
    expect(check).toThrow(ValidationError);
  });
});
