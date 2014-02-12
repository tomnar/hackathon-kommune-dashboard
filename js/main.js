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
		$('.box5 .imageLineup .el div').hide();
		$('.box2 .big img').attr('src', 'img/Personclean.png');
		
		$(this).addClass('is-expanded');
		$($(this).find('.small')).hide();
		$($(this).find('.big')).show();
		$container.isotope('layout');
	});
	
	$('header li').click(function(){
		var filter = $(this).attr("class");
		$container.isotope({ filter: '.' + filter });
	});
	
	$('.box2 .c1').click(function(){
		$('.box2 .big img').attr('src', 'img/Person1.png');
	});
	$('.box2 .c2').click(function(){
		$('.box2 .big img').attr('src', 'img/Person2.png');
	});
	$('.box2 .c3').click(function(){
		$('.box2 .big img').attr('src', 'img/Person3.png');
	});
	$('.box2 .c4').click(function(){
		$('.box2 .big img').attr('src', 'img/Person4.png');
	});
	
	$('.box5').click(function(){
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