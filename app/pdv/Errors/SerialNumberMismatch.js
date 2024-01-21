const BaseError = require("./BaseApiError");

module.exports = class SerialNumberMismatch extends BaseError {
    status = 400;
    message = "le numero de serie ne corresponds pas au produit";
}
