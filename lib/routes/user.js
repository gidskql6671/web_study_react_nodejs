const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/User.js');
 
/* GET user page. */
router.get('/', function(req, res) {
	if (req.user){
		const data = {user: {name: req.user.name, email: req.user.email}};
		res.render('user/index', data);
	}
	else{
		res.render('user/index');
	}
});

/* GET login page. */
router.get('/login', function(req, res) {
	let message = req.flash('error');
	res.render('user/login', {error: message});
});

/* POST login */
router.post('/login',
	passport.authenticate('local-login', { failureRedirect: '/user/login',
										 failureFlash: true}),
	(req, res) => {
		req.session.save(()=>{
			res.redirect('/user');
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
	req.logout();
	req.session.save(()=>{
		res.redirect('/user');
	})
});

module.exports = router;