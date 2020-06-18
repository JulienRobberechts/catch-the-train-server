const getSchedulesForASpecialMission = (mission) => {
  if (
    !mission ||
    !mission.type ||
    !mission.origin ||
    !mission.destination ||
    !mission.origin.section ||
    !mission.destination.section ||
    !mission.origin.order ||
    !mission.destination.order
  )
    throw Error(
      "invalid mission - should contains origin and destination with section ands order"
    );

  if (
    mission.origin.section === mission.destination.section &&
    mission.origin.order === mission.destination.order
  )
    throw Error("invalid mission with same ");

  // console.log("mission :>> ", mission);
  // console.log("mission :>> ", mission);
  // console.log("mission :>> ", mission);
  return {
    mission: mission.missionCode,
    stations: [
      "grande+arche+la+defense",
      "charles+de+gaulle+etoile",
      "auber",
      "chatelet+les+halles",
      "gare+de+lyon",
      "nation",
    ],
  };
};

module.exports = { getSchedulesForASpecialMission };
