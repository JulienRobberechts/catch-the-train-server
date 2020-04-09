module.exports = {
  RATP_API_ROOT_URL: process.env.RATP_API_ROOT_URL || "http://invalid-ratp-api",
  RATP_API_MOCK_DATA: process.env.RATP_API_MOCK_DATA === "true"
};
