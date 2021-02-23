/* post data 관리 */

module.exports = function(app){
	const express = require('express');
	const router = express.Router();
	
	router.get('/', (req, res) => {
		res.render("error");
	})
	
	router.post('/add', (req, res) => {
		let db = req.app.locals.db;
		
		let postId = db.collection('counter').findOne({name: 'postId'}, (err, data) => {
			let postId = data.totalPost;

			db.collection('post').insertOne( { _id: (postId + 1), name: req.body.user_name, age: req.body.user_age }, () => {

				db.collection('counter').updateOne({name: 'postId'}, {$inc : {totalPost: 1}}, (err, data) => {
					res.redirect('/');
				});

			});
		});

	});
	router.delete('/delete', (req, res) => {
		let db = req.app.locals.db;
		let postId = parseInt(req.body._id);

		db.collection('post').deleteOne({_id: postId});
		res.status(200).send();
	});

	router.delete('/deleteAll', (req, res) => {
		let db = req.app.locals.db;
		
		db.collection('post').deleteMany({});
		db.collection('counter').updateOne({name: 'postId'}, {$set : {totalPost: 0}});

		res.send("삭제 완료");
	});
	router.get('/list', (req, res)=> {
		let db = req.app.locals.db;
		
		db.collection('post').find().toArray(function(err, data){
			if (err) return console.log(err);

			console.log(data);
			res.render('list', {posts: data});
		})
	});

	return router;
};