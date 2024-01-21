const cnx = require("../../../database/connection.js");
const DbError = require("../Errors/DbError");


exports.insertClient = async (
    nom, prenom, phone, address, connection = cnx
) => {
    try {
        var sql = `
            INSERT INTO client(nom, prenom, phone, address)
            VALUES(?,?,?,?)`;
        return await connection.execute(sql, [nom, prenom, phone, address]);
    } catch(err) {
        throw DbError(err.message);
    }
}