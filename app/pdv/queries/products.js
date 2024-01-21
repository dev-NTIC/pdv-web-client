/** @format */

const cnx = require("../../../database/connection.js");
const DbError = require("../Errors/DbError");

const getAllProducts = async (connection = cnx) => {
    try {
        const sql = `SELECT * FROM product`;
        const result = await connection.execute(sql);

        return result[0];

    } catch(err) {
        throw DbError(err.message);
    }

};

const getProductById = async (product_id, connection = cnx) => {
    try {

        const sql = `SELECT * FROM product where id = ?`;
        const result = await connection.execute(sql,[product_id]);

        return result[0][0];

    } catch(err) {
        throw DbError(err.message);
    }

}

exports.getAllProducts = getAllProducts;
exports.getProductById = getProductById;
