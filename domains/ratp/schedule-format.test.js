const { formatSchedule } = require("./schedule-format");
const each = require("jest-each").default;

describe("formatSchedule", () => {
  each([
    [
      "no now",
      null,
      "15:16",
      {
        isInvalid: true
      }
    ],
    [
      "no message",
      "2020-03-10T09:22:30+01:00",
      null,
      {
        isInvalid: true
      }
    ],
    [
      "empty message",
      "2020-03-10T09:22:30+01:00",
      "",
      {
        isInvalid: true
      }
    ],
    [
      "invalid message",
      "2020-03-10T09:22:30+01:00",
      "X",
      {
        isInvalid: true
      }
    ],
    [
      "train in 5 minutes",
      "2020-03-10T09:22:30+01:00",
      "09:27",
      {
        time: "2020-03-10T09:27:00+01:00"
      }
    ],
    [
      "train in 12h",
      "2020-03-10T09:22:30+01:00",
      "19:08",
      {
        time: "2020-03-10T19:08:00+01:00"
      }
    ],
    ,
    [
      "train next day",
      "2020-03-10T09:22:30+01:00",
      "05:22",
      {
        time: "2020-03-11T05:22:00+01:00"
      }
    ],
    [
      "invalid hour format",
      "2020-03-10T09:22:30+01:00",
      "15H16",
      {
        isInvalid: true
      }
    ],
    [
      "invalid minutes",
      "2020-03-10T09:22:30+01:00",
      "15:89",
      {
        isInvalid: true
      }
    ],
    [
      "invalid hour",
      "2020-03-10T09:22:30+01:00",
      "29:09",
      {
        isInvalid: true
      }
    ],
    [
      "hour departure platform",
      "2020-03-10T09:22:30+01:00",
      "09:31 Départ Voie 2",
      {
        time: "2020-03-10T09:31:00+01:00",
        isDeparture: true,
        platform: "2"
      }
    ],
    [
      "terminus platform",
      "2020-03-10T09:22:30+01:00",
      "Train terminus V.2",
      {
        isTerminus: true,
        platform: "2"
      }
    ],
    [
      "hour platform",
      "2020-03-10T09:22:30+01:00",
      "13:35 Voie 2",
      {
        time: "2020-03-10T13:35:00+01:00",
        platform: "2"
      }
    ],
    [
      "hour platform",
      "2020-03-10T09:22:30+01:00",
      "15:19 Voie 1",
      {
        time: "2020-03-10T15:19:00+01:00",
        platform: "1"
      }
    ],
    [
      "hour platform",
      "2020-03-10T09:22:30+01:00",
      "14:07 Voie 2",
      {
        time: "2020-03-10T14:07:00+01:00",
        platform: "2"
      }
    ],
    [
      "approaching +10 seconds on time",
      "2020-03-10T09:22:30+01:00",
      "Train à l'approche",
      {
        time: "2020-03-10T09:22:40+01:00",
        isApproaching: true
      }
    ],
    [
      "desc",
      "2020-03-10T09:22:30+01:00",
      "Train à quai",
      {
        time: "2020-03-10T09:22:30+01:00",
        isOnPlatform: true
      }
    ]
  ]).it(
    "%s - at %s should convert '%s' (test %#)",
    (desc, now, msg, expectedResult) => {
      const actualResult = formatSchedule(now, msg);
      expect(actualResult).toEqual(expectedResult);
    }
  );
});
