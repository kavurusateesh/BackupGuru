var LocalStrategy = require('passport-local').Strategy;
const db = require("../models");
const User = db.users;
var passport = require('passport');
var encryption = require('../helpers/Encryption');


module.exports = function(passport) {
//Serialize sessions
passport.serializeUser(function (user, done) {
	done(null, user.id);
});

passport.deserializeUser(function (id, done) {
	User.findOne({where:{'id': id}}).then(function (user) {
		if (user.id) {
			done(null, user);
		}
	});
});

//Use local strategy
passport.use(new LocalStrategy( 
	{
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback : true
	},
	function (req, email, password, done) {
		var email = encryption.encryptData(email);
		var user_type = encryption.encryptData(req.body.role);
		User.findOne( {where:{ "email": email, "user_type": user_type } }).then(function (user) {
			if (!user) {
				console.log('Unknown user');
				return done(null, false, 'Invalid Email, Please check again.');
			} else if (user.password != password) {
				console.log('Invalid password')
				return done(null, false, 'Invalid password, Please check again.');
			} else {
				return done(null, user);
			}
        })
        .catch(err => {
            console.log('err ps', JSON.stringify(err));
            return done(err);
		})
	}
));

}