const { matchedData } = require("express-validator");
const {
    getPdvByName,
    getPdvSaleCount,
    updatePdv,
} = require("../../../../../pdv/queries/pdv.js");
const bcrypt = require("bcrypt");

exports.getProfleEndPoint = async (req, res, next) => {
    try {

        const profile = await getPdvByName(req?.user?.pdvname);
        const salesCount = await getPdvSaleCount(req?.user?.id);

        res.status(200).send({ data: { ...profile, salesCount: salesCount } });

    } catch (err) {
        next(err);
    }
};

//Move to service
exports.updateProfileEndpoint = async (req, res, next) => {

    try {
        const validatedData = matchedData(req);
        const username = validatedData.username ?? req.user.pdvname;
        const pdv = await getPdvByName(username);

        if (pdv && pdv.pdvname !== req.user.pdvname) {
            res.status(400).send({data:"nom utilisateur exist!"});
            return;
        }

        if (!validatedData.old_password) {
            res.status(400).send({data:"veuillez saisire l'encien mot de passe!"});
            return;
        }

        if (validatedData.password && validatedData.old_password) {
            console.log("password and old password");
            if(await bcrypt.compare(validatedData.old_password, pdv.password)) {

                let hashedpassword = await bcrypt.hash(validatedData.password, 10);
                await updatePdv(req.user.id, username, hashedpassword);

                return res.status(200).send({data: {success: "ok"}});

            } else {
                res.status(400).send({data: "encient mot de passe érroné"});
            }
        } else if(!validatedData.password && !validatedData.old_password) {
            await updatePdv(req.user.id, username, req.user.password);

            return res.status(200).send({data: {success: "ok"}});
        }

    } catch (err) {
        next(err);
    }
};
