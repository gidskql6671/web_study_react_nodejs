const express = require('express');
const router = express.Router();
 
/* GET home page. */
router.get('/', function(req, res, next) {
	if (req.user){
		res.render('index', { user: {name:req.user.name} });
	}
	else{
		res.render('index');
	}
});
 
module.exports = router;