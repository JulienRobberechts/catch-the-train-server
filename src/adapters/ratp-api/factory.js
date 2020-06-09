const getAllSchedulesRATP = require("./getAllSchedulesRATP");
const getAllSchedulesRATPMock = require("./getAllSchedulesRATP.mock");

const getMissionDetail = require("./getMissionDetail");
const getMissionDetailMock = require("./getMissionDetail.mock");

exports.getRatpApiAdapter = (mocked) => {
  return mocked
    ? {
        getAllSchedulesRATP: getAllSchedulesRATPMock,
        getMissionDetail: getMissionDetailMock,
      }
    : {
        getAllSchedulesRATP: getAllSchedulesRATP,
        getMissionDetail: getMissionDetail,
      };
};

exports.getMissionDetailMocked = getMissionDetailMock;
