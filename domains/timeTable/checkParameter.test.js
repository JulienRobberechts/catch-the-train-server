const {
  checkParameterType,
  checkParameterLine,
  checkParameterStation,
  checkParameterMissions,
} = require("./checkParameter");
const each = require("jest-each").default;
const { ValidationError } = require("../../utils/errors");

describe("checkParameterStation", () => {
  each([
    ["rers", "A", "cergy+prefecture"],
    ["rers", "A", "fontenay+sous+bois"],
    ["rers", "A", "Le+Vesinet+centre"],
    ["rers", "A", "noisy+le+grand+mont+d'est"],
    ["rers", "A", "Noisiel"],
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
    ["rers", "A", "Noisy le Grand-Mont d'Est"],
  ]).it("should check station '%s/%s/%s' as invalid", (type, line, station) => {
    const check = () => checkParameterStation(type, line, station);
    expect(check).toThrow(ValidationError);
  });
});

describe("checkParameterLine", () => {
  each([
    ["rers", "A"],
    ["rers", "a"],
  ]).it("should check line '%s/%s' as valid", (type, line) => {
    checkParameterLine(type, line);
  });
  each([
    [null, null],
    ["rers", null],
    ["rers", "Z"],
  ]).it("should check line '%s/%s' as invalid", (type, line) => {
    const check = () => checkParameterLine(type, line);
    expect(check).toThrow(ValidationError);
  });
});

describe("checkParameterType", () => {
  each([["rers"], ["RERS"]]).it(
    "should check transport type '%s' as valid",
    (type) => {
      checkParameterType(type);
    }
  );
  each([[null], ["rer"], ["bus"]]).it(
    "should check transport type '%s' as invalid",
    (type) => {
      const check = () => checkParameterType(type);
      expect(check).toThrow(ValidationError);
    }
  );
});

describe("checkParameterMissions", () => {
  each([
    ["rers", "A", null],
    ["rers", "A", undefined],
    ["rers", "A", ""],
    ["rers", "A", ["NANI"]],
    ["rers", "A", ["QIKI"]],
    ["rers", "A", ["NANI", "QIKI"]],
  ]).it("should check missions '%s/%s/%s' as valid", (type, line, missions) => {
    checkParameterMissions(type, line, missions);
  });
  each([
    [null, null, null],
    ["rers", null, null],
    ["rers", "A", ["ERRO"]],
    ["rers", "A", ["NANI", "ERRO"]],
  ]).it(
    "should check missions '%s/%s/%s' as invalid",
    (type, line, missions) => {
      const check = () => checkParameterMissions(type, line, missions);
      expect(check).toThrow(ValidationError);
    }
  );
});
