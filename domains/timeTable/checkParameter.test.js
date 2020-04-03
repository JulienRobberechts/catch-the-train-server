const { checkParameterStation } = require("./checkParameter");
const each = require("jest-each").default;
const { ValidationError } = require("../../utils/errors");

describe("checkParameterStation", () => {
  each([
    ["rers", "A", "cergy+prefecture"],
    ["rers", "A", "fontenay+sous+bois"],
    ["rers", "A", "Le+Vesinet+centre"],
    ["rers", "A", "noisy+le+grand+mont+d'est"],
    ["rers", "A", "Noisiel"]
  ]).it("should check '%s/%s/%s' as valid", (type, line, station) => {
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
  ]).it("should check '%s' as invalid", (type, line, station) => {
    const check = () => checkParameterStation(type, line, station);
    expect(check).toThrow(ValidationError);
  });
});
