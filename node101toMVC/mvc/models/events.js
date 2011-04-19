//Events Model
//define database
var dbName = 'events',
	cradle = require('cradle');

function Events() {
	this.dbName = dbName;
	this.db = new(cradle.Connection)().database(this.dbName);
};

Events.prototype = {
	getByTitle : function(key,callback){
		this.db.view('events/eventsByTitle',{keys:key}, function (err, res) {
			callback(err,res);
		});
	}
}

module.exports = new Events();
