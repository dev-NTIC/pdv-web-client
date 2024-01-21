const { body } = require("express-validator");

exports.signupValidationRules = [
    body("username").exists().notEmpty().escape().trim().isLength({ min: 1, max:50 }).withMessage('veuillez renseigner un nom utilisateur'),
    body("old_password").exists().notEmpty().escape().trim().isLength({ min: 1, max:50 }).withMessage('veuillez renseigner l"encien mot de passe'),
    body("password").exists().notEmpty().escape().trim().isLength({ min: 1, max:50 }).withMessage('veuillez renseigner un mot de passe'),
];
