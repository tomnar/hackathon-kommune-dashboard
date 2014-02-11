$(document).ready(function(){
	
	var $container = $('#main');
	$container.isotope({ filter: '.A'});
	
	$container.isotope({
	  itemSelector: '.item',
	  masonry: {
		  columnWidth: 400
	  }
	});
	
	$('.item').click(function(){
		$('.item').removeClass('is-expanded');
		$(this).addClass('is-expanded');
		$container.isotope('layout');
	});
	
	$('header li').click(function(){
		var filter = $(this).attr("class");
		$container.isotope({ filter: '.' + filter });
	});
});