var Presentacion = require('../Models/presentaciones'),
	faye = require('faye');
	
exports.nuevo = function(req, res){
	res.render('presentaciones/nuevo',{});
}

exports.crear = function(req, res){
	var presentacion = new Presentacion();	
	presentacion.title = req.body.title;
	presentacion.desc = req.body.description;	
	presentacion.save(function (err) {
		if(err){
			res.send(err);
		}else{
			res.redirect('/presentaciones/s/'+presentacion._id);
		}
	});	
}

exports.addSlide = function(req, res){
	Presentacion.findById(req.params.id, function (err, found) {
		found.slides.push({ title: req.body.title, content : req.body.content });
		found.save(function (err) {
			if(err){
				res.send(err);
			}else{
				res.redirect('/presentaciones/s/'+found._id);
			}
		})
	});		
}

exports.show = function(req, res){
	Presentacion.findById( req.params.id, function (err, found) {
		res.render('presentaciones/show',{ layout:'s5' , presentacion:found });
	})
}
exports.single = function(req, res){
	Presentacion.findById( req.params.id, function (err, found) {
		res.render('presentaciones/single',{presentacion:found});
	});	
}

exports.moveTo = function(req,res){
	res.send('Move To slide '+req.params.slide+' of presentetion '+req.params.id);
	var client = new faye.Client('http://slides.siedrix.dotcloud.com/faye');
	
	client.publish('/presentaciones/'+req.params.id, {
		text :  'Cambiar Slide',
		slide:  req.params.slide
	});
}
