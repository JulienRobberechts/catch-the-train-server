const getAllSchedulesRATP = require("./getAllSchedulesRATP");
const getAllSchedulesRATPMock = require("./getAllSchedulesRATP.mock");

const getMissionDetail = require("./getMissionDetail");
const getMissionDetailMock = require("./getMissionDetail.mock");

exports.getRatpApiAdapter = ({ RATP_API_MOCK_DATA }) => {
  return RATP_API_MOCK_DATA
    ? {
        getAllSchedulesRATP: getAllSchedulesRATPMock,
        getMissionDetail: getMissionDetailMock,
      }
    : {
        getAllSchedulesRATP: getAllSchedulesRATP,
        getMissionDetail: getMissionDetail,
      };
};
