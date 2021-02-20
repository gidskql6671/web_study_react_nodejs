const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const property = require('./properties.js');

const dbLink = property.getDbLink();
let db;

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}))
app.use( '/', express.static( path.join(__dirname, 'public') ));
app.use( '/react', express.static( path.join(__dirname, 'client/build') ));


app.get('/', (req, res) => {
	res.sendFile( path.join(__dirname, 'index.html') );
});
app.get('/react/*', (req, res) => {
  res.sendFile( path.join(__dirname, 'client/build/index.html') );
});
app.post('/add', (req, res) => {
	console.log(req.body);
	
	db.collection('post').insertOne( {name: req.body.user_name, age: req.body.user_age }, () => {
		console.log('저장 완료');
	})
	
	res.send("전송 완료");
});
app.get('/list', (req, res)=> {
	db.collection('post').find().toArray(function(err, data){
		if (err) return console.log(err);
		
		console.log(data);
		res.render('list.ejs', {posts: data});
	})
	
	
});


MongoClient.connect(dbLink, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, client){
	if (err) return console.log(err);
	db = client.db('test');
	

	const http = require('http').createServer(app);
	http.listen(8080, function() {
    	console.log('listening on 8080')
	});
})

