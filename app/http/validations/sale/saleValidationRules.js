const { body } = require("express-validator");

exports.saleValidationRules = [
    //TODO : translate error messages
    body("nom").exists().notEmpty().escape().trim().isLength({ min: 1, max:50 }).withMessage('veuillez renseigner un nom valide'),
    body("prenom").exists().notEmpty().escape().trim().isLength({ min: 1, max:50 }).withMessage('veuillez renseigner un prenom valide'),
    body("phone").exists().notEmpty().escape().trim().isLength({ min: 1, max:50 }).matches(/^(05|06|07)[0-9]{8}$/).withMessage('veuillez renseigner un numero de téléphone valide'),
    body("address").exists().notEmpty().escape().trim().isLength({ min: 1, max:255 }).withMessage('veuillez renseigner une address'),
    body("serial_number").exists().notEmpty().escape().trim().withMessage('veuillez renseigner un numero de serie'),
    body("product_id").exists().notEmpty().escape().trim().withMessage('veuillez renseigner un produit'),
];
