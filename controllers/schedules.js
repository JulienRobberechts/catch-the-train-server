const debug = require("debug")("ctt:api:schedule");

class SchedulesController {

  async getSchedules() {
    const departure = {
      nextDeparture: {
        time: '2020-03-09T18:43:52+00:00'
      }
    };
    debug('controller', departure);
    return departure;
  }
}

module.exports = SchedulesController;
