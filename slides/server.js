//deps
var express = require('express'),
	faye = require('faye'),
    stylus = require('stylus');
    
var app = express.createServer(),
	presentaciones = require('./Controllers/presentacionesController');
	home = require('./Controllers/homeController');

//conf static files
app.use(express.static(__dirname + '/Public'));
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

//conf views
app.set('views', __dirname + '/Views');
app.set('view engine', 'jade');

//Post params
app.use(express.bodyParser());

//conf router
//Index actions
app.get ('/', home.home);
app.get ('/presentaciones/nuevo', presentaciones.nuevo);
app.get ('/presentaciones/s/:id', presentaciones.single);
app.get ('/presentaciones/show/:id', presentaciones.show);
app.post('/presentaciones/crear', presentaciones.crear);
app.post('/presentaciones/addSlide/:id', presentaciones.addSlide);
app.post('/presentaciones/moveTo/:id/:slide', presentaciones.moveTo);

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


//conf app listen port
app.listen(8080);
console.log('server listening on port 8080');
