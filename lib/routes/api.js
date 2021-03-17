/* 클라이언트와의 api들 */
const express = require('express');
const router = express.Router();


// load router
const apiPostRouter = require('./apis/apiPost.js');
const apiAboutRouter = require('./apis/apiAbout.js');
const apiLoginRouter = require('./apis/apiLogin.js');


// router middleware setting
router.use('/post', apiPostRouter);
router.use('/about', apiAboutRouter);
router.use('/login', apiLoginRouter);


module.exports =  router;