var express = require('express'),
    stylus = require('stylus'),
    faye = require('faye'),
    RedisStore = require('connect-redis');   
    
var Users = new require('./Models/usersModel'),
	Tweets = new require('./Models/tweetsModel');
    
var app = express.createServer(),
	login = require('./Controllers/login'),
	conf = require('./Models/conf'),
	home = require('./Controllers/home'),
	test = require('./Controllers/test');

//conf stylus
function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .set('compress', true);
};

app.use(stylus.middleware({
    src: __dirname + '/Views'
  , dest: __dirname + '/Public'
  , compile: compile
}));

//conf static files
app.use(express.static(__dirname + '/Public'));

//conf views
app.set('views', __dirname + '/Views');
app.set('view engine', 'jade');

//Post params
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({ secret: "keyboard cat", store: new RedisStore(conf.redis)}));

//conf router
//Index actions
app.get ('/', home.home);

//Log in actions
app.get ('/registro', login.index);
app.get ('/logout', login.logOut)
app.post('/registro/create', login.createUser);
app.post('/login', login.logIn);

//Test action
app.get	('/test', test.index);
app.get	('/test/subs', test.subs);

//Dinamic Helpers
app.dynamicHelpers({
	user: function(req, res){
		if(req.session.user){
			return req.session.user;			
		}else{
			return '';
		}
	},
	state: function(req,res){
		if(res.state){
			return res.state;			
		}else{
			return ''
		}
	}
});

//Twitter streaming
Users.getAllWithTwitterAccount(function(err){
	console.log('Error getting users')
},function(doc){
	console.log('docs',doc);
	var TwitterNode = require('twitter-node').TwitterNode;

	var twit = new TwitterNode({
	  user: conf.twit.user, 
	  password: conf.twit.password
	});

	twit.follow(doc);

	twit.headers['User-Agent'] = 'whatever';

	twit.addListener('error', function(error) {
		console.log(error.message);
	  
	});

	twit.addListener('tweet', function(tweet) {
		Tweets.create(tweet);
		console.log("@" + tweet.user.screen_name + ": " + tweet.text);
	});

	twit.stream();
})



//Conf Faye
var bayeux = new faye.NodeAdapter({
  mount:    '/faye',
  timeout:  45
});

var logger = {
	incoming: function(message, callback) {
		if(message.channel.search('meta') == -1){
			console.log(message);
		}
		callback(message);
	}
};
bayeux.addExtension(logger);
bayeux.attach(app);

//Events, think where to move them...
setTimeout(function(){
	console.log('watchers ready');

	var client = new faye.Client(conf.faye);	
	
	var	request = require('request');
	
	client.subscribe('/users/new', function(message) {
		Users.getUserById(message.id,function(err){
			console.log(err);
		},function(doc){			
			console.log('Finded doc',doc);
			request({uri:'http://api.twitter.com/1/users/show.json?screen_name='+doc.twitter}, function (error, response, body) {
				if (!error && response.statusCode == 200) {
					console.log(JSON.parse(body));
					doc.tAccount = JSON.parse(body);
					Users.db.save(doc.id, doc._rev, doc ,function(err,doc){
						console.log(err,doc);
					});
				}
			});
		});
	});	
}, 500);

//conf app listen port
app.listen(8080);
console.log('server listening on port 8080');
