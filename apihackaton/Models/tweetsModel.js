//Users Model
//define database
var cradle = require('cradle'),
	conf = require('./conf'),
	faye = require('faye'),
	_ = require('underscore');
	
var client = new faye.Client(conf.faye);	

//Adds hash
require('joose');require('joosex-namespace-depended');require('hash');


//database conection
//ToDo, have a connection interface
/*
var connection = new(cradle.Connection)(conf.couch.url, conf.couch.port, {
	auth: { username: conf.couch.user, password: conf.couch.password }
});
*/ 

function Tweets() {
	this.dbName = conf.couch.dbName;
	this.db = new(cradle.Connection)().database(this.dbName);
};

Tweets.prototype = {
	create : function(data,errCallback,callback){
		context = this;
		data.type = 'tweet';

		context.db.save(data, function(err, doc){
			if(err){
				console.log(err);
			}else{
				console.log(doc);
				console.log('tweet created');
				client.publish('/tweet/new', data);
			}
		})
	}
}

module.exports = new Tweets();
