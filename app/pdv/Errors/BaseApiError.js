module.exports = class BaseApiError extends Error {
    constructor(message) {
        super();
        this.message = message;
        this.status = 500
    }
}