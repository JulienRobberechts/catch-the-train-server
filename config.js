module.exports = {
  ratpApiRootUrl: process.env.ratpApiRootUrl || "http://api.ratp.fr",
  ratp_api_adapter_mock: process.env.SAMPLE_MODE === "true"
};
