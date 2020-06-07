const getMissionForJourney = require("./getMissionForJourney");
const each = require("jest-each").default;

const CergyToMaisonsLaffitte = ["NANI", "NATO", "QYAN", "QYLT"];

describe("getMissionForJourney", () => {
  each`
    network     | line    | fromStation                 | toStation              | expectedResult
    ${null}     | ${null} | ${null}                     | ${null}                | ${null}
    ${"rers"}   | ${null} | ${null}                     | ${null}                | ${null}
    ${"rers"}   | ${"A"}  | ${null}                     | ${null}                | ${null}
  `.it(
    "should return null in case of invalid input",
    ({ network, line, fromStation, toStation, expectedResult }) => {
      const actualResult = getMissionForJourney(
        network,
        line,
        fromStation,
        toStation
      );
      expect(actualResult).toEqual(expectedResult);
    }
  );

  each`
    fromStation                 | toStation              | expectedResult
    ${"cergy+st+christophe"}    | ${"maisons+laffitte"}  | ${CergyToMaisonsLaffitte}
  `.it(
    "should get mission for  '$fromStation'-> '$toStation' = '$expectedResult'",
    ({ network, line, fromStation, toStation, expectedResult }) => {
      const actualResult = getMissionForJourney(
        "rers",
        "A",
        fromStation,
        toStation
      );
      expect(actualResult).toEqual(expectedResult);
    }
  );
});
