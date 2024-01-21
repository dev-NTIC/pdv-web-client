const BaseError = require("./BaseApiError");

module.exports = class ProductAlreadySoldError extends BaseError {
    message = "le produit à été precedement vendu";
    status = 400;
}