const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');

const property = require('./properties.js');
const indexRouter = require('./routes/index');
const postRouter = require('./routes/post')(app);
const apiRouter = require('./routes/api')(app);


const dbLink = property.getDbLink();

app.set('view engine', 'ejs');

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}))
app.use( express.static( path.join(__dirname, 'public') ));

/* 서버 라우터 설정 */
app.use('/', indexRouter);
app.use('/post', postRouter);
app.use('/api', apiRouter);


MongoClient.connect(dbLink, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, client){
	if (err) return console.log(err);
	app.locals.db = client.db('test');

	const http = require('http').createServer(app);
	http.listen(8080, function() {
    	console.log('listening on 8080')
	});
})

