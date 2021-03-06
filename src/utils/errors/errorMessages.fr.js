const ErrorCodes = require("./errorCodes");

const errorInErrorManagementObject = {
  code: ErrorCodes.ERROR_50010_SERVER_ERROR_MANAGEMENT_ERROR,
  msg: "Erreur dans la gestion d'erreur du serveur",
};

const ErrorMessages = [
  {
    code: ErrorCodes.ERROR_40000_BAD_REQUEST,
    msg: "Erreur de requête",
  },
  {
    code: ErrorCodes.ERROR_50000_UNKNOWN_SERVER_ERROR,
    msg: "Erreur serveur inconnue",
  },
  {
    code: ErrorCodes.ERROR_50010_SERVER_ERROR_MANAGEMENT_ERROR,
    msg: "Erreur dans la gestion d'erreur du serveur",
  },
  {
    code: ErrorCodes.ERROR_50020_EXTERNAL_SERVICE_USAGE_ERROR,
    msg: "Erreur du serveur",
  },
  {
    code:
      ErrorCodes.ERROR_50110_IMPLEMENTATION_NOT_SUPPORTED_SCHEDULE_FORMAT_ERROR,
    msg: "Format d'horaire non supporté",
  },
  {
    code: ErrorCodes.ERROR_50300_EXTERNAL_SERVICE_UNKNOWN_ERROR,
    msg: "Le service externe a rencontré une erreur inconnue",
  },
  {
    code: ErrorCodes.ERROR_50310_EXTERNAL_SERVICE_UNAVAILABLE,
    msg: "Le service externe est momentanément indisponible",
  },
  {
    code: ErrorCodes.ERROR_50320_EXTERNAL_SERVICE_SERVER_ERROR,
    msg: "Le service externe a rencontré une erreur",
  },
  {
    code: ErrorCodes.ERROR_50330_EXTERNAL_SERVICE_NOT_FOUND,
    msg: "Le service externe n'est pas joignable",
  },
  {
    code: ErrorCodes.ERROR_50340_EXTERNAL_SERVICE_TIMEOUT,
    msg: "Le service externe a ne répond pas assez rapidement",
  },
];

module.exports = { ErrorMessages, errorInErrorManagementObject };
