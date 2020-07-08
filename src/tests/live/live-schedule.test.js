require("custom-env").env("livetest");
const { getSchedulesController } = require("../../controllers/factory");

const network = "rers";
const line = "A";
const stationChatelet = "chatelet+les+halles";
const stationAuber = "auber";
const { handleError } = require("../../utils/errors/errorManagement");

describe("live schedule", () => {
  it("should show the time", async () => {
    console.log("live schedule :>> ", "live schedule");
  });
  it("should request live schedule for chatelet without errors", async () => {
    const schedulesController = getSchedulesController();

    try {
      const result = await schedulesController.getSchedulesForJourneyByDestination(
        network,
        line,
        stationChatelet,
        stationAuber
      );
    } catch (err) {
      const publicError = handleError(err);
      console.log(
        "live schedule Error :>> ",
        JSON.stringify(publicError, null, 2)
      );
      fail(JSON.stringify(publicError, null, 2));
    }
  });
});
