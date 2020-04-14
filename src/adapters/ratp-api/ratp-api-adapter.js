const axios = require("axios");
axios.defaults.timeout = 500;

var debug = require("debug")("ctt:api:schedule");
const { ServerError } = require("../../utils/errors");

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

    if (!response.data) {
      throw new ServerError(`Server Error`);
    }

    return response.data;
  } catch (error) {
    throw new ServerError(`Server Error`, error);
  }
}

module.exports = { getAllSchedulesRATP };
