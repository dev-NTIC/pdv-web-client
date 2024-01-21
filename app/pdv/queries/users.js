const cnx = require("../../../database/connection.js");

const getUserById = async (connection = cnx) => {
    try {
        // const sql = `SELECT * FROM user WHERE id = ?`;
        const sql = `SELECT user.*, usertype.type as type FROM user, usertype WHERE user.id = ?
      and usertype.id = user.usertype_id`;

        const [res] = await connection.execute(sql, [id]);
        if (res.length > 0) return res[0];
        return null;
    } catch (error) {
        return error;
    }
};
const getUser = async (connection = cnx) => {
    try {
        // const sql = `SELECT * FROM user WHERE email = ?`;
        const sql = `SELECT user.*, usertype.type as type FROM user, usertype WHERE email = ? 
      and usertype.id = user.usertype_id`;

        const [res] = await connection.execute(sql, [username]);
        if (res.length > 0) return res[0];
        return null;
    } catch (error) {
        return error;
    }
};

const getUserByEmail = async (req, res) => {
    try {
        console.log("get the user by the email ");
        let email = req.body.email || req.query.email;
        console.log("the eamil is ", email);

        if (!email) {
            return res.status(401).json({ message: "data missing " });
        }
        const user = await UserModel.getUser(email);
        return res.status(200).json({
            userExists: user,
        });
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Internal server error " + error.message });
    }
};

exports.getUserById = getUserById;
exports.getUser = getUser;
exports.getUserByEmail = getUserByEmail;
