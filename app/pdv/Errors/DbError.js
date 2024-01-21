const BaseError = require("./BaseApiError");

module.exports = class DbError extends BaseError {
    status = 500;
}
