const routes = require("../../tests/mock/ratp-api/data/routes");
class RatpApiAdapterMock {
  async getAllSchedulesRATP() {
    return routes;
  }
}

module.exports = RatpApiAdapterMock;
