$(document).ready(function(){
	
	var $container = $('#main');
	$container.isotope({ filter: '.A'});
	
	$container.isotope({
	  itemSelector: '.item',
	  masonry: {
		  columnWidth: 300
	  }
	});
	
	$('.item').click(function(){
		var oldBig = $('.is-expanded');
		oldBig.removeClass('is-expanded');
		$(oldBig.find('.small')).show();
		$(oldBig.find('.big')).hide();
		
		$(this).addClass('is-expanded');
		$($(this).find('.small')).hide();
		$($(this).find('.big')).show();
		$container.isotope('layout');
	});
	
	$('header li').click(function(){
		var filter = $(this).attr("class");
		$container.isotope({ filter: '.' + filter });
	});
});