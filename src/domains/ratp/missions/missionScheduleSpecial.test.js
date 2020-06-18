const { getSchedulesForASpecialMission } = require("./missionScheduleSpecial");
const each = require("jest-each").default;

const sectionA3 = [
  "cergy+le+haut",
  "cergy+st+christophe",
  "cergy+prefecture",
  "neuville+universite",
  "conflans+fin+d'oise",
  "acheres+ville",
];

const sectionA35 = ["maisons+laffitte", "sartrouville", "houilles"];

const sectionA0 = [
  "nanterre+prefecture",
  "grande+arche+la+defense",
  "charles+de+gaulle+etoile",
  "auber",
  "chatelet+les+halles",
  "gare+de+lyon",
  "nation",
  "vincennes",
];

const sectionA2 = [
  "fontenay+sous+bois",
  "nogent+sur+marne",
  "joinville+le+pont",
  "saint+maur+creteil",
  "le+parc+de+saint+maur",
  "champigny",
  "la+varenne+chennevieres",
  "sucy+bonneuil",
  "boissy+saint+leger",
];

const sectionA5 = ["poissy", "acheres+grand+cormier"];

const sectionA1 = [
  "st+germain+en+laye",
  "le+vesinet+le+pecq",
  "le+vesinet+centre",
  "chatou+croissy",
  "rueil+malmaison",
  "nanterre+ville",
  "nanterre+universite",
];

const sectionA4 = [
  "val+de+fontenay",
  "neuilly+plaisance",
  "bry+sur+marne",
  "noisy+le+grand+mont+d'est",
  "noisy+champs",
  "noisiel",
  "lognes",
  "torcy",
  "bussy+st+georges",
  "val+d'europe+serris",
  "marne+la+vallee+chessy",
];

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
  // ["YOZZ", YOZZ],
  // ["TOZZ", TOZZ],
  // ["BNZZ", BNZZ],
];

const invalidMissions = [
  ["1", {}],
  ["2", { mission: {} }],
  ["3", { mission: { type: 1 } }],
  ["4", { mission: { type: 2 } }],
  ["5", { mission: { type: 2, origin: {}, destination: {} } }],
  [
    "6",
    { mission: { type: 2, origin: { order: 1 }, destination: { order: 2 } } },
  ],
  [
    "7",
    {
      mission: {
        type: 2,
        origin: { section: "A1" },
        destination: { section: "A1" },
      },
    },
  ],
  [
    "8",
    {
      mission: {
        type: 2,
        origin: { order: 1, section: "A1" },
        destination: { order: 1, section: "A1" },
      },
    },
  ],
];

describe("Missions schedule Special", () => {
  describe("getSchedulesForASpecialMission", () => {
    each(missions).test(
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
});
