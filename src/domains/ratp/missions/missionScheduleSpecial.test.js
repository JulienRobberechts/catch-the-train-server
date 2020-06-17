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
    missionCode: "HBZZ",
    origin: "grande+arche+la+defense",
    destination: "nation",
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
    origin: "torcy",
    destination: "rueil+malmaison",
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
    origin: "torcy",
    destination: "poissy",
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
    origin: "boissy+saint+leger",
    destination: "grande+arche+la+defense",
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
  ["YOZZ", YOZZ],
  ["TOZZ", TOZZ],
  ["BNZZ", BNZZ],
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
  });
});
