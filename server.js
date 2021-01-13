const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var passport = require('passport');
const moment = require('moment-timezone');
var session = require('express-session');
var cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
dotenv.config();

moment.tz.setDefault('America/Chicago');
const app = express();

var corsOptions = {
  credentials: true,
  origin: true,
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));


// global.session;
var session;
app.use(session({
    key: 'user_sid',
    secret: 'somerandonstuffs',
    resave: true,
    saveUninitialized: true,
    cookie: {
        expires: 600000
    }
}));
// parse requests of content-type - application/json
app.use(bodyParser.json({ limit: '50mb' }));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next) {

	/*if((req.headers['postman-token'] !==undefined || req.headers['postman-token'] != null || req.headers['postman-token'] > 0) && !(req.ip.includes('122.163.176.191') || req.ip.includes('::1') )) {
		console.log("Access denied !!");
		res.send({'message': "Not Authorized"});
		return false;
	}*/

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// logging middleware
var num = 0;
app.use(function (req, res, next) {
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    var method = req.method;
    var url = req.url;

    console.log('\n- - - - - - - - - - - -\n'+(++num) + ". IP " + ip + " " + method + " " + url+'\n- - - - - - - - - - - -\n');
    next();
});

const db = require("./app/models");

db.sequelize.sync();

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Cloud 911 application." });
});

require("./app/routes/user_routes")(app);
require("./app/routes/subscription_routes")(app);

app.use('/logout', function(req, res, next) {
 // req.session.user_id = "";
  //req.session.user_type = "";
 // req.session.destroy();
  res.redirect(302, '/');
});


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
