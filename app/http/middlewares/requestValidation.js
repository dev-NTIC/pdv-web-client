const { body, validationResult } = require("express-validator");

exports.validate = (validationRules) => {
    return async (req, res, next) => {
        for (let validation of validationRules) {
            await validation.run(req);
        }

        const errors = validationResult(req).formatWith((error) => error.msg);
        if (errors.isEmpty()) {
            return next();
        }

        res.status(422).json({ errors: errors.mapped() });
    };
};
