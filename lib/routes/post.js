/* post data 관리 */
const express = require('express');
const router = express.Router();
const moment = require('moment'); require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");
const { isAuthenticated } = reqlib('config/passport.js');
					 
// mongoose Post Model 생성
const Post = require('../models/Post.js');
const Counter = require('../models/Counter.js');

// Post Service
const postService = require('../services/postService.js');


/* 
------ GET Method ------
*/

/* Post 데이터 전체를 가져와서, 사용자에게 보여준다. */
router.get('/', (req, res) => {
	// 쿼리에 맞게 데이터를 들고옴.
	let query = req.query;
	
	// user -> reg_name으로 바꿔주는 과정
	if (query.hasOwnProperty('user')){
		query.reg_name = query.user;
		delete query.user;
	}
	
	postService.getPost(query)
	.then(data => {
		const posts = data.map(element => {
			if (element.content.length > 100){
				element.content = element.content.slice(0, 150) + "...";
			}

			const tags = element.tags.map(tag =>{
				if (tag.length > 10)
					tag = tag.slice(0, 10) + "...";
				return tag;
			})
			element.tags = tags;

			return element;
		})

		res.render('board/index', {posts, errorMessages: req.flash('boardError')});
	})
	.catch(err => res.render('error', {message: err}));
	
})

/* 글쓰기 페이지를 보내준다. */
router.get('/write', isAuthenticated, (req, res) => {
	let prevContent = {_id: null, title:"", content: "", tags: ""};
	
	if (req.query.postId){
		const postId = parseInt(req.query.postId);
		
		postService.getPost({id: postId})
		.then(post => {
			prevContent._id = post._id;
			prevContent.title = post.title;
			prevContent.content = post.content;
			prevContent.tags = post.tags.join(', ');

			res.render('board/write', {prevContent, isEdit: true});
		})
		.catch( err => res.render('error', {message: err}));
	}
	else{
		res.render('board/write', {prevContent, isEdit: false});
	}
})


/* Post들을 전부 지운다. 디버그용!@!!@ */
router.get('/deleteAll', (req, res) => {
	postService.deletePost({})
	.then(deletedCount => res.redirect('/post'))
	.catch(err => res.render('error', {message: err}));
});

/* id에 일치하는 post를 보여준다 */
router.get('/:postId', (req, res) => {
	const postId = parseInt(req.params.postId);
	
	postService.getPostOne({id: postId})
	.then( post => {
		let isOwner = false;
		if (req.isAuthenticated()){
			if (req.user.type == "admin"){
				isOwner = true;
			}
			if (req.user.id == post.reg_id){
				isOwner = true;
			}
		}
		res.render('board/detail', { post, isOwner });
	})
	.catch( err => res.render('error', {message: "존재하지 않는 게시물입니다."}));
});

/* 
------ POST Method ------
*/

/* Post를 만든다. */
router.post('/', isAuthenticated, (req, res) => {
	const data = {
		title: req.body.title, 
		content: req.body.content,
		tags: req.body.tags,
		reg_id: req.user.id,
		reg_name: req.user.name
	}
	
	postService.createPost(data)
	.then((id) => res.redirect('/post/' + id))
	.catch(err => res.render('error', {message: err}));
});


/* 
------ PATCH Method ------
*/

/* post를 수정한다. */
router.patch('/:postId', isAuthenticated, (req, res) => {
	const postId = parseInt(req.params.postId);
	
	postService.getPost({id: postId})
	.then(post => {
		// 게시글 작성자인지 확인
		if (req.user.id != post.reg_id)
			return res.render('error', {message: "작성자가 아닙니다."});
		
		const tags = req.body.tags.split(',').map(item => item.trim());
		
		return postService.updatePost({id: postId}, {
			title: req.body.title,
			content: req.body.content,
			tags: tags
		});
	})
	.then(() => res.redirect('/post/'+postId))
	.catch(err => res.render('error', {message: err}));
})

/* 
------ DELETE Method ------
*/

/* id와 일치하는 post를 지운다. */
router.delete('/:postId', isAuthenticated, (req, res) => {
	const postId = parseInt(req.params.postId);
	
	postService.getPost({id: postId})
	.then(posts => {
		let promises = [];
		
		posts.forEach(post => {
			// 어드민이 아니면서 게시글 작성자가 아닐 경우
			if (req.user.type !== "admin" && post.reg_id != req.user.id){
				return;
			}
			
			promises += postService.deletePost({id: post.id});
		})
		
		return Promise.all(promises);
	})
	.then(() => res.redirect('/post'))
	.catch(err => res.render('error', {message: err}));
});



module.exports = router;