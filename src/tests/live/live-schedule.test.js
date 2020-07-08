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

const { handleError } = require("../../utils/errors/errorManagement");

describe("live schedule", () => {
  it("should show the time", async () => {
    console.log("live schedule :>> ", "live schedule");
  });
  each([
    [stationChatelet, stationAuber],
    [stationNanterrePrefecture, stationAuber],
    [stationNanterreVille, stationAuber],
    [stationChatou, stationAuber],
    [stationStGermain, stationAuber],
    [stationNogent, stationAuber],
    [stationStMaur, stationAuber],
  ]).it(
    "should request live schedule for %s without errors",
    async (src, dest) => {
      const schedulesController = getSchedulesController();

      try {
        const result = await schedulesController.getSchedulesForJourneyByDestination(
          network,
          line,
          src,
          dest
        );
      } catch (err) {
        const formattedError = handleError(err);
        console.log(
          `live schedule Error :>> ${src}`,
          JSON.stringify(formattedError, null, 2)
        );
        fail("live schedule Error");
      }
    }
  );
});
