const axios = require("axios");

const { ServerError } = require("../../../utils/errors");

axios.defaults.timeout = 500;

async function getMissionDetail({ RATP_API_ROOT_URL, missionCode }) {
  if (!missionCode) {
    throw new Error(
      "missionCode parameter is not valid to get a mission detail"
    );
  }
  if (!RATP_API_ROOT_URL) {
    throw new Error("RATP_API_ROOT_URL parameter is not valid");
  }
  try {
    const url = RATP_API_ROOT_URL + `/missions/rers/A/${missionCode}`;
    console.log("call to : ", url);
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new ServerError(`Server Error`, error);
  }
}

module.exports = getMissionDetail;
