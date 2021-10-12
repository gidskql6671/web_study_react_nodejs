const express = require('express');
const passport = require('passport');
const router = express.Router();

const userService = require('../services/userService.js');
const postService = require('../services/postService.js');

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
	const content = {}
	res.render('user/signup', {content});
});

/* GET logout page */
router.get('/logout', isAuthenticated, (req, res) => {
	req.logout();
	req.session.save(()=>{
		res.redirect('/user');
	})
});

// user 정보 수정 페이지를 보여줌
router.get('/edit', isAuthenticated, (req, res) => {
	
	res.render('user/edit');
})


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
	.catch(err => {
		if (err == "idExists"){
			const content = req.body;
			content.id = "해당 아이디는 이미 존재합니다."
			return res.render('user/signup', {content});
		}
		if (err == "nameExists"){
			const content = req.body;
			content.name = "해당 이름은 이미 존재합니다."
			return res.render('user/signup', {content});
		}
		
		return res.render('error', {message: err})
	});
})


/*
----- PUT -----
*/


/* 
유저정보 수정 라우터.
유저 이름 수정시, 기존 게시물들의 작성자명도 같이 변경함.
*/
router.put('/edit', isAuthenticated, (req, res) => {
	req.user.name = req.body.name;
	req.user.email = req.body.email;
	
	userService.changeInfo(req.user)
	.then(user => postService.updatePost({reg_id: req.user.id}, {reg_name: req.user.name}))
	.then(data => res.redirect('/user'))
	.catch(err => res.render('error', {message: err}));
	
})


/*
----- DELETE -----
*/

/*
회원탈퇴 라우터
회원탈퇴시 작성한 게시물을 삭제함.
*/
router.delete('/', isAuthenticated, (req, res) => {
	postService.deletePost({reg_id: req.user.id})
	.then(() => userService.deleteUser({id: req.user.id}))
	.then(() => res.redirect('/'))
	.catch(err => res.render('error', {message: err})); 
})


module.exports = router;