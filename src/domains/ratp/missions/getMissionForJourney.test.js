const getMissionForJourney = require("./getMissionForJourney");
const each = require("jest-each").default;

const CergyToMaisonsLaffitte = ["NANI", "NATO", "QYAN", "QYLT"];

const { missionsRepositoryMocked } = require("../../../repositories/ratp-api");

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
        missionsRepositoryMocked,
        network,
        line,
        fromStation,
        toStation,
        [
          { missionCode: "NANI" },
          { missionCode: "NATO" },
          { missionCode: "QYAN" },
          { missionCode: "QYLT" },
        ]
      );
      expect(actualResult).toEqual(expectedResult);
    }
  );

  it("should get mission for cergy+st+christophe / maisons+laffitte", async () => {
    const fromStation = "cergy+st+christophe";
    const toStation = "maisons+laffitte";
    const expectedResult = CergyToMaisonsLaffitte;
    const actualResult = await getMissionForJourney(
      missionsRepositoryMocked,
      "rers",
      "A",
      fromStation,
      toStation,
      [
        { missionCode: "NANI" },
        { missionCode: "NATO" },
        { missionCode: "QYAN" },
        { missionCode: "QYLT" },
      ]
    );
    expect(actualResult).toEqual(expectedResult);
  });
});
