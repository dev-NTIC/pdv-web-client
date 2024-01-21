const { getAllgifts } = require("../../../../../pdv/queries/gifts.js");

exports.getAllGiftsEndpoint = async (req, res) => {
    try {
        const gifts = await getAllgifts();
        res.status(200).send({ data: gifts });
    } catch (err) {
        res.send(err.message);
    }
};
