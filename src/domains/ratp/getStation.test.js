const { getStationName, getStation } = require("./getStation");
const each = require("jest-each").default;

describe("getStationName", () => {
  each`
    network     | line    | station                     | expectedResult
    ${null}     | ${null} | ${null}                     | ${null}
    ${"rers"}   | ${null} | ${null}                     | ${null}
    ${"rers"}   | ${"A"}  | ${null}                     | ${null}
    ${"rers"}   | ${"A"}  | ${"maisons+laffitte"}       | ${"Maisons-Laffitte"}
    ${"rers"}   | ${"A"}  | ${"st+germain+en+laye"}     | ${"St Germain en Laye"}
    ${"rers"}   | ${"A"}  | ${"CHATELET+LES+HALLES"}    | ${"Chatelet-Les-Halles"}
  `.it(
    "should get stationName with name '$station'",
    ({ network, line, station, expectedResult }) => {
      const actualResult = getStationName(network, line, station);
      expect(actualResult).toEqual(expectedResult);
    }
  );
});

describe("getStation", () => {
  each([
    [
      "rers",
      "A",
      "maisons+laffitte",
      {
        slug: "maisons+laffitte",
        name: "Maisons-Laffitte",
        order: 7,
        section: "A35",
      },
    ],
    [
      "rers",
      "A",
      "grande+arche+la+defense",
      {
        slug: "grande+arche+la+defense",
        name: "Grande Arche la Defense",
        letter: "B",
        order: 11,
        section: "A0",
      },
    ],
  ]).it(
    "should get station with name '/%s/%s/%s'",
    (network, line, stationSlug, expectedStation) => {
      const actualResult = getStation(network, line, stationSlug);
      expect(actualResult).toEqual(expectedStation);
    }
  );
});
