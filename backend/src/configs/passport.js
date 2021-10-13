const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

module.exports = () => {
	// Serialize & Deserialize User
	passport.serializeUser((user, done) => {
		done(null, user.id);
	});
	passport.deserializeUser((id, done) => {
		User.findOne({id : id}, (err, user) => {
			if (err) return done(err);
			done(null, user);
		});
	});
	

	// passport local strategy
	passport.use('local',
		new LocalStrategy({
			usernameField: 'id',
			passwordField: 'password'
		},
		(id, password, done) => {
			User.findOne({ id: id }, (err, user) => {
				// DB 에러
				if (err)
					return done(err);
				// id에 맞는 사용자가 없는 경우
				if (!user)
					return done(null, false, {message: 'Incorrect id.'});
				// password가 틀린 경우
				if (!user.validPassword(password))
					return done(null, false, {message: 'Incorrect password.'});
				// 로그인 성공
				return done(null, user);
			})
		})
	);
}