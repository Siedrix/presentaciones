var e = require('events').EventEmitter;
var event = new e();

event.on('hola', function (data) {
  console.log('alguien dijo hola! y ademas dijo:'+data);
});

event.emit('hola','Soy daniel');
