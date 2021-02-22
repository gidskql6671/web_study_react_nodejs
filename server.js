const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');

const property = require('./properties.js');

const dbLink = property.getDbLink();
let db;

app.set('view engine', 'ejs');

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}))
app.use( '/', express.static( path.join(__dirname, 'public') ));
app.use( '/react', express.static( path.join(__dirname, 'client/build') ));


app.get('/', (req, res) => {
	res.sendFile( 'index.html' );
});
app.get('/react/*', (req, res) => {
  res.sendFile( path.join(__dirname, '/client/build/index.html') );
});
app.post('/add', (req, res) => {
	let postId = db.collection('counter').findOne({name: 'postId'}, (err, data) => {
		let postId = data.totalPost;
		
		db.collection('post').insertOne( { _id: (postId + 1), name: req.body.user_name, age: req.body.user_age }, () => {
			
			db.collection('counter').updateOne({name: 'postId'}, {$inc : {totalPost: 1}}, (err, data) => {
				res.redirect('/');
			});
			
		});
	});
	
});
app.delete('/delete', (req, res) => {
	let postId = parseInt(req.body._id);
	
	db.collection('post').deleteOne({_id: postId});
	res.status(200).send();
});

app.delete('/deleteAll', (req, res) => {
	db.collection('post').deleteMany({});
	db.collection('counter').updateOne({name: 'postId'}, {$set : {totalPost: 0}});
	
	res.send("삭제 완료");
});
app.get('/list', (req, res)=> {
	db.collection('post').find().toArray(function(err, data){
		if (err) return console.log(err);
		
		console.log(data);
		res.render('list.ejs', {posts: data});
	})
	
	
});
app.get('/post', (req, res) => {
	console.log("오");
	res.send("zz");
});


MongoClient.connect(dbLink, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, client){
	if (err) return console.log(err);
	db = client.db('test');

	const http = require('http').createServer(app);
	http.listen(8080, function() {
    	console.log('listening on 8080')
	});
})

