/* Module import */
const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const passportConfig = require('./config/passport'); 
const createError = require('http-errors');
const flash = require('connect-flash');
const methodOverride = require("method-override");


// 프로젝트의 root path를 구해주는 모듈의 helper function.
// 프로젝트의 모듈을 가져오기 쉽게 해줌.
global.reqlib = require('app-root-path').require; 


/* Router import */
const indexRouter = require('./src/routes/index');
const postRouter = require('./src/routes/post');
const apiRouter = require('./src/routes/apis/index');
const userRouter = require('./src/routes/user');


/* 프로퍼티 로더 */
const property = require('./properties');
const dbLink = property.getDbLink();
const port = property.getServerPort();


// view 관련
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); 
app.use(require('express-ejs-layouts'));
app.set('layout', 'layouts/layout');
app.set("layout extractScripts", true);
app.set("layout extractStyles", true);


app.use(cors());

// bodyparser 세팅
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// 가상경로 /static으로 시작하는 요청은 public 폴더에서 찾도록 함.
app.use('/static', express.static( path.join(__dirname, 'public') ));  

// methodOverride 설정
app.use(methodOverride('_method'));

// session 설정
app.use(session({secret:'MySecret', resave:false, saveUninitialized:true}));

// flash(휘발성 메시지) 추가
app.use(flash());

// passport 설정.
passportConfig.init();
app.use(passport.initialize());
app.use(passport.session());

// Custom MiddleWare 추가
app.use((req, res, next) => {
	// response.locals에 담긴 변수들은 ejs에서 바로 사용이 가능하기에 등록해둠.
	// request.isAuthenticated()에는 현재 요청이 인증이 된 사용자가 보낸 것인지 여부가 담김.
	// request.user에는 현재 사용자의 정보가 담김.
	res.locals.isAuthenticated = req.isAuthenticated(); 
	res.locals.currentUser = req.user;
	next();
})


/* 서버 라우터 설정 */
app.use('/', indexRouter);
app.use('/post', postRouter);
app.use('/user', userRouter);
app.use('/api', apiRouter);

app.use((req, res, next) => {
	next(createError.NotFound());
})

/* Error Handler*/
app.use((err, req, res, next) => {
	if (err.status == 404)
		res.render('error', { message: "존재하지 않는 페이지입니다."});
	else{
		//res.status(500).send("서버 문제입니다.");
		throw err;
	}
})


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