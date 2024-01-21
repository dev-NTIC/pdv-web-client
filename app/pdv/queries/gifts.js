/** @format */

const cnx = require("../../../database/connection.js");
const DbError = require("../Errors/DbError");

const getAllgifts = async (connection = cnx) => {
    try {
        const sql = `SELECT * FROM cadeaux`;
        const result =  await connection.execute(sql);

        return result[0];

    } catch(err) {
        throw new DbError(err.message);
    }
};
const getGiftById = async (id, connection = cnx) => {

    console.log(id);
    try {
        const sql = `SELECT * FROM cadeaux where id = ?`;
        const result = await connection.execute(sql, [id]);

        return result[0][0];

    } catch(err) {
        throw new DbError(err.message);
    }
};

exports.getAllgifts = getAllgifts;
exports.getGiftById = getGiftById;
