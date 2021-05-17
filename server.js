const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');

// const passport = require('./config/passport'); 


/* 
	https://www.npmjs.com/package/app-root-path
	프로젝트의 root directory를 구해주는 라이브러리
	
	- var appRoot = require('app-root-path'); -
	프로젝트의 root directory를 반환한다.
	
	- var myModulePath = require('app-root-path').resolve('/lib/file.js') -
	프로젝트의 root directory + '/lib/file.js'를 한 스트링 값을 가져온다.
	
	- global.reqlib = require('app-root-path').require; -
	다른 파일에서 require('경로')처럼 reqlib('/lib/file.js');로 사용 가능.
	만약 프로젝트의 root directory가 /a/b라면 '/a/b/lib/file.js' 모듈을 가져온다.
	ex) const myRouter = reqlib('/lib/routes/myRouter.js');
	
*/
global.reqlib = require('app-root-path').require; 


/* Router import */
const indexRouter = require('./lib/routes/index');
const postRouter = require('./lib/routes/post');
const apiRouter = require('./lib/routes/apis/index');


/* 프로퍼티 로더 */
const property = require('./properties.js');
const dbLink = property.getDbLink();
const port = property.getServerPort();


app.set('view engine', 'ejs'); // view engine을 ejs로 설정

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

// 지금은 제공할 static file들이 없는거 같은데?
//app.use( express.static( path.join(__dirname, 'public') ));  // static file들을 public 폴더에서 찾게 함.

// session 설정
app.use(session({secret:'MySecret', resave:true, saveUninitialized:true}));

// passport 설정
// app.use(passport.initialize());
// app.use(passport.session());

/* 서버 라우터 설정 */
app.use('/', indexRouter);
app.use('/post', postRouter);
app.use('/api', apiRouter);


mongoose.connect(dbLink, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false,
	useUnifiedTopology: true
})
.then(() => {
	console.log("Connected to MongoDB");

	const http = require('http').createServer(app);
	http.listen(port, function() {
    	console.log(`listening on ${port}`);
	});
})
.catch((err) => {
	console.log(err);
});