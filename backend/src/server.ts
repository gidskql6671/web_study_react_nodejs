import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import cors from 'cors';
import session from 'express-session';
import http from 'http';

const app = express();
const server = http.createServer(app);

/* 환경변수 설정 */
import 'dotenv/config';
const dbLink = process.env.DATABASE_URL;
const port = process.env.SERVER_PORT;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/static', express.static(path.join(__dirname, '../../frontend/build/static')));

// session 설정
app.use(session({secret:'MySecret', resave:false, saveUninitialized:true}));

/* 서버 라우터 설정 */
app.use('/*', (req, res) => {
	res.sendFile('index.html', {
	  root: path.resolve(__dirname, '../../frontend/build'),
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
	server.listen(port, () => {
    	console.log(`listening on ${port}`);
	});
})
.catch((err) => {
	console.log(err);
});