const timeTable = {
  result: {
    schedules: [
      {
        code: "TAXE",
        message: "21:46",
        destination: "Poissy",
      },
      {
        code: "NOTE",
        message: "21:34",
        destination: "Boissy-Saint-Leger",
      },
      {
        code: "WYWZ",
        message: "Sans voyageurs V.1",
        destination: "Boissy-Saint-Leger",
      },
    ],
  },
  _metadata: {
    mocked: true,
    call: "GET /schedules/rers/A/chatelet+les+halles/A+R",
    date: "2020-04-02T21:32:16+02:00",
    version: 4,
  },
};

module.exports = timeTable;
