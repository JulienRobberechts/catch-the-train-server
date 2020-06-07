const {
  checkParameterNetwork,
  checkParameterLine,
  checkParameterStation,
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
  ]).it(
    "should check station '%s/%s/%s' as valid",
    (network, line, station) => {
      checkParameterStation(network, line, station);
    }
  );
  each([
    [null, null, null],
    ["rers", null, null],
    ["rers", "A", undefined],
    ["rers", "A", null],
    ["rers", "A", ""],
    ["rers", "A", " "],
    ["rers", "A", "Le Vesinet - centre"],
    ["rers", "A", "Noisy le Grand-Mont d'Est"],
  ]).it(
    "should check station '%s/%s/%s' as invalid",
    (network, line, station) => {
      const check = () => checkParameterStation(network, line, station);
      expect(check).toThrow(ValidationError);
    }
  );
});

describe("checkParameterLine", () => {
  each([
    ["rers", "A"],
    ["rers", "a"],
  ]).it("should check line '%s/%s' as valid", (network, line) => {
    checkParameterLine(network, line);
  });
  each([
    [null, null],
    ["rers", null],
    ["rers", "Z"],
  ]).it("should check line '%s/%s' as invalid", (network, line) => {
    const check = () => checkParameterLine(network, line);
    expect(check).toThrow(ValidationError);
  });
});

describe("checkParameterNetwork", () => {
  each([["rers"], ["RERS"]]).it(
    "should check transport network '%s' as valid",
    (network) => {
      checkParameterNetwork(network);
    }
  );
  each([[null], ["rer"], ["bus"]]).it(
    "should check transport network '%s' as invalid",
    (network) => {
      const check = () => checkParameterNetwork(network);
      expect(check).toThrow(ValidationError);
    }
  );
});
