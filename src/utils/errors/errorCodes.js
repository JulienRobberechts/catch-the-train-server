module.exports = {
  // 400: Bad Request (error due to the client)
  // Default client error
  ERROR_40000_BAD_REQUEST: 40000,

  // 500: Internal Server Error (error due to the server)
  // Default server error
  ERROR_50000_UNKNOWN_SERVER_ERROR: 50000,
  // Server error in error management
  ERROR_50010_SERVER_ERROR_MANAGEMENT_ERROR: 50010,
  // Error when an external service return a 400 error
  ERROR_50020_EXTERNAL_SERVICE_USAGE_ERROR: 50020,

  // 503: Service Unavailable (error due to an external service)
  // Default error when an external service return a 500 error
  ERROR_50300_EXTERNAL_SERVICE_UNKNOWN_ERROR: 50300,
  // Error when an external service return a 500 error
  ERROR_50320_EXTERNAL_SERVICE_SERVER_ERROR: 50320,
  // Error when an external service return a 503 error
  ERROR_50310_EXTERNAL_SERVICE_UNAVAILABLE: 50310,
  // Error when an external service return a 404 error
  ERROR_50330_EXTERNAL_SERVICE_NOT_FOUND: 50330,
  // Error when an external service return a timeout
  ERROR_50340_EXTERNAL_SERVICE_TIMEOUT: 50340,
};
