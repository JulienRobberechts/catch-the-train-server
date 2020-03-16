const normalizeString = name => {
  if (!name) return null;

  return name
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace("–", "-")
    .replace(/ /g, "-")
    .replace(/'/g, "-")
    .replace("--", "-")
    .replace("--", "-");
};

module.exports = {
  normalizeString
};
