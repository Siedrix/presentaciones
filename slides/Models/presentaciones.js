var mongoose = require('mongoose')
  , url = require('./conf')
  , Schema = mongoose.Schema;
  
mongoose.connect(url);

var SlidesSchema = new Schema({
    title  	:  	String,
    content	:	String,
});

var PresentacionesSchema = new Schema({
    title  	:  	String,
    desc	:	String,
    slides	: 	[SlidesSchema]
});
mongoose.model('Presentaciones', PresentacionesSchema);

var Presentacion = mongoose.model('Presentaciones');

module.exports = Presentacion;

/*
var presentacion = new Presentacion();	
presentacion.slides.push({ title: 'First Slide', content : 'Im siedrix' });
presentacion.slides.push({ title: 'Second Slide', content : 'Im still siedrix' });

presentacion.title = 'Segunda presentacion de Node';
presentacion.description = 'Esta es la segunda presentacion de NodeJs';	

presentacion.save(function (err) {
	if(err){
		console.log(err)
	}else{
		console.log('no hay errores')
	}
});
*/
