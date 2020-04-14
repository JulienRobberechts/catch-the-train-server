const nock = require("nock");
const schedulesTestDoubleValid = require("./data/schedules-test-double.valid");
const schedulesTestDoubleUnavailable = require("./data/schedules-test-double.unavailable");
var config = require("../../../config");

const mockApiCalls = () => {
  nock(config.RATP_API_ROOT_URL)
    .defaultReplyHeaders({ "access-control-allow-origin": "*" })
    .get("/schedules/rers/A/chatelet+les+halles/A+R")
    .reply(200, schedulesTestDoubleValid);
};

const mockApiCallsWithNoConnectivity = () => {
  nock(config.RATP_API_ROOT_URL)
    .defaultReplyHeaders({ "access-control-allow-origin": "*" })
    .get("/schedules/rers/A/chatelet+les+halles/A+R")
    .reply(404);
};

const mockApiCallsWithScheduleUnavailable = () => {
  nock(config.RATP_API_ROOT_URL)
    .defaultReplyHeaders({ "access-control-allow-origin": "*" })
    .get("/schedules/rers/A/cergy+prefecture/A+R")
    .reply(503, schedulesTestDoubleUnavailable);
};

module.exports = {
  mockApiCalls,
  mockApiCallsWithNoConnectivity,
  mockApiCallsWithScheduleUnavailable,
};
