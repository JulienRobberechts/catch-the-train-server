require("custom-env").env("livetest");
const { getSchedulesController } = require("../../controllers/factory");
const each = require("jest-each").default;

const network = "rers";
const line = "A";

const stationChatelet = "chatelet+les+halles";
const stationNanterrePrefecture = "nanterre+prefecture";
const stationNanterreVille = "nanterre+ville";
const stationChatou = "chatou+croissy";
const stationStGermain = "st+germain+en+laye";
const stationNogent = "nogent+sur+marne";
const stationStMaur = "le+parc+de+saint+maur";
const stationAuber = "auber";

const stations = require("../../data/ratp/rers/A/stations.json");

const { handleError } = require("../../utils/errors/errorManagement");

describe("live schedule", () => {
  it("should show the time", async () => {
    console.log("live schedule :>> ", "live schedule");
  });
  const stationsTestCases = stations
    .filter((s) => s.owner === "ratp")
    .map((s) => [s.name, s]);
  each([...stationsTestCases]).it(
    "should request live schedule for %s without errors",
    async (name, station) => {
      const schedulesController = getSchedulesController();
      const dest =
        stationAuber === station.slug ? stationChatelet : stationAuber;
      try {
        const result = await schedulesController.getSchedulesForJourneyByDestination(
          network,
          line,
          station.slug,
          dest
        );
      } catch (err) {
        const formattedError = handleError(err);
        console.log(
          `live schedule Error :>> ${station.slug}`,
          JSON.stringify(formattedError, null, 2)
        );
        fail("live schedule Error");
      }
    }
  );
});
