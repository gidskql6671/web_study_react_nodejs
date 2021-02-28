/* 클라이언트와의 api들 */
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const db = mongoose.connection;

// mongoose Post Model 생성
const Post = require('../models/Post.js');
const Counter = require('../models/Counter.js');


/* post들을 클라이언트에 모두 보내준다. */
router.get('/post', (req, res) => {

	/* 
		기본적으로 mongoose의 document들은 'mongoose document'의 형태를 가진다.
		얘는 여러가지 기능들을 가지고 있는 오브젝트인데, read-only의 기능만 필요할 경우 의미가 없다!
		그래서 성능 개선을 위해 Plain Old JavaScript Objects(POJO)로 바꾸어 줄 수 있다.
		이 역할을 lean()함수가 한다.
	*/
	Post.find({}).lean()
	.then( data => {
		console.log(data);
		
		res.json(data);
	})
	.catch( err => {
		console.log(err);
		
		res.send(err);
	});
	
	
	/* 
		기본적으로 mongoose 함수의 결과에는 'mongoose document'가 들어간다. 
		즉, 밑 save()처럼 데이터베이스를 조작할 수 있음.	
	*/
	// Post.find({}, (err, data) => {
	// 	if (err) return console.log(err);
		
	// 	data[0].name = "Test";
	// 	data[0].save();
		
	// 	console.log(data);
		
	// 	res.json(data);
	// });
	
});


/* 
	post들을 일정 개수 보내준다.
	:page 값에 따라 보내는 post들이 달라진다.
*/
router.get('/postlist/:page', (req, res) => {
	//  구현중
});


module.exports =  router;