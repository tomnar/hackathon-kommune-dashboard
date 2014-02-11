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
		if($(this).hasClass('is-expanded')){return;};
		var oldBig = $('.is-expanded');
		oldBig.removeClass('is-expanded');
		$(oldBig.find('.small')).show();
		$(oldBig.find('.big')).hide();
		
		//reset animations in other boxes
		$('.box5 .imageLineup .el').hide();
		$('.box5 .line').css('height', 0);
		$('.box5 .imageLineup .el div').hide();
		
		$(this).addClass('is-expanded');
		$($(this).find('.small')).hide();
		$($(this).find('.big')).show();
		$container.isotope('layout');
	});
	
	$('header li').click(function(){
		var filter = $(this).attr("class");
		$container.isotope({ filter: '.' + filter });
	});
	
	$('.box5').click(function(){
		$('.box5 .line').animate({
			height: 386
		},2000);
		$('.box5 .imageLineup .el').each( function(i){
			$(this).delay(300*i).fadeIn(200);
		});
	});
	$('.box5 .imageLineup .el').click(function(e){
		e.stopPropagation();
		$('.box5 .imageLineup .el div').hide();
		$(this).find('div').fadeIn(300);
	});
});