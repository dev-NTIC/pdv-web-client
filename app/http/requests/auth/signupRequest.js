const {
    signupValidationRules,
} = require("../../validations/auth/signupValidation");
const { validate } = require("../../middlewares/requestValidation");

exports.validateSignup = () => {
    return validate(signupValidationRules);
};
