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

module.exports = {
  getMissionDetailsMock,
};
