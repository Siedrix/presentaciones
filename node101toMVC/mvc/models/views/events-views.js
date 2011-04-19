var cradle = require('cradle'),
	db = new(cradle.Connection)().database('events');

db.save('_design/events', {
    eventsByTitle: {
        map: function (doc) {
            if (doc.title) emit(doc.title, doc);
        }
    }
});
console.log('Design View Created')