/*********************/
/* auth pages routes */
/*********************/
const {getPdvByName} = require("../../../../../../pdv/queries/pdv");
exports.loginPage =  (req, res) => {
    res.render("login");
};

exports.defaultPage = async (req, res) => {
    res.render("login");
};

exports.registerPage = async (req, res) => {
    res.render("register");
};

exports.logoutPage = async (req, res,next) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/login');
    });
};

exports.login = async (req, res, next) => {

    const user = await getPdvByName(req.body.username);
    req.login(user, function(err) {
        if (err) {
            next(err);
        } else if(req.isAuthenticated() && req.user.pdvstatus_id === 2) {

            res.redirect('/dashboard/sales');

        } else if(req.isAuthenticated() && req.user.pdvstatus_id === 1) {

            return res.status(401).send({data:"inscription en attente de validation"});

        } else {

            return res.status(401).send({data:"login erroné"});
        }
    });

};