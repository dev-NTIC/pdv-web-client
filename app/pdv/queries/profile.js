/** @format */

const cnx = require("../../../database/connection.js");

const getAllgifts = async (connection = cnx) => {
    let sql = `SELECT * FROM cadeaux`;
    return await connection.execute(sql);
};

exports.getAllgifts = getAllgifts;
