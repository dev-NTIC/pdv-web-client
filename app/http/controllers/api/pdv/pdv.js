const { getPdvSales } = require("../../../../pdv/queries/pdv");

exports.getPdvSalesEndpoit = async (req, res, next) => {
    try {

        const sales = await getPdvSales(req.user.id);

        res.status(200).send({ data: sales });

    } catch (err) {
        next(err);
    }
};
