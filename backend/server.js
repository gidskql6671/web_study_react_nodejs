const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const passportConfig = require('./src/configs/passport'); 
const http = require('http').createServer(app);
const io = require('socket.io')(http);


// 프로젝트의 root path를 구해주는 모듈의 helper function.
// 프로젝트의 모듈을 가져오기 쉽게 해줌.
global.reqlib = require('app-root-path').require; 

/* 환경변수 설정 */
require('dotenv').config();
const dbLink = process.env.DATABASE_URL;
const port = process.env.SERVER_PORT;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/static', express.static(path.join(__dirname, '../frontend/build/static')));

// session 설정
app.use(session({secret:'MySecret', resave:false, saveUninitialized:true}));

// passport 설정.
passportConfig();
app.use(passport.initialize());
app.use(passport.session());

/* 서버 라우터 설정 */
app.use('/*', (req, res) => {
	res.sendFile('index.html', {
	  root: path.resolve(__dirname, '../frontend/build'),
	});
});


// mongoose 연결 및 서버 실행.
mongoose.connect(dbLink, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false,
	useUnifiedTopology: true
})
.then(() => {
	http.listen(port, () => {
    	console.log(`listening on ${port}`);
	});
})
.catch((err) => {
	console.log(err);
});