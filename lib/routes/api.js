/* 클라이언트와의 api들 */
const express = require('express');
const router = express.Router();


// load router
const apiPostRouter = require('./apis/apiPost.js');
const apiAboutRouter = require('./apis/apiPost.js');


// router middleware setting
router.use('/post', apiPostRouter);
router.use('/about', apiAboutRouter);


module.exports =  router;