$(document).ready( function () {
	$('#carousel-1, #carousel-2').slidr({
		animation	: ['chequerboard', 'blind', 'curtain', 'threeBoard', 'left', 'right', 'up', 'down', 'fade', 'col_fade', 'crossFade'],
		auto : false
	});
	
	$('.switch a').click( function (e) {
		
		e.preventDefault();
		
		$('.switch .active').removeClass('active');
		$(this).addClass('active');
		
		if ( $(this).hasClass('images') ) {
			$('#carousel-1').fadeOut(200);
			$('#carousel-2').delay(200).fadeIn();
		} else if ($(this).hasClass('elements')) {
			$('#carousel-2').fadeOut(200);
			$('#carousel-1').delay(200).fadeIn();
		}
	});
});