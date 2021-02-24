/* post data 관리 */
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const db = mongoose.connection;

// mongoose Post Model 생성
const Post = require('../model/Post.js');
const Counter = require('../model/Counter.js');


router.get('/', (req, res) => {
	res.render("error");
})

router.post('/add', (req, res) => {
	Post.create({name: req.body.user_name, age: req.body.user_age})
	.then((data)=>{ console.log(data)});
	res.redirect('/');
	
	// let postId = db.collection('counter').findOne({name: 'postId'}, (err, data) => {
	// 	let postId = data.totalPost;

	// 	db.collection('post').insertOne( { _id: (postId + 1), name: req.body.user_name, age: req.body.user_age }, () => {

	// 		db.collection('counter').updateOne({name: 'postId'}, {$inc : {totalPost: 1}}, (err, data) => {
	// 			res.redirect('/');
	// 		});

	// 	});
	// });

});
router.delete('/delete', (req, res) => {
	// let db = req.app.locals.db;
	// let postId = parseInt(req.body._id);

	// db.collection('post').deleteOne({_id: postId});
	// res.status(200).send();
});

router.delete('/deleteAll', (req, res) => {
	// let db = req.app.locals.db;

	// db.collection('post').deleteMany({});
	// db.collection('counter').updateOne({name: 'postId'}, {$set : {totalPost: 0}});

	// res.send("삭제 완료");
});
router.get('/list', (req, res)=> {
	// mongoose의 find 함수는 Query 객체를 리턴한다. Query 객체에 Promise하려고 하지 말자...
	Post.find({}, (err, posts) => {
		if (err) return err;
		
		console.log(posts);
		res.render('list', {posts: posts});
	});
	
	/* 아니면 exec()를 붙여서 Promise로 만들어주자 */
	// Post.find({}).exec().then( ~~ );
});


module.exports = router;