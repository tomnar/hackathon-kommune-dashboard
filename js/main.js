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
		$(oldBig.find('img').get(0)).show();
		$(oldBig.find('img').get(1)).hide();
		
		$(this).addClass('is-expanded');
		$($(this).find('img').get(0)).hide();
		$($(this).find('img').get(1)).show();
		$container.isotope('layout');
	});
	
	$('header li').click(function(){
		var filter = $(this).attr("class");
		$container.isotope({ filter: '.' + filter });
	});
});