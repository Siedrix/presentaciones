var e = require('events').EventEmitter;
var event = new e();

setInterval(function(){
	event.emit('endProcess',{name:'readFile',filecontent:'Nothing'});
},3000)

setInterval(function(){
	event.emit('endProcess',{name:'writeFile',filecontent:'Something'});
},7000)


event.on('endProcess', function (data) {
  	console.log('Proceso Terminado');
	console.log(data)
});
