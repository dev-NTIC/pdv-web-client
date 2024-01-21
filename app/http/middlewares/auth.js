/** @format */

// DASHBOARD PART
exports.checkAuthenticated = (req, res, next) => {
    const paths = ["/login"];
    if (paths.includes(req.path)) {
        return next();
    }

    if (req.isAuthenticated() && req.user.pdvstatus_id === 2) {
        return next();
    }
    res.redirect("/login");
};


exports.apiCheckAuthenticated = (req, res, next) => {

    if (req.isAuthenticated() && req.user.pdvstatus_id === 1) {
        res.status(401).send({data: "inscription en attente de validation"});
    } else if (req.isAuthenticated() && req.user.pdvstatus_id === 2) {
        return next();
    } else {
        res.status(401).send({data: "utilisateur non authentifié"});
    }
};