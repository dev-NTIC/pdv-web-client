const { body } = require("express-validator");

exports.updateProfileValidationRules = [
    body("username")
        .escape()
        .trim()
        .isLength({ min: 1, max:50 }).withMessage('veuillez renseigner un nom utilisateur'),
    body("old_password")
        .optional({ nullable: true, checkFalsy: true })
        .escape()
        .trim(),
    body("password")
        .optional({ nullable: true, checkFalsy: true })
        .escape()
        .trim(),
];