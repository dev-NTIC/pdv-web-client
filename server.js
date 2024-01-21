const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");
const { mobileApi } = require("./routes/api/api");
const { webRoutes, webDashboardRoutes} = require("./routes/web/dashboard");
require("dotenv").config();
const app = express();
const port = process.env.Port || 3002;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Access-Control-Allow
//TODO : move to configuration
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
    );
    next();
});

/*auth middleware  */
//TODO : move this to middleware
const passport = require("passport");
const session = require("express-session");
const initializePassport = require("./app/http/middlewares/local.js");
const {ErrorHandler} = require("./errorHandler");
const {webAuthRoutes} = require("./routes/web/auth");

initializePassport(
    passport
);

//TODO : move this to configuration
app.use(
    session({
        secret: "test", //process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 24 * 60 * 60 * 1000,
        },
    })
);
app.use(passport.initialize({}));
app.use(passport.session());

// setup templates folder
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//setup static folder
app.use(express.static(path.join(__dirname, "public")));
//app.use('/dashboard/profile-update', express.static('public')); 
app.use('/login', express.static('public')); 
app.use(express.static(path.join(__dirname, "uploads")));

/* api routes*/
app.use(mobileApi);

/* web routes*/
app.use(webAuthRoutes);
app.use(webDashboardRoutes);

app.use(ErrorHandler);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
