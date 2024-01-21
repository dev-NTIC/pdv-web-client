/** @format */

const cnx = require("../../../database/connection.js");
const DbError = require("../Errors/DbError");

const getAllGifOrderByPdvId = async (id, connection = cnx) => {
    try {
        let sql = `SELECT * FROM gain where pdv_id = ?`;
        return await connection.execute(sql, [id]);
    } catch(err) {
        throw DbError(err.message);
    }

};

const createGiftOrder = async (
    title,
    points,
    previous_points,
    current_points,
    status,
    date,
    pdv_id,
    connection = cnx
) => {
    console.log({
        title,
        points,
        previous_points,
        current_points,
        status,
        date,
        pdv_id,
    });
    let sql = `
        INSERT INTO gain(title, points, previous_points, current_points, status, date, pdv_id)
        VALUES(?,?,?,?,?,?,?)`;
    await connection.execute(sql, [
        title,
        points,
        previous_points,
        current_points,
        status,
        date,
        pdv_id,
    ]);
};
exports.getAllGifOrderByPdvId = getAllGifOrderByPdvId;
exports.createGiftOrder = createGiftOrder;
