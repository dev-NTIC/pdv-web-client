const algeria = require("../../../../../algeria_new.json");
const fs = require("fs");
const { dirname } = require("path");
const appDir = dirname(require.main.filename);
const bcrypt = require("bcrypt");
const { matchedData } = require("express-validator");
const {
    getPdvByName,
    insertPdv,
} = require("../../../../pdv/queries/pdv.js");

exports.signupEndpoint = async (req, res, next) => {
    try {
        console.log(matchedData(req));
        const {
            username,
            password,
            nom,
            prenom,
            phone,
            address,
            location,
            rc,
            wilaya,
            date_naissance,
        } = matchedData(req);

        const result = await getPdvByName(username);

        if (result) {
            //TODO : create exceptions for these
            res.status(400).send({data:"nom utilisateur existe!"});
            return;
        }

        // Image added
        registre_commerce = req.files[0].originalname ? appDir + "/uploads/" + Date.now() + "-" + req.files[0].originalname : "";

        fs.writeFile(registre_commerce, req.files[0].buffer, function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("The file was saved!");
        });

        console.log("***************" + registre_commerce);

        console.log("----------------------------------");

        console.log("registre de commerce : ", registre_commerce);
        console.log("-----------------------------------");

        // getting la region :
        // getting the region :

        //check if region is not null
        let region = algeria.filter((e) => e.wilaya.toLowerCase() === wilaya);

        console.log("the signup pdv mobile ");
        console.log("la wilaya est : ", wilaya);

        //

        region = region.length > 0 ? region[0].region : "";

        console.log("la region est : ", region);

        const hashedPassword = await bcrypt.hash(password, 10);

        await insertPdv(
            username,
            hashedPassword,
            nom,
            prenom,
            phone,
            address,
            location,
            rc,
            registre_commerce,
            1,
            1,
            1,
            region,
            date_naissance,
        );

        res.status(201).send({data:'inscription avec success, votre compte est en attente de validation'});
    } catch (error) {
        next(err);
    }
};
