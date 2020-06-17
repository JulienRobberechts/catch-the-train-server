const { getMissionWay } = require("./getMissionWay");
const each = require("jest-each").default;

describe("MissionWay", () => {
  describe("getMissionWay", () => {
    each([
      ["X", "X", null],
      ["W", "X", null],
      ["X", "E", "forward"],
      ["E", "X", "backward"],
      ["U", "N", "forward"],
      ["U", "I", "forward"],
      ["D", "M", "backward"],
      ["S", "Y", "backward"],
    ]).test(
      "should return for missions '%s-%s' way=%s",
      (originLetter, destinationLetter, expectedWay) => {
        const actualWay = getMissionWay(
          "rers",
          "A",
          originLetter,
          destinationLetter
        );
        expect(actualWay).toEqual(expectedWay);
      }
    );
  });
});
