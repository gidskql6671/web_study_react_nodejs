/* 클라이언트와의 api ->  about 데이터 관리. 얘는 파일시스템으로 관리  */
const express = require('express');
const router = express.Router();
const fs = require('fs');


/* about data를 클라이언트에 보내준다. */
router.get('/', (req, res) => {
	
	fs.readFile(require('app-root-path').resolve('/public/about/data.json'), 'utf8', (error, jsonFile) => {
		if (error) return console.log(error);
		console.log(jsonFile);

		const jsonData = JSON.parse(jsonFile);
		console.log(jsonData);

		res.json(jsonData);
	});
	
});



module.exports = router;