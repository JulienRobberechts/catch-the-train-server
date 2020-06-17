const stationDraft = require("./stations.json");
const fs = require("fs");

function onlyUnique(item, index, sourceArray) {
  return sourceArray.findIndex((i) => i.slug === item.slug) === index;
}

var stationUnique = stationDraft.filter(onlyUnique).map((s) => s.slug);

fs.writeFile("./station-modif.json", JSON.stringify(stationUnique), function (
  err
) {
  if (err) {
    return console.log(err);
  }
  console.log("station-modif file saved");
});
