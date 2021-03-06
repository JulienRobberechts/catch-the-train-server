const axios = require("axios");

const ErrorCodes = require("../../../utils/errors/errorCodes");
const { ApplicationError } = require("../../../utils/errors/applicationError");
var debug = require("debug")("ctt:api:schedule");
const { ServerError } = require("../../../utils/errors");

axios.defaults.timeout = 6000;
const apiName = "ratp";

async function getAllSchedulesRATP(ratpApiBaseUrl, { network, line, station }) {
  if (!ratpApiBaseUrl) {
    throw new Error("RATP_API_ROOT_URL parameter is not valid");
  }
  try {
    const url = ratpApiBaseUrl + `/schedules/${network}/${line}/${station}/A+R`;
    const response = await axios.get(url);

    if (
      response.data.result &&
      response.data.result.schedules &&
      response.data.result.schedules.length === 1 &&
      response.data.result.schedules[0].code === "Schedules unavailable" &&
      response.data.result.schedules[0].message === "Schedules unavailable"
    ) {
      throw new ApplicationError(
        ErrorCodes.ERROR_50310_EXTERNAL_SERVICE_UNAVAILABLE,
        { apiName }
      );
    }

    return response.data;
  } catch (error) {
    throw new ServerError(`Server Error`, error);
  }
}

module.exports = getAllSchedulesRATP;
