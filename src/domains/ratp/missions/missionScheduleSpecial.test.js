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

const stationsYOZZ = ["a", "b", "c"];
const stationsTOZZ = ["c", "b", "a"];
const stationsBNZZ = ["c", "b", "a"];

const missions = [
  ["YOZZ", stationsYOZZ],
  ["TOZZ", stationsTOZZ],
  ["BNZZ", stationsBNZZ],
];

describe("Missions schedule Special", () => {
  describe("getSchedulesForASpecialMission", () => {
    each(missions).test(
      "should return schedule for mission %s",
      (missionCode, expectedStations) => {
        const actualResult = getSchedulesForASpecialMission(missionCode);
        expect(actualResult.mission).toBe(missionCode);
        expect(actualResult.stations).toEqual(expectedStations);
      }
    );
  });
});
