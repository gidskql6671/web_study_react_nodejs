/* 클라이언트와의 api들 */

module.exports = function(app){
	const express = require('express');
	const router = express.Router();


	router.get('/post', (req, res) => {
		let db = req.app.db;
		
		db.collection('post').find().toArray(function(err, data){
			if (err) return console.log(err);
			
			console.log(data);
			res.send("Z");
		})
	});
	
	
	return router;
}
