exports.createSale = async (req, res) => {
    res.render("dashboard/sales/sale");
};

exports.salesIndex = async (req, res) => {
    res.render("dashboard/sales/index");
};