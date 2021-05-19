/* Module import */
const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const passportConfig = require('./config/passport'); 


// 프로젝트의 root path를 구해주는 모듈의 helper function.
// 프로젝트의 모듈을 가져오기 쉽게 해줌.
global.reqlib = require('app-root-path').require; 


/* Router import */
const indexRouter = require('./lib/routes/index');
const postRouter = require('./lib/routes/post');
const apiRouter = require('./lib/routes/apis/index');
const userRouter = require('./lib/routes/user');


/* 프로퍼티 로더 */
const property = require('./properties.js');
const dbLink = property.getDbLink();
const port = property.getServerPort();


// view engine을 ejs로 설정
app.set('view engine', 'ejs'); 


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// 지금은 제공할 static file들이 없는거 같은데?
//app.use( express.static( path.join(__dirname, 'public') ));  // static file들을 public 폴더에서 찾게 함.


// session 설정
app.use(session({secret:'MySecret', resave:true, saveUninitialized:true}));


// passport 설정.
passportConfig();
app.use(passport.initialize());
app.use(passport.session());


/* 서버 라우터 설정 */
app.use('/', indexRouter);
app.use('/post', postRouter);
app.use('/user', userRouter);
app.use('/api', apiRouter);


// mongoose 연결 및 서버 실행.
mongoose.connect(dbLink, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false,
	useUnifiedTopology: true
})
.then(() => {
	console.log("Connected to MongoDB");

	const http = require('http').createServer(app);
	http.listen(port, () => {
    	console.log(`listening on ${port}`);
	});
})
.catch((err) => {
	console.log(err);
});