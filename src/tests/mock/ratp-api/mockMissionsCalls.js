const nock = require("nock");
var config = require("../../../config");
const path = require("path");
const util = require("util");
const fs = require("fs");
const readdir = util.promisify(fs.readdir);
const missionsDirPath = path.join(__dirname, "data/missions");

const getMissionDetailsMock = (missionCode) => {
  try {
    const missionDetailMock = require(`./data/missions/stations-${missionCode}.json`);
    return missionDetailMock;
  } catch (err) {
    console.log(`Mission '${missionCode}' will be mocked with empty schedule`);
    return {
      result: {
        stations: [],
      },
      _metadata: {
        fake: true,
        call: `GET /missions/rers/A/${missionCode}`,
        date: "2020-01-01T00:00:00+00:00",
        version: 4,
      },
    };
  }
};

const getMissionFromFileName = (filename) =>
  filename.replace("stations-", "").replace(".json", "");

const nockRatpMissionsApiCalls = async () => {
  try {
    const files = await readdir(missionsDirPath);
    files.forEach(function (filename) {
      const missionCode = getMissionFromFileName(filename);
      const missionSchedule = getMissionDetailsMock(missionCode);
      nockMission(missionCode, missionSchedule);
    });
  } catch (err) {
    return console.log(`Unable to scan directory: ${missionsDirPath}` + err);
  }
};

const nockMission = (missionCode, missionSchedule) => {
  // console.log(
  //   "set nock: ",
  //   config.RATP_API_ROOT_URL + `/missions/rers/A/${missionCode}`
  // );
  nock(config.RATP_API_ROOT_URL)
    .defaultReplyHeaders({ "access-control-allow-origin": "*" })
    .get(`/missions/rers/A/${missionCode}`)
    .reply(200, missionSchedule);
};

module.exports = {
  nockRatpMissionsApiCalls,
  getMissionDetailsMock,
};
