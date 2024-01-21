/** @format */
/** @format */

const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const { getPdvByName, getPdvById } = require("../../pdv/queries/pdv");
function initialize(passport) {
    const authenticateUser = async (username, password, done) => {
       
        const pdv = await getPdvByName(username);
        console.log(pdv);
        if (pdv == null || pdv instanceof Error) {
            return done(null, false, {
                message: "1|Utilisateur n'existe pas ! |",
            });
        }

        try {

            if (await bcrypt.compare(password, pdv.password)) {
               
                return done(null, pdv);
            } else {
               
                return done(null, false, {
                    message: "2|Mot de passe incorrect !|",
                });
            }
        } catch (e) {
            return done(e);
        }
    };

    passport.use(
        new LocalStrategy({ usernameField: "username" }, authenticateUser)
    );
    passport.serializeUser(async (pdv, done) => done(null, pdv.id));
    passport.deserializeUser(async (id, done) => {
        return await done(null, await getPdvById(id));
    });
}

module.exports = initialize;
