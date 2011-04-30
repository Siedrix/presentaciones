var cradle = require('cradle'),
	conf = require('../conf');

view = 	{
	byName: {
		map: function (doc) {
			if(doc.type == 'user'){
				emit(doc.user, doc);
			}
		}
	},
	withTwitterAccount: {
		map: function (doc){
			if(doc.tAccount){
				emit(doc.twitter, doc);
			}
		}
	}
}
	
var db = new(cradle.Connection)().database(conf.couch.dbName);

db.get('_design/users', function(err,doc){
	if(err){
		console.log('Error',err);
		db.save('_design/users', view ,function(err,doc){
			console.log(err,doc);
		})
	}else{
		console.log('Exists');
		db.save('_design/users', doc._rev, view ,function(err,doc){
			console.log(err,doc);
		});
	}
})

console.log('Creating views');
