const express = require('express');
const passport = require('passport');
const router = express.Router();
 
/* GET user page. */
router.get('/', function(req, res) {
	res.render('user/index');
});

/* GET login page. */
router.get('/login', function(req, res) {
	res.render('user/login');
});

/* POST login */
router.post('/login',
	passport.authenticate('local-login', { failureRedirect: '/user/login'}),
	(req, res) => {
		req.session.save(()=>{
		res.redirect('/user');
	})
});

/* GET signup page */
router.get('/signup', (req, res) => {
	res.render('user/signup');
});

/* GET logout page */
router.get('/logout', (req, res) => {
	req.logout();
	req.session.save(()=>{
		res.redirect('/user');
	})
});

module.exports = router;