const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../lib/models/User');

// Serialize & Deserialize User
passport.serializeUser((user, done) => {
	done(null, user.id);
});
passport.deserializeUser((id, done) => {
	User.findOne({user_id: id}, (err, user) => {
		done(err, user);
	});
});


// passport local strategy
passport.use('local-login',
	new LocalStrategy({
		usernameField: 'username',
		passwordField: 'password',
		passReqToCallback: true
	},
	(req, username, password, done) => {
		User.findOne({username: username})
		.select({password: 1})
		.exec((err, user) => {
			if (err) return done(err);
			

// 추후 작업...
		})
}
	
	)
);