const cnx = require("../../../database/connection.js");



exports.getSerialNumberData = async (
    serial_number, connection = cnx
) => {
    try {
        const result = await connection.execute(
            `select * from serial_number where serial_number = ? LIMIT 1`
            , [serial_number]);

        return result[0][0];

    } catch(err) {
        throw DbError(err.message);
    }
}

exports.updateSerialNumber = async (
    serial_number, connection = cnx
) => {
    try {
        const result = await connection.execute(
            `update serial_number set serial_number.status = "vendu" where serial_number = ?`
            , [serial_number]);
        return result;

    } catch(err) {
        throw DbError(err.message);
    }
}