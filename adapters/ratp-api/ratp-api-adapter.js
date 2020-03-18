const axios = require("axios");
axios.defaults.timeout = 500;

var debug = require("debug")("ctt:api:schedule");
const { ConnectivityError } = require("../../utils/errors");

const apiName = "ratp";

async function getAllSchedulesRATP({ RATP_API_ROOT_URL }) {
  if (!RATP_API_ROOT_URL) {
    throw new Error("RATP_API_ROOT_URL parameter is not valid");
  }
  try {
    const url = RATP_API_ROOT_URL + "/all";
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new ConnectivityError(
      `Connectivity Error with the Api '${apiName}'`,
      error
    );
  }
}

module.exports = { getAllSchedulesRATP };
