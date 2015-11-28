var express = require('express');
var mongojs = require('mongojs');
var db=mongojs('twitterlike',['followers','follows','tweet','user']);
var app = express();
var bodyParser = require('body-parser');


app.use(bodyParser.json());
app.get('/user', function(req,res){
	console.log('I received a get request');

	db.user.find(function(err,docs){
		console.log(docs);
		res.json(docs);
	});

	
});

app.get('/tweet', function(req,res){
	console.log('I received a get request');

	db.tweet.find(function(err,docs){
		console.log(docs);
		res.json(docs);
	});

	
});

app.get('/followers', function(req,res){
	console.log('I received a get request');

	db.followers.find(function(err,docs){
		console.log(docs);
		res.json(docs);
	});

	
});

app.get('/follows', function(req,res){
	console.log('I received a get request');

	db.follows.find(function(err,docs){
		console.log(docs);
		res.json(docs);
	});

	
});

app.listen(3000);
console.log('Server running on port 3000');