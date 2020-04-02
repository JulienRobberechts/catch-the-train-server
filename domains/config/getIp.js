const axios = require("axios");

// const checkIpUrl = 'checkip.amazonaws.com';
const checkIpUrl = "https://api.ipify.org/";

const getCurrentServerIp = async () => {
  try {
    const response = await axios.get(checkIpUrl);
    return response.data;
  } catch (error) {
    return "???.???.???.???";
  }
};

module.exports = getCurrentServerIp;
