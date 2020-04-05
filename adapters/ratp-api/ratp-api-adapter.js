const axios = require("axios");
axios.defaults.timeout = 500;

var debug = require("debug")("ctt:api:schedule");
const { ConnectivityError } = require("../../utils/errors");

const apiName = "ratp";

async function getAllSchedulesRATP({
  RATP_API_ROOT_URL,
  network,
  line,
  station,
}) {
  if (!RATP_API_ROOT_URL) {
    throw new Error("RATP_API_ROOT_URL parameter is not valid");
  }
  try {
    const url =
      RATP_API_ROOT_URL + `/schedules/${network}/${line}/${station}/A+R`;
    const response = await axios.get(url);

    if (!response.status >= 400) {
      throw new ConnectivityError(
        `Error response from the Api '${apiName}'`,
        response
      );
    }

    if (!response.data) {
      throw new ConnectivityError(`Empty response from the Api '${apiName}'`);
    }

    return response.data;
  } catch (error) {
    throw new ConnectivityError(
      `Connectivity Error with the Api '${apiName}'`,
      error
    );
  }
}

module.exports = { getAllSchedulesRATP };
