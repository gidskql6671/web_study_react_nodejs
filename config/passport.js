const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../lib/models/User');

// Serialize & Deserialize User
passport.serializeUser((user, done) => {
	done(null, user.id);
})
passport.deserializeUser((id, done) => {
	User.findOne({})
})

// 추후 작업...