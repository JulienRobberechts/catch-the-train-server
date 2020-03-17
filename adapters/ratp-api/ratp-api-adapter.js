const axios = require("axios");
axios.defaults.timeout = 500;

var debug = require("debug")("ctt:api:schedule");
const { ConnectivityError } = require("../../utils/errors");

const apiName = "ratp";

class RatpApiAdapter {
  constructor({ ratpApiRootUrl }) {
    if (!ratpApiRootUrl) {
      throw new Error("ratpApiRootUrl parameter is not valid");
    }
    this.ratpApiRootUrl = ratpApiRootUrl;
  }
  async getAllSchedulesRATP() {
    try {
      const url = this.ratpApiRootUrl + "/all";
      const response = await axios.get(url);
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
