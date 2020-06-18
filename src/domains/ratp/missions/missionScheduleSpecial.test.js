const {
  getSchedulesForASpecialMission,
  getSectionsForMission,
  getNextSections,
  getPreviousSections,
} = require("./missionScheduleSpecial");
const each = require("jest-each").default;

const HBZZ = {
  mission: {
    type: 2,
    missionCode: "HBZZ",
    origin: {
      name: "Grande Arche la Defense",
      slug: "grande+arche+la+defense",
      letter: "B",
      order: 11,
      section: "A0",
    },
    destination: {
      name: "Nation",
      slug: "nation",
      letter: "H",
      order: 16,
      section: "A0",
    },
    way: "forward",
  },
  expectedSections: ["A0"],
  expectedSchedule: [
    "grande+arche+la+defense",
    "charles+de+gaulle+etoile",
    "auber",
    "chatelet+les+halles",
    "gare+de+lyon",
    "nation",
  ],
};
const YOZZ = {
  mission: {
    missionCode: "YOZZ",
    origin: {
      name: "Torcy",
      slug: "torcy",
      letter: "O",
      order: 25,
      section: "A4",
    },
    destination: {
      name: "Rueil Malmaison",
      slug: "rueil+malmaison",
      letter: "Y",
      order: 7,
      section: "A1",
    },
    way: "backward",
  },
  expectedSections: ["A4", "A0", "A1"],
  expectedSchedule: [
    "torcy",
    "lognes",
    "noisiel",
    "noisy+champs",
    "noisy+le+grand+mont+d'est",
    "bry+sur+marne",
    "neuilly+plaisance",
    "val+de+fontenay",
    "vincennes",
    "nation",
    "gare+de+lyon",
    "chatelet+les+halles",
    "auber",
    "charles+de+gaulle+etoile",
    "grande+arche+la+defense",
    "nanterre+prefecture",
    "nanterre+universite",
    "nanterre+ville",
    "rueil+malmaison",
  ],
};
const TOZZ = {
  mission: {
    missionCode: "TOZZ",
    origin: {
      name: "Torcy",
      slug: "torcy",
      letter: "O",
      order: 25,
      section: "A4",
    },
    destination: {
      name: "Poissy",
      slug: "poissy",
      letter: "T",
      order: 5,
      section: "A5",
    },
    way: "backward",
  },
  expectedSections: ["A4", "A0", "A35", "A5"],
  expectedSchedule: [
    "torcy",
    "lognes",
    "noisiel",
    "noisy+champs",
    "noisy+le+grand+mont+d'est",
    "bry+sur+marne",
    "neuilly+plaisance",
    "val+de+fontenay",
    "vincennes",
    "nation",
    "gare+de+lyon",
    "chatelet+les+halles",
    "auber",
    "charles+de+gaulle+etoile",
    "grande+arche+la+defense",
    "nanterre+prefecture",
    "houilles",
    "sartrouville",
    "maisons+laffitte",
    "acheres+grand+cormier",
    "poissy",
  ],
};
const BNZZ = {
  mission: {
    missionCode: "BNZZ",
    origin: {
      name: "Boissy Saint Leger",
      slug: "boissy+saint+leger",
      letter: "N",
      order: 26,
      section: "A2",
    },
    destination: {
      name: "Grande Arche la Defense",
      slug: "grande+arche+la+defense",
      letter: "B",
      order: 11,
      section: "A0",
    },
    way: "backward",
  },
  expectedSections: ["A2", "A0"],
  expectedSchedule: [
    "boissy+saint+leger",
    "sucy+bonneuil",
    "la+varenne+chennevieres",
    "champigny",
    "le+parc+de+saint+maur",
    "saint+maur+creteil",
    "joinville+le+pont",
    "nogent+sur+marne",
    "fontenay+sous+bois",
    "vincennes",
    "nation",
    "gare+de+lyon",
    "chatelet+les+halles",
    "auber",
    "charles+de+gaulle+etoile",
    "grande+arche+la+defense",
  ],
};

const missions = [
  ["HBZZ", HBZZ],
  ["YOZZ", YOZZ],
  ["TOZZ", TOZZ],
  ["BNZZ", BNZZ],
];

const invalidMissions = [
  ["1", {}],
  ["2", { mission: {} }],
  ["3", { mission: { type: 1 } }],
  ["4", { mission: { type: 2 } }],
  ["5", { mission: { type: 2, way: "forward", origin: {}, destination: {} } }],
  ["5", { mission: { type: 2, way: "forward", origin: {}, destination: {} } }],
  [
    "6",
    {
      mission: {
        type: 2,
        way: "forward",
        origin: { order: 1 },
        destination: { order: 2 },
      },
    },
  ],
  [
    "7",
    {
      mission: {
        type: 2,
        way: "forward",
        origin: { section: "A1" },
        destination: { section: "A1" },
      },
    },
  ],
  [
    "8",
    {
      mission: {
        type: 1,
        way: "forward",
        origin: { order: 1, section: "A1" },
        destination: { order: 2, section: "A1" },
      },
    },
  ],
  [
    "9",
    {
      mission: {
        type: 2,
        origin: { order: 1, section: "A1" },
        destination: { order: 1, section: "A1" },
      },
    },
  ],
  [
    "10",
    {
      mission: {
        type: 2,
        way: "forward",
        origin: { order: 1, section: "A1" },
        destination: { order: 1, section: "A1" },
      },
    },
  ],
];

describe("Missions schedule Special", () => {
  describe("getSchedulesForASpecialMission", () => {
    each(missions).test.skip(
      "should return schedule for mission %s",
      (missionCode, { mission, expectedSchedule }) => {
        const actualResult = getSchedulesForASpecialMission(mission);
        expect(actualResult.mission).toBe(missionCode);
        expect(actualResult.stations).toEqual(expectedSchedule);
      }
    );

    each(invalidMissions).test(
      "should return error for invalid mission %s",
      (testCase, { mission }) => {
        const invalidCall = () => getSchedulesForASpecialMission(mission);
        expect(invalidCall).toThrow();
      }
    );
  });
  describe("getSectionsForMission", () => {
    each(missions).test(
      "should return sections for mission %s",
      (missionCode, { mission, expectedSections }) => {
        const actualResult = getSectionsForMission(
          [],
          mission.origin.section,
          mission.way,
          mission.destination.section
        );
        expect(actualResult).toEqual(expectedSections);
      }
    );
  });

  describe("getNextSections", () => {
    each([
      ["A0", ["A2", "A4"]],
      ["A1", ["A0"]],
      ["A2", []],
      ["A3", ["A35"]],
      ["A4", []],
      ["A5", ["A35"]],
      ["A35", ["A0"]],
    ]).test(
      "should return next sections for section %s",
      (section, expectedSections) => {
        const actualResult = getNextSections(section);
        expect(actualResult).toEqual(expectedSections);
      }
    );
  });

  describe("getNextSections", () => {
    each([
      ["A0", ["A35", "A1"]],
      ["A1", []],
      ["A2", ["A0"]],
      ["A3", []],
      ["A4", ["A0"]],
      ["A5", []],
      ["A35", ["A3", "A5"]],
    ]).test(
      "should return previous sections for section %s",
      (section, expectedSections) => {
        const actualResult = getPreviousSections(section);
        expect(actualResult).toEqual(expectedSections);
      }
    );
  });
});
