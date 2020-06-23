const { getSchedulesForMissions } = require("./getMissionForJourney");
const each = require("jest-each").default;

const { missionsRepositoryMocked } = require("../../../repositories/ratp-api");

describe("SchedulesForMissions", () => {
  const UPAC1 = {
    destination: {
      name: "Cergy-Le-Haut",
      slug: "cergy+le+haut",
      letter: "U",
      order: 1,
      section: "A3",
    },
    missionCode: "UPAC",
    origin: {
      name: "Marne la Vallee-Chessy",
      slug: "marne+la+vallee+chessy",
      letter: "Q",
      order: 28,
      section: "A4",
    },
    _testCase:
      "Mission type Standard backward from Marne la Vallee-Chessy to Cergy-Le-Haut",
    type: 1,
    way: "backward",
  };

  const YOZZ2 = {
    destination: {
      name: "Rueil Malmaison",
      slug: "rueil+malmaison",
      letter: "Y",
      order: 7,
      section: "A1",
    },
    missionCode: "YOZZ",
    origin: {
      name: "Torcy",
      slug: "torcy",
      letter: "O",
      order: 25,
      section: "A4",
    },
    _testCase: "Mission type Special backward from Torcy to Rueil Malmaison",
    type: 2,
    way: "backward",
  };

  const TOZZ2 = {
    _testCase: "Mission type Special backward from Torcy to Poissy",
    destination: {
      name: "Poissy",
      slug: "poissy",
      letter: "T",
      order: 5,
      section: "A5",
    },
    missionCode: "TOZZ",
    origin: {
      name: "Torcy",
      slug: "torcy",
      letter: "O",
      order: 25,
      section: "A4",
    },
    type: 2,
    way: "backward",
  };

  const EXZZ2 = {
    _testCase: "Mission type Special forward from Vesinet to Joinville le Pont",
    destination: {
      name: "Joinville le Pont",
      slug: "joinville+le+pont",
      letter: "E",
      order: 20,
      section: "A2",
    },
    missionCode: "EXZZ",
    origin: {
      name: "Le Vesinet le Pecq",
      slug: "le+vesinet+le+pecq",
      letter: "X",
      order: 4,
      section: "A1",
    },
    type: 2,
    way: "forward",
  };

  const WEWX3 = {
    _testCase:
      "Mission type NonCommercial forward from Vesinet to Joinville le Pont",
    destination: {
      name: "Joinville le Pont",
      slug: "joinville+le+pont",
      letter: "E",
      order: 20,
      section: "A2",
    },
    missionCode: "WEWX",
    origin: {
      name: "Le Vesinet le Pecq",
      slug: "le+vesinet+le+pecq",
      letter: "X",
      order: 4,
      section: "A1",
    },
    type: 3,
    way: "forward",
  };

  describe("getSchedulesForMissions", () => {
    each([
      ["UPAC", UPAC1],
      ["YOZZ", YOZZ2],
      ["TOZZ", TOZZ2],
      ["EXZZ", EXZZ2],
    ]).test("should get schedule for missions %s", async (name, mission) => {
      const result = await getSchedulesForMissions(missionsRepositoryMocked, [
        mission,
      ]);
      expect({ mission, result }).toMatchSnapshot();
    });

    test("should NOT get schedule for missions non commercial missions", async () => {
      const invalidCall = async () => {
        await getSchedulesForMissions(missionsRepositoryMocked, [WEWX3]);
      };
      expect(invalidCall()).rejects.toEqual(
        new Error("The mission list contains non commercial missions!")
      );
    });
  });
});
