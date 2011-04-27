var Presentacion = require('../Models/presentaciones');
	
exports.home = function(req, res){
	Presentacion.find({}, function (err, docs) {
		if(err){
			res.send('500');
		}else{
			res.render('home/home', {presentaciones: docs});
		}
	});

	
}
