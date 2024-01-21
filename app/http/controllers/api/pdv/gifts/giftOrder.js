const {
    getGiftById,
} = require("../../../../../pdv/queries/gifts");
const {
    getAllGifOrderByPdvId,
    createGiftOrder,
} = require("../../../../../pdv/queries/giftsOrder");

exports.getAllPdvGiftOrders = async (req, res, next) => {
    try{

        const giftOrders = await getAllGifOrderByPdvId(req.user.id);
        res.status(200).send({ data: giftOrders[0] });

    } catch (err) {
        next(err);
    }

};

exports.createGiftOrderEndPoint = async (req, res, next) => {

    try{
        const gift = await getGiftById(req?.body?.gift_id);

        const date = new Date().toISOString();
        const formattedDate = date.substring(0, 10) + " " + date.substring(11, 19);

        if(gift.points > req.user.points) {
            res.status(400).send({ data: "nombre de points insuffisants" });
        } else {
            await createGiftOrder(gift.title, gift.points, null, null, "Commandé", formattedDate, req.user.id);
            res.status(200).send({ data: "commande réalisée avec sucess"});
        }
    } catch(err){
        next(err);
    }


};