var users = [
    { name: 'tj', email: 'tj@vision-media.ca' }
  , { name: 'ciaran', email: 'ciaranj@gmail.com' }
  , { name: 'aaron', email: 'aaron.heckmann+github@gmail.com' }
];

var Events = new require('../models/events');

exports.list = function(req, res){
	Events.getByTitle(["Super Happy Dev House"],function(err,doc){
		res.render('events/list', { locals: {events : doc}});
	});
}
