const axios = require("axios");
const config = require("../../config");
var debug = require("debug")("ctt:api:schedule");
const { ConnectivityError } = require("../../utils/errors");

const apiName = "ratp";

class RatpApiAdapter {
  async getAllSchedulesRATP() {
    try {
      const response = await axios.get(config.RatpApiRootUrl + "/all");
      // debug(`response from API '${apiName}':`, JSON.stringify(response));
      return response.data;
    } catch (error) {
      throw new ConnectivityError(
        `Connectivity Error with the Api '${apiName}'`,
        error
      );
    }
  }
}

module.exports = RatpApiAdapter;