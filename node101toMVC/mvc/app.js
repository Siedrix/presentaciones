//deps
var express = require('express')
  , stylus = require('stylus');

//app and controllers
var app = express.createServer(),
	events = require('./controllers/events'),
	home = require('./controllers/home');

//conf stylus
function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .set('compress', true);
};

app.use(stylus.middleware({
    src: __dirname + '/views'
  , dest: __dirname + '/public'
  , compile: compile
}));

//conf static files
app.use(express.static(__dirname + '/public'));

//conf views
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

//conf router
app.get('/', home.home);
app.get('/events', events.list);

//conf app listen port
app.listen(3000);
console.log('server listening on port 3000');
