const {matchedData} = require("express-validator");
const {createNewSale} = require("../../../../../pdv/services/saleService");

exports.createSaleEndpoint = async (req, res, next) => {
    try {

        const { nom, prenom, phone, address, serial_number, product_id} =
            matchedData(req);

        await createNewSale(nom, prenom, phone, address, serial_number, req?.user?.id, product_id);

        res.status(200).send({ data: "vente réalisé avec success" });

    } catch (err) {
        next(err);
    }
};
