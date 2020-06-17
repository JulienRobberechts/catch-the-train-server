function getMissionWay(missionDetails) {
  if (!missionDetails) return null;
  if (!missionDetails.origin || !missionDetails.destination) return null;

  const originOrder = missionDetails.origin.order;
  const destinationOrder = missionDetails.destination.order;

  if (!originOrder || !destinationOrder) return null;
  if (originOrder === destinationOrder) return null;
  return originOrder < destinationOrder ? "forward" : "backward";
}

module.exports = {
  getMissionWay,
};
