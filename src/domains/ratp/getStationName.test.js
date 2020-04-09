const { getStationName } = require("./getStationName");
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
    "should convert '$station' into '$expectedResult'",
    ({ network, line, station, expectedResult }) => {
      const actualResult = getStationName(network, line, station);
      expect(actualResult).toEqual(expectedResult);
    }
  );
});
