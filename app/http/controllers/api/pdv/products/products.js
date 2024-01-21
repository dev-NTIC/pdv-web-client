const { getAllProducts } = require("../../../../../pdv/queries/products");

exports.getAllProductsEndroint = async (req, res, next) => {
    try {

        const products = await getAllProducts();
        res.status(200).send({ data: products });

    } catch (err) {
        next(err);
    }
};
