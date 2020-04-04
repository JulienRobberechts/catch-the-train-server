const nock = require("nock");
const schedulesTestDouble = require("./data/schedules-test-double");
var config = require("../../../config");

const mockApiCalls = () => {
  nock(config.RATP_API_ROOT_URL)
    .defaultReplyHeaders({ "access-control-allow-origin": "*" })
    .get("/schedules/rers/A/chatelet+les+halles/A+R")
    .reply(200, schedulesTestDouble);
};

const mockApiCallsWithNoConnectivity = () => {
  nock(config.RATP_API_ROOT_URL)
    .defaultReplyHeaders({ "access-control-allow-origin": "*" })
    .get("/schedules/rers/A/chatelet+les+halles/A+R")
    .reply(404);
};

module.exports = { mockApiCalls, mockApiCallsWithNoConnectivity };
