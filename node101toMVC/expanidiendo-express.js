var express = require('express'),
	something = require('./dev/something');

something.setValue('str');

var app = express.createServer();
app.get('/', function(req, res){
	res.send(something.getValue());
});

app.get('/set/:value', function(req, res){
	something.setValue(req.params.value);
    res.send('El valor a sido cambiado');
});

app.listen(3000);
