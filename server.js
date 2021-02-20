const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const property = require('./properties.js');

const dbLink = property.getDbLink();

app.use(bodyParser.urlencoded({extended: true}))
app.use( '/', express.static( path.join(__dirname, 'public') ));
app.use( '/react', express.static( path.join(__dirname, 'client/build') ));


app.get('/', (req, res) => {
	res.sendFile( path.join(__dirname, 'index.html') );
});
app.get('/react/*', (req, res) => {
  res.sendFile( path.join(__dirname, 'client/build/index.html') );
});
app.get('/pet', (req, res) => { 
  res.send('펫용품')
});
app.post('/add', (req, res) => {
	console.log(req.body);
	res.send("전송 완료");
});


MongoClient.connect(dbLink, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, client){
	if (err) return console.log(err);

	const http = require('http').createServer(app);
	http.listen(8080, function() {
    	console.log('listening on 8080')
	});
})

