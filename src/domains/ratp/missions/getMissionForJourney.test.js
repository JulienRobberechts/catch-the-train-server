const getMissionForJourney = require("./getMissionForJourney");
const each = require("jest-each").default;

const CergyToMaisonsLaffitte = ["NANI", "NATO", "QYAN", "QYLT"];

const { missionsRepositoryMocked } = require("../../../adapters/ratp-api");

describe("getMissionForJourney", () => {
  each`
    network     | line    | fromStation                 | toStation              | expectedResult
    ${null}     | ${null} | ${null}                     | ${null}                | ${null}
    ${"rers"}   | ${null} | ${null}                     | ${null}                | ${null}
    ${"rers"}   | ${"A"}  | ${null}                     | ${null}                | ${null}
  `.it(
    "should return null in case of invalid input",
    async ({ network, line, fromStation, toStation, expectedResult }) => {
      const actualResult = await getMissionForJourney(
        missionsRepositoryMocked.getMissionDetail,
        network,
        line,
        fromStation,
        toStation,
        ["NANI", "NATO", "QYAN", "QYLT"]
      );
      expect(actualResult).toEqual(expectedResult);
    }
  );

  each`
    fromStation                 | toStation              | expectedResult
    ${"cergy+st+christophe"}    | ${"maisons+laffitte"}  | ${CergyToMaisonsLaffitte}
  `.it(
    "should get mission for  '$fromStation'-> '$toStation' = '$expectedResult'",
    async ({ network, line, fromStation, toStation, expectedResult }) => {
      const actualResult = await getMissionForJourney(
        missionsRepositoryMocked.getMissionDetail,
        "rers",
        "A",
        fromStation,
        toStation,
        ["NANI", "NATO", "QYAN", "QYLT"]
      );
      expect(actualResult).toEqual(expectedResult);
    }
  );

  it("should get mission for cergy+st+christophe / maisons+laffitte", async () => {
    const fromStation = "cergy+st+christophe";
    const toStation = "maisons+laffitte";
    const expectedResult = CergyToMaisonsLaffitte;
    const actualResult = await getMissionForJourney(
      missionsRepositoryMocked.getMissionDetail,
      "rers",
      "A",
      fromStation,
      toStation,
      ["NANI", "NATO", "QYAN", "QYLT"]
    );
    expect(actualResult).toEqual(expectedResult);
  });
});
