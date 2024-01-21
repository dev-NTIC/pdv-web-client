const BaseError = require("./BaseApiError");

module.exports = class NotFoundError extends BaseError {
    status = 400;
}