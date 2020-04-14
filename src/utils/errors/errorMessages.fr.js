const ErrorCodes = require("./errorCodes");

const errorInErrorManagementObject = {
  code: ErrorCodes.ERROR_50010_SERVER_ERROR_MANAGEMENT_ERROR,
  msg: "La gestion d'erreur n'a pas fonctionnée",
};

const ErrorMessages = [
  {
    code: ErrorCodes.ERROR_40000_BAD_REQUEST,
    msg: "Erreur de requete.",
  },
  {
    code: ErrorCodes.ERROR_50000_UNKNOWN_SERVER_ERROR,
    msg: "Erreur serveur inconnue.",
  },
  {
    code: ErrorCodes.ERROR_50010_SERVER_ERROR_MANAGEMENT_ERROR,
    msg: "Une erreur inconnue s'est produite sur le serveur",
  },
  {
    code: ErrorCodes.ERROR_50020_EXTERNAL_SERVICE_USAGE_ERROR,
    msg: "Erreur server",
  },
  {
    code: ErrorCodes.ERROR_50310_PROVIDER_SERVICE_UNAVAILABLE,
    msg: "le fournisseur de donnees est momentanément indisponible",
  },
  {
    code: ErrorCodes.ERROR_50300_CONNECTIVITY_ERROR,
    msg: "Erreur de connectivite avec le service externe",
  },
  {
    code: ErrorCodes.ERROR_50010_SERVER_ERROR_MANAGEMENT_ERROR,
    msg: "La gestion d'erreur n'a pas fonctionnée",
  },
];

module.exports = { ErrorMessages, errorInErrorManagementObject };
