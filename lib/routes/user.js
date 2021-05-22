const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/User.js');
 
/* GET user page. */
router.get('/', function(req, res) {
	res.render('user/index');
});

/* GET login page. */
router.get('/login', function(req, res) {
	let message = req.flash('error');
	res.render('user/login', {error: message});
});

/* POST login */
router.post('/login',
	passport.authenticate('local', { failureRedirect: '/user/login',
										 failureFlash: true}),
	(req, res) => {
	// 기본적으로 홈페이지로 리다이렉트
	let toURL = '/';
	// 돌아갈 URL이 있다면, 그쪽으로 리다이렉트
	if (req.session.returnTo){
		toURL = req.session.returnTo;
		delete req.session.returnTo;
	}
	req.session.save(()=>{
		res.redirect(toURL);
	});
});

/* GET signup page */
router.get('/signup', (req, res) => {
	res.render('user/signup');
});

router.post('/signup', (req, res) => {
	console.log(req.body);
	const user = new User(req.body);
	
	user.save()
		.then(user => res.redirect('/user'))
		.catch(err => res.json({ success: false, err }));
})

/* GET logout page */
router.get('/logout', (req, res) => {
	if (req.isAuthenticated()){
		req.logout();
		req.session.save(()=>{
			res.redirect('/user');
		})
	}
	else{
		res.redirect('/user');
	}
});

module.exports = router;