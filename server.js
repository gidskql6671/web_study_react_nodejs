const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

// 프로퍼티 로더
const property = require('./properties.js');


/* Router import */
const indexRouter = require('./routes/index');
const postRouter = require('./routes/post')(app);
const apiRouter = require('./routes/api')(app);


/* mongoose Schma import */
const Post = require('./model/post.js')(app);

const dbLink = property.getDbLink();
const port = property.getServerPort();


app.set('view engine', 'ejs');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use( express.static( path.join(__dirname, 'public') ));


/* 서버 라우터 설정 */
app.use('/', indexRouter);
app.use('/post', postRouter);
app.use('/api', apiRouter);


mongoose.connect(dbLink, {
	useNewUrlParser: true,
	useCreateIndex: true,
})
.then(() => {
	console.log("Connected to MongoDB");
	app.locals.db = mongoose;
	app.locals.Post = Post;

	const http = require('http').createServer(app);
	http.listen(port, function() {
    	console.log(`listening on ${port}`);
	});
})
.catch((err) => {
	console.log(err);
});