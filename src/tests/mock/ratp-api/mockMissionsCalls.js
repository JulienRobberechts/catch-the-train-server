const nock = require("nock");
var config = require("../../../config");
const path = require("path");
const util = require("util");
const fs = require("fs");
const readdir = util.promisify(fs.readdir);
const missionsDirPath = path.join(__dirname, "data\\missions");

const nockRatpMissionsApiCalls = async () => {
  try {
    const files = await readdir(missionsDirPath);
    files.forEach(function (filename) {
      const missionCode = filename
        .replace("stations-", "")
        .replace(".json", "");
      const missionDetail = require(`./data/missions/${filename}`);
      nockMission(missionCode, missionDetail);
    });
  } catch (err) {
    return console.log(`Unable to scan directory: ${missionsDirPath}` + err);
  }
};

const nockMission = (missionCode, missionDetail) => {
  nock(config.RATP_API_ROOT_URL)
    .defaultReplyHeaders({ "access-control-allow-origin": "*" })
    .get(`/missions/rers/A/${missionCode}`)
    .reply(200, missionDetail);
};

module.exports = {
  nockRatpMissionsApiCalls,
};
