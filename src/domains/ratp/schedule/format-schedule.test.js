const { formatSchedule } = require("./format-schedule");
const each = require("jest-each").default;

const now = "2020-03-10T09:22:30+01:00";

describe("formatSchedule", () => {
  each([
    [
      "train in 5 minutes",
      "09:27",
      {
        departureTime: "2020-03-10T09:27:00+01:00",
      },
    ],
    [
      "train in 12h",
      "19:08",
      {
        departureTime: "2020-03-10T19:08:00+01:00",
      },
    ],
    ,
    [
      "train next day",
      "05:22",
      {
        departureTime: "2020-03-11T05:22:00+01:00",
      },
    ],
    [
      "hour departure platform",
      "09:31 Départ Voie 2",
      {
        departureTime: "2020-03-10T09:31:00+01:00",
        isDeparture: true,
        platform: "2",
      },
    ],
    [
      "terminus platform",
      "Train terminus V.2",
      {
        isTerminus: true,
        platform: "2",
      },
    ],
    [
      "hour platform",
      "13:35 Voie 2",
      {
        departureTime: "2020-03-10T13:35:00+01:00",
        platform: "2",
      },
    ],
    [
      "hour platform",
      "15:19 Voie 1",
      {
        departureTime: "2020-03-10T15:19:00+01:00",
        platform: "1",
      },
    ],
    [
      "hour platform",
      "14:07 Voie 2",
      {
        departureTime: "2020-03-10T14:07:00+01:00",
        platform: "2",
      },
    ],
    [
      "hour platform 2",
      "14:07 Voie 1C",
      {
        departureTime: "2020-03-10T14:07:00+01:00",
        platform: "1C",
      },
    ],
    [
      "approaching +10 seconds on time",
      "Train à l'approche",
      {
        departureTime: "2020-03-10T09:22:40+01:00",
        isApproaching: true,
      },
    ],
    [
      "approaching +10 seconds on time + platform",
      "A l'approche V.1C",
      {
        departureTime: "2020-03-10T09:22:40+01:00",
        isApproaching: true,
        platform: "1C",
      },
    ],
    [
      "Train à quai",
      "Train à quai",
      {
        isImminent: true,
        isOnPlatform: true,
      },
    ],
    [
      "no passengers",
      "Sans voyageurs V.1",
      {
        noPassenger: true,
        platform: "1",
      },
    ],
    [
      "no passengers v2",
      "Train sans arrêt",
      {
        noPassenger: true,
      },
    ],
    [
      "no passengers v3",
      "Sans arrêt V.2",
      {
        noPassenger: true,
        platform: "2",
      },
    ],
    [
      "delayed train",
      "Train retardé",
      {
        isUnknownTime: true,
        isDelayed: true,
      },
    ],
    [
      "Unknown Time 1",
      "Voie 1C",
      {
        isUnknownTime: true,
        platform: "1C",
      },
    ],
    [
      "Unknown Time 1",
      "Voie 2",
      {
        isUnknownTime: true,
        platform: "2",
      },
    ],
    [
      "probably on platform",
      "Départ Voie 4",
      {
        isImminent: true,
        isDeparture: true,
        isOnPlatform: true,
        platform: "4",
      },
    ],
  ]).it("%s - should convert '%s' (test %#)", (desc, msg, expectedResult) => {
    const actualResult = formatSchedule(now, msg);
    expect(actualResult).toEqual(expectedResult);
  });

  each([
    ["no message", null, "first parameter 'message' should not be falsy"],
    ["empty message", "", "first parameter 'message' should not be falsy"],
    ["invalid minutes", "15:89", "Invalid time"],
    ["invalid hour", "29:09", "Invalid time"],
  ]).it("%s - should fail to convert '%s'", (desc, msg, error) => {
    const actualResult = formatSchedule(now, msg);
    expect(actualResult).toEqual({
      originalMsg: msg,
      error,
    });
  });

  test("should return invalid with no now date", () => {
    const actualResult = formatSchedule(null, "15:16");
    expect(actualResult).toEqual({
      originalMsg: "15:16",
      error: "first parameter 'now' should not be falsy",
    });
  });
});
