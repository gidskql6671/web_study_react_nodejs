const express = require('express');
const passport = require('passport');
const router = express.Router();

const userService = require('../services/userService.js');

const { isAuthenticated } = reqlib('config/passport.js');
 
/* GET user page. */
router.get('/', isAuthenticated, function(req, res) {
	res.render('user/index');
});

/* GET login page. */
router.get('/login', function(req, res) {
	let message = req.flash('error');
	res.render('user/login', {message});
});

/* GET signup page */
router.get('/signup', (req, res) => {
	res.render('user/signup');
});

/* GET logout page */
router.get('/logout', isAuthenticated, (req, res) => {
	req.logout();
	req.session.save(()=>{
		res.redirect('/user');
	})
});

// user가 작성한 게시글을 보여줌
router.get('/post', isAuthenticated, (req, res) => {
	
	res.render('user/post');
});


/*
----- POST -----
*/

/* 로그인 서비스 */
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

/* 회원가입 서비스 */
router.post('/signup', (req, res) => {
	userService.signup(req.body)
	.then(user => res.redirect('/user'))
	.catch(err => res.redirect('error', {message: err}));
})

module.exports = router;