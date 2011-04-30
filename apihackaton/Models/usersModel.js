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

function Users() {
	this.dbName = conf.couch.dbName;
	this.db = new(cradle.Connection)().database(this.dbName);
};

Users.prototype = {
	createUser : function(userData,errCallback,callback){
		context = this;
		userData.type = 'user';

		if(userData.user && userData.password != '' && userData.password == userData.confPassword){
			userData.password = Hash.sha1(userData.password+conf.salt);
			delete userData.confPassword;

			context.db.view('users/byName', {key:userData.user}, function (err, doc) {
				if(err){
					errCallback(err);
				}else{
					if(doc.length == 0){
						context.db.save(userData, function(err, doc){
							if(err){
								errCallback(err);
							}else{
								console.log('user created');
								client.publish('/users/new', doc);
								callback(userData);
							}
						});
					}else{
						errCallback('User Exist');
					}
				}
			}); 
		}else{
			errCallback({"error":"invalid_information"});
		}
	},
	logIn : function(userData,errCallback,callback){
		console.log('userdata:',userData)
		this.db.view('users/byName', {key:userData.user},function (err, doc) {
			if(err){
				errCallback(err);
			}else{
				if(Hash.sha1(userData.password+conf.salt) == doc[0].value.password){
					callback(doc[0].value);	
				}else{
					errCallback({"error":"bad_password"});
				}
			}
		});
	},
	getUserById : function(id,errCallback,callback){
		this.db.get(id,function (err, doc) {
			if(err){
				errCallback(err);
			}else{
				callback(doc);
			}
		})	
	},
	getAllWithTwitterAccount : function(errCallback,callback){
		this.db.view('users/withTwitterAccount', function (err, doc) {
			if(err){
				errCallback(err);
			}else{
				var users = _.map(doc, function(item){ return item.value.tAccount.id; });
				callback(users);
			}			
		});
	}
}

module.exports = new Users();
