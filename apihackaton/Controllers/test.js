var conf = require('../Models/conf'),
	faye = require('faye'),
	http = require('http'),
	request = require('request'),
	Users = new require('../Models/usersModel');
	
var client = new faye.Client(conf.faye);	

exports.index = function(req, res){
	res.send('hi');
	client.publish('/users/new', {name:'indes',action:'get'});
}

exports.subs = function(req, res){
	Users.getAllWithTwitterAccount(function(err){
		res.send('Error')
	},function(doc){
		res.send(doc);
	});
}
