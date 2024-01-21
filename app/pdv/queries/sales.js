const cnx = require("../../../database/connection.js");

exports.insertSale = async (
    nom,
    prenom,
    phone,
    address,
    serial_number,
    pdv_id,
    product_id,
    connection = cnx
) => {

    try {
        let result = await connection.execute(
            `SELECT * FROM serial_number where serial_number = ? ORDER BY id DESC LIMIT 1`
        , [serial_number]);

        if(result instanceof Error) {

            throw new Error("une erreur c'est produite veuillez réesayer plus tard");
        }

        const fetched_serial_number = result[0][0]?.serial_number ?? null;

        const fetched_product_id = result[0][0]?.serial_number ?? null;

        if(fetched_serial_number === null) {

            throw new Error("numéro de serie introuvable");
        }

        if( fetched_product_id === product_id) {
            throw new Error("numéro de serie ne correspond pas au produit");
        }

        console.log(result[0][0].status);

        if(result[0][0].status === 'vendu') {

            throw new Error("produit déja vendu");
        }


        var sql = `
            INSERT INTO client(nom, prenom, phone, address)
            VALUES(?,?,?,?)`;
        await connection.execute(sql, [nom, prenom, phone, address]);

        var client = await connection.execute(
            `SELECT id FROM client ORDER BY id DESC LIMIT 1;`
        );
        var client_id = client[0][0].id;

        var date = new Date().toISOString();
        // formatting the date cause is causing error in the hosted version with the error
        // Incorrect datetime value: '2023-12-13T11:15:56.280Z' for column 'date' at row 1
        const formattedDate =
            date.substring(0, 10) + " " + date.substring(11, 19);

        var sql = `INSERT INTO vent (id, date, Pdv_id, Product_id, Client_id, serial_number) VALUES (NULL, ?, ?, ?, ?, ?);`;

        // await db.execute(sql, [mac, date, pdv_id, product_id, client_id]);
        await connection.execute(sql, [
           
            formattedDate,
            pdv_id,
            product_id,
            client_id,
            serial_number,
        ]);

        //TODO : check that pdv exists
        var sql = `SELECT points FROM pdv WHERE id = ?`;

        var pdv = await connection.execute(sql, [pdv_id]);
        var pdv_points = pdv[0][0].points;


        var sql = `SELECT points FROM product WHERE id = ?`;
        var product = await connection.execute(sql, [product_id]);
        var product_points = product[0][0].points;


        var new_points = pdv_points + product_points;
        var sql = `UPDATE pdv SET points = ? WHERE id = ?`;
        await connection.execute(sql, [new_points, pdv_id]);

        // Mise à jour de la colonne status = "vendu" de la table serial_number
        // not working
        var sql = `update serial_number set serial_number.status = "vendu" where serial_number = ?`;
        await connection.execute(sql, [serial_number]);
    } catch (err) {

        throw new Error(err?.message);
    }
};


exports.newSale = async (
    date, pdv_id, product_id, client_id, serial_number, connection = cnx
) => {
    try {
        var sql = `INSERT INTO vent (id, date, Pdv_id, Product_id, Client_id, serial_number) VALUES (NULL, ?, ?, ?, ?, ?);`;

        // await db.execute(sql, [mac, date, pdv_id, product_id, client_id]);
        await connection.execute(sql, [
            date,
            pdv_id,
            product_id,
            client_id,
            serial_number,
        ]);
    } catch(err) {
        throw DbError(err.message);
    }
}