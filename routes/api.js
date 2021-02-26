/* 클라이언트와의 api들 */
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const db = mongoose.connection;

// mongoose Post Model 생성
const Post = require('../model/Post.js');
const Counter = require('../model/Counter.js');


/* post들을 클라이언트에 모두 보내준다. */
router.get('/post', (req, res) => {

	Post.find({}, (err, data) => {
		if (err) return console.log(err);

		res.json(data);
	});
});


/* 
	post들을 일정 개수 보내준다.
	:page 값에 따라 보내는 post들이 달라진다.
*/
router.get('/postlist/:page', (req, res) => {
	//  구현중
});


module.exports =  router;