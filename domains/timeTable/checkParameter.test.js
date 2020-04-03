const {
  checkParameterType,
  checkParameterLine,
  checkParameterStation
} = require("./checkParameter");
const each = require("jest-each").default;
const { ValidationError } = require("../../utils/errors");

describe("checkParameterStation", () => {
  each([
    ["rers", "A", "cergy+prefecture"],
    ["rers", "A", "fontenay+sous+bois"],
    ["rers", "A", "Le+Vesinet+centre"],
    ["rers", "A", "noisy+le+grand+mont+d'est"],
    ["rers", "A", "Noisiel"]
  ]).it("should check station '%s/%s/%s' as valid", (type, line, station) => {
    checkParameterStation(type, line, station);
  });
  each([
    [null, null, null],
    ["rers", null, null],
    ["rers", "A", undefined],
    ["rers", "A", null],
    ["rers", "A", ""],
    ["rers", "A", " "],
    ["rers", "A", "Le Vesinet - centre"],
    ["rers", "A", "Noisy le Grand-Mont d'Est"]
  ]).it("should check station '%s/%s/%s' as invalid", (type, line, station) => {
    const check = () => checkParameterStation(type, line, station);
    expect(check).toThrow(ValidationError);
  });
});

describe("checkParameterLine", () => {
  each([
    ["rers", "A"],
    ["rers", "a"]
  ]).it("should check line '%s/%s' as valid", (type, line) => {
    checkParameterLine(type, line);
  });
  each([
    [null, null],
    ["rers", null],
    ["rers", "Z"]
  ]).it("should check line '%s/%s' as invalid", (type, line) => {
    const check = () => checkParameterLine(type, line);
    expect(check).toThrow(ValidationError);
  });
});

describe("checkParameterType", () => {
  each([["rers"], ["RERS"]]).it(
    "should check transport type '%s' as valid",
    type => {
      checkParameterType(type);
    }
  );
  each([[null], ["rer"], ["bus"]]).it(
    "should check transport type '%s' as invalid",
    type => {
      const check = () => checkParameterType(type);
      expect(check).toThrow(ValidationError);
    }
  );
});
