/* 클라이언트와의 api ->  about 데이터 관리. 얘는 파일시스템으로 관리  */
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const db = mongoose.connection;

router.post('/login', (rea, res) => {
	const _id = req.body.usr_id, _password = req.body.usr_password;
})


module.exports = router;