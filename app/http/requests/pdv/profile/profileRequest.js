const {
    updateProfileValidationRules,
} = require("../../../validations/profile/profileValidationRules");
const { validate } = require("../../../middlewares/requestValidation");

exports.validateUpdateProfile = () => {
    return validate(updateProfileValidationRules);
};
