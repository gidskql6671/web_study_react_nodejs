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

/* Post 데이터들을 가져와서 view에 보내준다. */
router.get('/', (req, res) => {
	// mongoose의 find 함수는 Query 객체를 리턴한다. Query 객체에 Promise하려고 하지 말자...
	Post.find({}, (err, data) => {
		if (err) return err;
		
		const posts = data.map(element => {
			if (element.content.length > 100){
				element.content = element.content.slice(0, 150) + "...";
			}
			
			return element;
		})
		
		res.render('board/index', {posts, moment, errorMessages: req.flash('boardError')});
	});
	
	/* 아니면 exec()를 붙여서 Promise로 만들어주자 */
	// Post.find({}).exec().then( ~~ );
})

/* 글쓰기 페이지를 보내준다. */
router.get('/add', (req, res) => {
	if (!req.isAuthenticated()){
		req.flash('boardError', "게시글 작성은 로그인을 하셔야 합니다.");
		return res.redirect('/post');
	}
	
	res.render('board/addPost');
})

/* Post를 만든다. */
router.post('/add', (req, res) => {
	if (!req.isAuthenticated()){
		req.flash('boardError', "게시글 작성은 로그인을 하셔야 합니다.");
		return res.redirect('/post');
	}
	
	let counterQuery = {name: 'postId'},
    	counterUpdate = { $inc: { count: 1, id: 1 } },
 		counterOptions = { upsert: true };
	
	Counter.findOneAndUpdate( counterQuery, counterUpdate, counterOptions).exec()
	.then( ( {count, id} ) => {
		const newPost = { 
			_id: id, 
			title: req.body.title, 
			content: req.body.content,
			tag: req.body.tag,
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

/* id에 일치하는 post를 보여준다 */
router.get('/:postId', (req, res) => {
	const { postId } = req.params;
})

			
/* id와 일치하는 post를 지운다 */
router.delete('/delete', (req, res) => {
	let postId = parseInt(req.body.id);
	
	Post.deleteOne({_id: postId}, (err, data) => {
		if (err) 
			return res.send(err);
		
		Counter.findOneAndUpdate( {name: 'postId'}, {$inc: { count: -1 }}).exec()
		.then( () => {
		res.status(200).send();
		})
		.catch(err => res.send(err));
	});
});

/* Post들을 전부 지운다 */
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


module.exports = router;