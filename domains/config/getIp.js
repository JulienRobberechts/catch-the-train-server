const axios = require("axios");

const getCurrentServerIp = async () => {
  try {
    const url = "https://api.ipify.org/";
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    return "???.???.???.???";
  }
};

module.exports = getCurrentServerIp;
