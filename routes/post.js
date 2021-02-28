/* post data 관리 */
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const db = mongoose.connection;
const moment = require('moment');

// mongoose Post Model 생성
const Post = require('../model/Post.js');
const Counter = require('../model/Counter.js');


router.get('/', (req, res) => {
	res.render("error");
})

/* Post를 만든다. */
router.post('/add', (req, res) => {
	let counterQuery = {name: 'postId'},
    	counterUpdate = { $inc: { count: 1 } },
 		counterOptions = { upsert: true };
	
	Counter.findOneAndUpdate( counterQuery, counterUpdate, counterOptions).exec()
	.then( ( {count} ) => {
		const newPost = { _id: count, title: req.body.title, content: req.body.content };
		
		Post.create(newPost)
		.then( (data) => { 
			console.log(data); 
			res.redirect('/');
		})
		.catch( err => res.send("Post Create Error : " + err) );
	})	
	.catch( err => res.send("Counter FindOneAndUpdate Error : " + err));
	

});

/* request로 온 id를 가진 Post를 지운다 */
router.delete('/delete', (req, res) => {
	let postId = parseInt(req.body.id);
	
	Post.deleteOne({_id: postId}, (err, data) => {
		if (err) 
			res.send(err);
		else
			res.status(200).send();
	});
});

/* Post들을 전부 지운다 */
router.delete('/deleteAll', (req, res) => {
	let resData = [];
	
	Post.deleteMany({}, (err, result) => {
		if (err) 
			res.send(err);
		else
			resData += result;
	})
	
	let query = {name: 'postId'},
    	update = { $set : {count: 0} },
 		options = { upsert: true };
	
	Counter.updateOne(query, update, options, (err, result) => {
		if (err) 
			res.send(err);
		else
			resData += result;
	})
	
	res.send(resData);
});

/* Post를 모두 보내준다. */
router.get('/list', (req, res)=> {
	// mongoose의 find 함수는 Query 객체를 리턴한다. Query 객체에 Promise하려고 하지 말자...
	Post.find({}, (err, posts) => {
		if (err) return err;
		
		console.log(posts);
		res.render('list', {posts: posts, moment});
	});
	
	/* 아니면 exec()를 붙여서 Promise로 만들어주자 */
	// Post.find({}).exec().then( ~~ );
});


module.exports = router;