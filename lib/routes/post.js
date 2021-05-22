/* post data 관리 */
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const db = mongoose.connection;
const moment = require('moment'); require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");
					 
// mongoose Post Model 생성
const Post = require('../models/Post.js');
const Counter = require('../models/Counter.js');

const { isNotLoggedIn } = require('../middlewares.js');


/* 
------ GET Method ------
*/

/* Post 데이터 전체를 가져와서, 사용자에게 보여준다. */
router.get('/', (req, res) => {
	// mongoose의 find 함수는 Query 객체를 리턴한다. Query 객체에 Promise하려고 하지 말자...
	Post.find({}, (err, data) => {
		if (err) return err;
		
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
		
		res.render('board/index', {posts, moment, errorMessages: req.flash('boardError')});
	});
	
	/* 아니면 exec()를 붙여서 Promise로 만들어주자 */
	// Post.find({}).exec().then( ~~ );
})

/* 글쓰기 페이지를 보내준다. */
router.get('/write', (req, res) => {
	if (!req.isAuthenticated()){
		req.flash('boardError', "게시글 작성은 로그인을 하셔야 합니다.");
		return res.redirect('/post');
	}
	
	let prevContent = {_id: null, title:"", content: "", tags: ""};
	
	console.log(req.query);
	
	if (req.query.postId){
		const postId = parseInt(req.query.postId);
		
		Post.findOne({_id: postId}).exec()
		.then( post => {
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

/* id에 일치하는 post를 보여준다 */
router.get('/:postId', (req, res) => {
	const postId = parseInt(req.params.postId);
	
	Post.findOne({_id: postId}).exec()
	.then( post => {
		let isOwner = false;
		if (req.isAuthenticated()){
			if (req.user.id == post.reg_id){
				isOwner = true;
			}
		}
		res.render('board/detail', { post, isOwner });
	})
	.catch( err => {
		res.render('error', {message: "존재하지 않는 게시물입니다."});
	});
});

/* Post들을 전부 지운다. 디버그용!@!!@ */
router.get('/deleteAll', (req, res) => {
	let resData = [];
	
	Post.deleteMany({}, (err, result) => {
		if (err) 
			res.send(err);
		else
			resData += result;
	})
	
	let query = {name: 'postId'},
    	update = { $set : {count: 0, id: 0} },
 		options = { upsert: true };
	
	Counter.updateOne(query, update, options, (err, result) => {
		if (err) 
			res.send(err);
		else
			resData += result;
	})
	
	res.send(resData);
});


/* 
------ POST Method ------
*/

/* Post를 만든다. */
router.post('/', (req, res) => {
	if (!req.isAuthenticated()){
		req.flash('boardError', "게시글 작성은 로그인을 하셔야 합니다.");
		return res.redirect('/post');
	}
	
	let counterQuery = {name: 'postId'},
    	counterUpdate = { $inc: { count: 1, id: 1 } },
 		counterOptions = { upsert: true };
	
	let tags = req.body.tags.split(',').map(item => item.trim());
	
	Counter.findOneAndUpdate( counterQuery, counterUpdate, counterOptions).exec()
	.then( ( {count, id} ) => {
		const newPost = { 
			_id: id, 
			title: req.body.title, 
			content: req.body.content,
			tags: tags,
			reg_id: req.user.id,
			reg_dt: moment().format('YYYY-MM-DD HH:mm:ss')
		};
		
		Post.create(newPost)
		.then( (data) => { 
			res.redirect('/post');
		})
		.catch( err => {
			counterUpdate = {$inc: {count: -1, id: -1}};
			Counter.findOneAndUpdate(counterQuery, counterUpdate, counterUpdate).exec();
			res.send("Post Create Error : " + err);
		});
	})	
	.catch( err => res.send("Counter FindOneAndUpdate Error : " + err));
	
});


/* 
------ PATCH Method ------
*/

/* post를 수정한다. */
router.patch('/:postId', (req, res) => {
	const postId = parseInt(req.params.postId);
	
	// 미로그인시, 로그인 페이지로
	if (!req.isAuthenticated())
		return res.redirect('/user/login');
	
	Post.findOne({_id: postId}).exec()
	.then(post => {
		// 게시글 작성자인지 확인
		if (req.user.id != post.reg_id)
				return res.render('error', {message: "작성자가 아닙니다."});
		
		Post.update({_id: postId}, {
			title: req.body.title,
			content: req.body.content,
			tags: req.body.tags
		}).exec()
		.then(() => {res.redirect('/post/'+postId);})
		.catch(err => res.render('error', {message: err}));
	})
	.catch(err => res.render('error', {message: err}));
})

/* 
------ DELETE Method ------
*/

/* id와 일치하는 post를 지운다. delete method를 통한 방법. */
router.delete('/:postId', (req, res) => {
	const postId = parseInt(req.params.postId);
	
	// 미로그인시, 로그인 페이지로
	if (!req.isAuthenticated())
		return res.redirect('/user/login');
	
	
	Post.findOne({_id: postId}).exec()
	.then( post => {
		// 게시글 작성자인지 확인
		if (req.user.id != post.reg_id)
			return res.render('error', {message: "작성자가 아닙니다."});
		
		
		Post.deleteOne({_id: postId}, (err, post) => {
			if (err) 
				return res.render('error', {message: err});

			Counter.findOneAndUpdate( {name: 'postId'}, {$inc: { count: -1 }}).exec()
			.then( () => {
				res.redirect('/post');
			})
			.catch(err => res.render('error', {message: err}));
		});
	})
	.catch( err => res.render('error', {message: err}) );
});



module.exports = router;