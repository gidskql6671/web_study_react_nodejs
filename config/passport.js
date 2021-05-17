const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../lib/models/User');

// initialize & session 반환
exports.initialize = () => {return passport.initialize();}
exports.session = () => {return passport.session();}

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
		User.findOne({username: username}, (err, user) => {
			// DB 에러
			if (err)
				return done(err);
			// username에 맞는 사용자가 없는 경우
			if (!user)
				return done(null, false, {message: 'Incorrect username.'});
			// password가 틀린 경우
			if (!user.validPassword(password))
				return done(null, false, {message: 'Incorrect password.'});
			// 로그인 성공
			return done(null, user);
		})
	})
);