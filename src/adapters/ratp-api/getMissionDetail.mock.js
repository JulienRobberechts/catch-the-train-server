async function getMissionDetail({ missionCode }) {
  try {
    const missionDetail = require(`../../data/ratp/rers/A/by-mission/stations-${missionCode}.json`);
    return missionDetail.result;
  } catch (err) {
    console.log(`Mission '${missionCode}' can not be mocked`);
  }
}

module.exports = getMissionDetail;
