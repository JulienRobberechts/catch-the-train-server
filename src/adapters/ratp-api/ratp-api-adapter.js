const axios = require("axios");
const ErrorCodes = require("../../utils/errors/errorCodes");
const { ApplicationError } = require("../../utils/errors/applicationError");
var debug = require("debug")("ctt:api:schedule");
const { ServerError } = require("../../utils/errors");
axios.defaults.timeout = 500;
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

    if (
      response.data.result &&
      response.data.result.schedule &&
      response.data.result.schedule.length === 1 &&
      response.data.result.schedule[0].code === "Schedules unavailable" &&
      response.data.result.schedule[0].message === "Schedules unavailable"
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

module.exports = { getAllSchedulesRATP };
