$(document).ready(function(){
	var client = new Faye.Client('/faye');
	var channel = $('#channel').attr('channel');
	
	client.subscribe('/presentaciones/'+channel, function(message) {
		console.log('Got a message: ' + message.text);
		console.log('Slide:'+message.slide);
		goTo(message.slide);
	});	
});
