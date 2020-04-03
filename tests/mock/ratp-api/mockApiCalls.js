const nock = require("nock");
const routesTestDouble = require("./data/routes");
var config = require("../../../config");

const mockApiCalls = () => {
  nock(config.RATP_API_ROOT_URL)
    .defaultReplyHeaders({ "access-control-allow-origin": "*" })
    .get("/schedules/rers/A/chatelet+les+halles/A+R")
    .reply(200, routesTestDouble);
};

const mockApiCallsWithNoConnectivity = () => {
  nock(config.RATP_API_ROOT_URL)
    .defaultReplyHeaders({ "access-control-allow-origin": "*" })
    .get("/schedules/rers/A/chatelet+les+halles/A+R")
    .reply(404);
};

module.exports = { mockApiCalls, mockApiCallsWithNoConnectivity };
