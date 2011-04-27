$(document).ready(function(){
	$('.slide .focus').click(function(e){
		e.preventDefault();
		var pointer = $(this).attr('href');
		$.ajax({
			url: '/presentaciones/moveTo/'+pointer,
			type:'POST'
		})
		console.log($(this).attr('href'));
		console.log('click');
	})
});
