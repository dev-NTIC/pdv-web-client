const { body } = require("express-validator");

exports.signupValidationRules = [
    //check required format and size for each field
    //translate error messages
    body("username").exists().notEmpty().escape().trim().isLength({ min: 1, max:50 }).withMessage('veuillez renseigner un nom utilisateur valide'),
    body("nom").exists().notEmpty().escape().trim().isLength({ min: 1, max:50 }).withMessage('veuillez renseigner un nom utilisateur valide'),
    body("password").exists().notEmpty().escape().trim().isLength({ min: 1, max:50 }).withMessage('veuillez renseigner un mot de passe'),
    body("date_naissance").custom((value, { req }) => {

        if(!req.body.date_naissance){
            throw Error('veuillez renseigner une date valide');
        }

        const date = new Date(req.body.date_naissance);
        if(!date){
            throw Error('veuillez renseigner une date valide'); 
        }


        return true;
       
    }),
    body("prenom").exists().notEmpty().escape().trim().isLength({ min: 1, max:50 }).withMessage('veuillez renseigner un prénom valide'),
    body("address").exists().notEmpty().escape().trim().isLength({ min: 1, max:255 }).withMessage('veuillez renseigner une address valide'),
    body("rc").exists().notEmpty().escape().trim().isLength({ min: 1, max:50 }).withMessage('veuillez renseigner le numero de registre de commerce'),
    body("wilaya").custom((value, { req }) => {
        const wilayas = ['Adrar', 'Chlef', 'Laghouat', 'Oum El Bouaghi', 'Batna', 'Béjaïa', 'Biskra', 'Béchar', 'Blida', 'Bouira', 'Tamanrasset', 'Tébessa', 'Tlemcen', 'Tiaret', 'Tizi Ouzou', 'Alger', 'Djelfa', 'Jijel', 'Sétif', 'Saïda', 'Skikda', 'Sidi Bel Abbès', 'Annaba', 'Guelma', 'Constantine', 'Médéa', 'Mostaganem', "M'Sila", 'Mascara', 'Ouargla', 'Oran', 'El Bayadh', 'Illizi', 'Bordj Bou Arreridj', 'Boumerdès', 'El Tarf', 'Tindouf', 'Tissemsilt', 'El Oued', 'Khenchela', 'Souk Ahras', 'Tipaza', 'Mila', 'Aïn Defla', 'Naâma', 'Aïn Témouchent', 'Ghardaïa', 'Relizane', 'Timimoun', 'Bordj Badji Mokhtar', 'Ouled Djellal', 'Béni Abbès', 'In Salah', 'In Guezzam', 'Touggourt', 'Djanet', 'El Meghaier', 'El Menia'];
        if(!req.body.wilaya.trim()) {
            throw Error("la wilaya n'est pas valide");
        }

        if(wilayas.indexOf(req.body.wilaya.trim()) === -1)
        {  
            throw Error("la wilaya n'est pas valide"); 
        }   
        return true;
    }),
    body("nom").exists().notEmpty().escape().trim().isLength({ min: 1, max:50 }).withMessage('veuillez renseigner un nom valide'),
    body("phone").exists().notEmpty().escape().trim().isLength({ min: 1, max:50 }).matches(/^(05|06|07)[0-9]{8}$/).withMessage('veuillez renseigner un numero de téléphone valide'),
    body("location").exists().notEmpty().escape().trim().isLength({ min: 1, max:50 }).withMessage('veuillez renseigner une localisation'),
    body("registre_commerce").custom((value, { req }) => {
        const allowedMimeTypes = ["image/png", "image/jpg", "image/jpeg","application/pdf"];
       
        if (!req?.files || !req?.files[0]) {
            throw Error("fichier registre commerce est requis");
        }
       
        if (!allowedMimeTypes.includes(req?.files[0].mimetype)) {
            throw Error("le format n'est pas valide");
        }

        if (req?.files[0].size > 2 * 1024 * 1024) {
            throw new Error("taille maximal 2 mb");
        }

        return true;
    }),
];