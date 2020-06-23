const {
  matchTime,
  matchOnPlatform,
  matchApproaching,
  matchTerminus,
  matchDeparture,
  matchPlatformLabel,
  matchNoPassenger,
} = require("./match-ratp-display");
const each = require("jest-each").default;

describe("matchTime", () => {
  each([
    ["2020-03-10T09:22:30+01:00", "09:27", "2020-03-10T09:27:00+01:00"],
    ["2020-03-10T09:22:30+01:00", "19:08", "2020-03-10T19:08:00+01:00"],
    ["2020-03-10T09:22:30+01:00", "05:22", "2020-03-11T05:22:00+01:00"],
    [
      "2020-03-10T09:22:30+01:00",
      "09:31 Départ V.2",
      "2020-03-10T09:31:00+01:00",
    ],
    ["2020-03-10T09:22:30+01:00", "15H16", undefined],
    ["2020-03-10T09:22:30+01:00", "xxx", undefined],
    ["2020-03-10T09:22:30+01:00", "Train à l'approche", undefined],
    ["2020-03-10T09:22:30+01:00", "Train à quai", undefined],
  ]).it("at %s should convert '%s'", (now, msg, expectedResult) => {
    const actualResult = matchTime(now, msg);
    expect(actualResult).toEqual(expectedResult);
  });

  each([
    [null, undefined],
    [null, ""],
    ["2020-03-10T09:22:30+01:00", null],
    ["2020-03-10T09:22:30+01:00", "15:89"],
    ["2020-03-10T09:22:30+01:00", "29:09"],
  ]).it("at %s should throw an exception for '%s'", (now, msg) => {
    const matchOperation = () => matchTime(now, msg);
    expect(matchOperation).toThrow();
  });
});

describe("matchOnPlatform", () => {
  each([
    ["Train à quai", true],
    ["Train à l'approche", undefined],
    ["à l'approche", undefined],
    ["à quai", true],
    ["A quai", true],
    ["A QUAI", true],
  ]).it("should convert '%s' into OnPlatform='%s'", (msg, expectedResult) => {
    const actualResult = matchOnPlatform(msg);
    expect(actualResult).toEqual(expectedResult);
  });
});

describe("matchApproaching", () => {
  each([
    ["Train à l'approche", true],
    ["à l'approche", true],
    ["Train à quai", undefined],
    ["A l'approche", true],
    ["A L'approche", true],
    ["A L APPROCHE", true],
  ]).it("should convert '%s' into Approaching='%s'", (msg, expectedResult) => {
    const actualResult = matchApproaching(msg);
    expect(actualResult).toEqual(expectedResult);
  });
});

describe("matchTerminus", () => {
  each([
    ["Train terminus", true],
    ["terminus", true],
    ["Terminus", true],
    ["TERMINUS", true],
    ["Depart", undefined],
    ["Train", undefined],
  ]).it("should convert '%s' into Terminus='%s'", (msg, expectedResult) => {
    const actualResult = matchTerminus(msg);
    expect(actualResult).toEqual(expectedResult);
  });
});

matchDeparture;

describe("matchDeparture", () => {
  each([
    ["09:31 Départ Voie 2", true],
    ["Départ voie A", true],
    ["depart", true],
    ["DEPART", true],
  ]).it("should convert '%s' into Departure='%s'", (msg, expectedResult) => {
    const actualResult = matchDeparture(msg);
    expect(actualResult).toEqual(expectedResult);
  });
});

describe("matchPlatformLabel", () => {
  each([
    ["V.2", "2"],
    ["V.A", "A"],
    ["Voie 1", "1"],
    ["voie 3", "3"],
    ["Voie B", "B"],
    ["voyageurs", undefined],
  ]).it(
    "should convert '%s' into PlatformLabel='%s'",
    (msg, expectedResult) => {
      const actualResult = matchPlatformLabel(msg);
      expect(actualResult).toEqual(expectedResult);
    }
  );
});

"Sans voyageurs V.1",
  describe("matchNoPassenger", () => {
    each([
      ["Sans voyageurs V.1", true],
      ["Sans voyageurs", true],
      ["sans voyageurs", true],
      ["voyageurs", undefined],
      ["sans", undefined],
      ["Supprimé", true],
      ["supprimé", true],
    ]).it(
      "should convert '%s' into NoPassenger='%s'",
      (msg, expectedResult) => {
        const actualResult = matchNoPassenger(msg);
        expect(actualResult).toEqual(expectedResult);
      }
    );
  });
