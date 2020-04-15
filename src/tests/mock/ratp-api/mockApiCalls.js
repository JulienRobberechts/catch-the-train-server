const nock = require("nock");
const schedulesTestDoubleValid = require("./data/schedules-test-double.valid");
const schedulesTestDoubleUnavailable = require("./data/schedules-test-double.unavailable");
var config = require("../../../config");

const mockApiCalls = (station) => {
  nock(config.RATP_API_ROOT_URL)
    .defaultReplyHeaders({ "access-control-allow-origin": "*" })
    .get(`/schedules/rers/A/${station}/A+R`)
    .reply(200, schedulesTestDoubleValid);
};

const mockApiCallsWithNoConnectivity = (station) => {
  nock(config.RATP_API_ROOT_URL)
    .defaultReplyHeaders({ "access-control-allow-origin": "*" })
    .get(`/schedules/rers/A/${station}/A+R`)
    .reply(404);
};

const mockApiCallsWithScheduleUnavailable = (station) => {
  nock(config.RATP_API_ROOT_URL)
    .defaultReplyHeaders({ "access-control-allow-origin": "*" })
    .get(`/schedules/rers/A/${station}/A+R`)
    .reply(503, schedulesTestDoubleUnavailable);
};

module.exports = {
  mockApiCalls,
  mockApiCallsWithNoConnectivity,
  mockApiCallsWithScheduleUnavailable,
};
