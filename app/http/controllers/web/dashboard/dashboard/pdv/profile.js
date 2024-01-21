exports.profileUpdate = async (req, res) => {
    res.render("dashboard/profile/update", {user: req.user});
};