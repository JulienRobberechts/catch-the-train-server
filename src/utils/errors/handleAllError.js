var debug = require("debug")("ctt");
const { handleError } = require("./errorManagement");

function handleAllError(error, req, res, next) {
  try {
    const publicError = handleError(error);
    res.status(publicError.errorHttpCode).send(publicError);
  } catch (error) {
    res.status(500).send({
      errorCode: 50010,
      errorMessage: "Erreur dans la gestion d'erreur du serveur",
    });
  }
}

module.exports = handleAllError;
