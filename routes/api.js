/* 클라이언트와의 api들 */

module.exports = function(app){
	const express = require('express');
	const router = express.Router();


	router.get('/post', (req, res) => {
		let db = req.app.locals.db;
		
		db.collection('post').find().toArray(function(err, data){
			if (err) return console.log(err);
			
			res.json(data);
		})
	});
	router.get('/postlist/:page', (req, res) => {
		let db = req.app.locals.db;
		
		//db.collection('post').find()
	});
	
	
	return router;
}
