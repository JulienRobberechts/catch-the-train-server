const { getMissionWay } = require("./getMissionWay");
const each = require("jest-each").default;

describe("MissionWay", () => {
  describe("getMissionWay", () => {
    each([
      [null, null],
      [{}, null],
      [{ origin: null }, null],
      [{ destination: null }, null],
      [{ origin: null, destination: null }, null],
      [{ origin: {}, destination: {} }, null],
      [{ origin: { order: 1 }, destination: { order: 2 } }, "forward"],
      [{ origin: { order: 2 }, destination: { order: 1 } }, "backward"],
    ]).test(
      "should return for missions '%s-%s' way=%s",
      (missionDetails, expectedWay) => {
        const actualWay = getMissionWay(missionDetails);
        expect(actualWay).toEqual(expectedWay);
      }
    );
  });
});
