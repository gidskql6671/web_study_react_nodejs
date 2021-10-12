/* 클라이언트와의 api들 */
const express = require('express');
const router = express.Router();


// load router
const apiPostRouter = require('./apiPost.js');
const apiAboutRouter = require('./apiAbout.js');
const apiLoginRouter = require('./apiLogin.js');


// router middleware setting
router.use('/post', apiPostRouter);
router.use('/about', apiAboutRouter);
router.use('/login', apiLoginRouter);


module.exports =  router;