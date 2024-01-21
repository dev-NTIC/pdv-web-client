const {
    saleValidationRules,
} = require("../../../validations/sale/saleValidationRules");

const { validate } = require("../../../middlewares/requestValidation");

exports.validateSale = () => {
    return validate(saleValidationRules);
};
