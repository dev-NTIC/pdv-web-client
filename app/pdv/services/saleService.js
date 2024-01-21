const {newSale} = require("../queries/sales");
const {getPdvById, updatePdvPoints} = require("../queries/pdv");
const {getProductById} = require("../queries/products");
const {getSerialNumberData, updateSerialNumber} = require("../queries/serialNumber");
const {insertClient} = require("../queries/clients");
const ProductAlreadySoldError = require("../Errors/ProductAlreadySoldError");
const NotFoundError = require("../Errors/NotFoundError");
const SerialNumberMismatch = require("../Errors/SerialNumberMismatch");
const cnx = require("../../../database/connection.js");

exports.createNewSale = async (
    nom,
    prenom,
    phone,
    address,
    serial_number,
    pdv_id,
    product_id,
) => {

    const connection = await cnx.getConnection();

    try {
        await connection.beginTransaction();

        const serialNumberData = await _getSerialNumber(serial_number, connection);

        await _checkSerialNumber(serialNumberData, connection);

        await _makeSale(nom, prenom, phone, address, serial_number, pdv_id, product_id, connection);

        await _updatePdvPoints(pdv_id, product_id, connection)
        // Mise à jour de la colonne status = "vendu" de la table serial_number
        await updateSerialNumber(serial_number, connection);

        await connection.commit();

    } catch (err) {

        await connection.beginTransaction();
        throw new Error(err?.message);
    }
};

_getSerialNumber = async (serial_number, connection) => {

    try {
        const serialNumberData = await getSerialNumberData(serial_number,connection);

        if(!serialNumberData) {
            throw new NotFoundError('le numéro de série est introuvable');
        }

        const fetched_serial_number = serialNumberData?.serial_number ?? null;

        if(fetched_serial_number === null) {
            throw new NotFoundError("numéro de serie introuvable");
        }

        return serialNumberData;

    } catch(err) {
        throw err;
    }
}

_checkSerialNumber = async(serialNumber, product_id) => {
    const fetched_product_id = serialNumber?.product_id ?? null;

    if( fetched_product_id === product_id) {
        throw new SerialNumberMismatch();
    }

    if(serialNumber?.status === 'vendu') {
        throw new ProductAlreadySoldError();
    }
}

_makeSale = async (nom, prenom, phone, address, serial_number, pdv_id, product_id, connection) => {
    const resultClient = await insertClient(nom, prenom, phone, address, connection);
    const client_id = resultClient[0].insertId;
    const date = new Date().toISOString();

    // formatting the date cause is causing error in the hosted version with the error
    // Incorrect datetime value: '2023-12-13T11:15:56.280Z' for column 'date' at row 1
    const formattedDate = date.substring(0, 10) + " " + date.substring(11, 19);

    await newSale(formattedDate, pdv_id, product_id, client_id, serial_number, connection);
}

_updatePdvPoints = async (pdv_id, product_id, connection) => {

    const pdv = await getPdvById(pdv_id, connection);

    if(!pdv) {
        throw new NotFoundError("PDV n\'as été pas trouvé");
    }

    const pdv_points = pdv.points;
    const product = await getProductById(product_id, connection);

    if(!product) {
        throw NotFoundError("produit n\'as été pas trouvé");
    }

    const product_points = product.points;
    const new_points = pdv_points + product_points;

    await updatePdvPoints(pdv_id, new_points, connection);
}