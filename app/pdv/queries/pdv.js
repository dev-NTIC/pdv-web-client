const cnx = require("../../../database/connection.js");
/**
 *
 * insert pdv
 */
exports.insertPdv = async (
    username,
    hashedPassword,
    nom,
    prenom,
    phone,
    address,
    location,
    rc,
    registre_commerce,
    pdvstatus_id,
    pdvgrade_id,
    user_id,
    region,
    date_naissance,
    connection = cnx
) => {
    var sql = `
    INSERT INTO pdv(
    pdvname,
    password,
    contactname,
    phone,
    address,
    location, 
    rc,
    registre_commerce,
    pdvstatus_id,
    pdvgrade_id,
    user_id,
    region
    )
    VALUES(?,?,?,?,?,?,?,?,?,?,?,?)`;

    await connection.execute(sql, [
        username,
        hashedPassword,
        `${nom} ${prenom}`,
        phone,
        address,
        location,
        rc,
        registre_commerce,
        pdvstatus_id,
        pdvgrade_id,
        user_id,
        region,
    ]);
};

exports.getPdvByName = async (name, connection = cnx) => {
    try {
        const sql = `select * from pdv where pdvname = ? limit 1`;
        const [res] = await connection.execute(sql, [name]);
        return res.length > 0 ? res[0] : null;
    } catch (error) {
        return error;
    }
};

exports.getPdvById = async (id, connection = cnx) => {
    try {
        const sql = `select * from pdv where id = ? limit 1`;
        const [res] = await connection.execute(sql, [id]);
        return res.length > 0 ? res[0] : null;
    } catch (error) {
        return error;
    }
};

exports.getPdvSaleCount = async (id, connection = cnx) => {
    try {
        const sql = `select count(*) as salesCount from vent where Pdv_id = ? limit 1`;
        const [res] = await connection.execute(sql, [id]);
        return res.length > 0 ? res[0].salesCount : null;
    } catch (error) {
        return error;
    }
};

exports.updatePdv = async (id, username, password, connection = cnx) => {
    try {
        //test $2b$10$qMjLqHwjuNbqoec1rWrV8uGuSBtitBLpVp4rkP7I3MZJyjnavaqk2
        console.log("update " + username + " " +password);
        const sql = `update pdv set pdvname =?, password =? where pdv.id =?`;
        await connection.execute(sql, [username, password, id]);
    } catch (error) {
        return error;
    }
};

exports.updatePdvPoints = async (id, points, connection = cnx) => {
    try {
        const sql = `update pdv set points = ? where pdv.id =?`;
        await connection.execute(sql, [points, id]);
    } catch (error) {
        return error;
    }
};

exports.getPdvSales = async (id, connection = cnx) => {
    try {
        const sql = `SELECT * FROM vent v LEFT JOIN client c ON v.Client_id = c.id  left join product p on v.Product_id = p.id where v.Pdv_id=?`;
        const result = await connection.execute(sql, [id]);

        return result[0];
    } catch (error) {
        return error;
    }
};
