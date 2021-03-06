﻿$.fn.preload = function() {
    this.each(function(){
        $('<img>')[0].src = this;
    });
}
function slider() {
	$('.slider > div .slides_control').css({
		'width': $('.slider').width()*$('.slider > div .slides_control > div').size()+'px'
	});
	$('.slider > div .slides_control > div').css({
		'left': $('.slider').width()+'px'
	});
	$('.slider > div .slides_control').css({
		'left': -$('.slider').width()+'px'
	});
	$('.rb .slider > div .container > div > div img').each(function() {
		var current = $(this);
		var dx = Math.floor(($(this).attr('width')-$('.slider > div').width())/2);
		//var dy = Math.floor(($(this).attr('height')-$('.slider > div').height())/2);
		$(this).css({
			'transform': 'translateX('+(-dx)+'px)',
			'-webkit-transform': 'translateX('+(-dx)+'px)',
			'-moz-transform': 'translateX('+(-dx)+'px)',
			'-ms-transform': 'translateX('+(-dx)+'px)',
			'-o-transform': 'translateX('+(-dx)+'px)',
			'margin-top': -($(this).attr('height')-$('.rb .slider > div').height())/2+'px'
		});
		/*$(this).css({
			'transform': 'translate('+(-dx)+'px,'+(-dy)+'px)',
			'-webkit-transform': 'translate('+(-dx)+'px,'+(-dy)+'px)',
			'-moz-transform': 'translate('+(-dx)+'px,'+(-dy)+'px)',
			'-ms-transform': 'translate('+(-dx)+'px,'+(-dy)+'px)'
		});
		$(document).mousemove(function(pos) {
			var x = pos.pageX/$(window).width();
			var y = pos.pageY/$(window).height();
			if ( y > 1 ) {
				y = 1;
			}
			$(current).css({
				'transform': 'translate('+(-(2*dx*x))+'px,'+(-(2*dy*y))+'px)',
				'-webkit-transform': 'translate('+(-(2*dx*x))+'px,'+(-(2*dy*y))+'px)',
				'-moz-transform': 'translate('+(-(2*dx*x))+'px,'+(-(2*dy*y))+'px)',
				'-ms-transform': 'translate('+(-(2*dx*x))+'px,'+(-(2*dy*y))+'px)',
				'-o-transform': 'translate('+(-(2*dx*x))+'px,'+(-(2*dy*y))+'px)'
			});
		});
		$(document).mousemove(function(pos) {
			if ( pos.pageX > $('.slider > div').offset().left && pos.pageX < ($('.slider > div').offset().left+$('.slider > div').width()) && pos.pageY > $('.slider > div').offset().top && pos.pageY < ($('.slider > div').offset().top+$('.slider > div').height()) ) {
				var x = (pos.pageX-$('.slider > div').offset().left)/$('.slider > div').width();
				var y = (pos.pageY-$('.slider > div').offset().top)/$('.slider > div').height();
				$(current).css({
					'transform': 'translate('+(-(2*dx*x))+'px,'+(-(2*dy*y))+'px)',
					'-webkit-transform': 'translate('+(-(2*dx*x))+'px,'+(-(2*dy*y))+'px)',
					'-moz-transform': 'translate('+(-(2*dx*x))+'px,'+(-(2*dy*y))+'px)',
					'-ms-transform': 'translate('+(-(2*dx*x))+'px,'+(-(2*dy*y))+'px)'
				});
			}
		});*/
		$(document).mousemove(function(pos) {
			if ( pos.pageX > $('.slider > div').offset().left && pos.pageX < ($('.slider > div').offset().left+$('.slider > div').width()) && pos.pageY > $('.slider > div').offset().top && pos.pageY < ($('.slider > div').offset().top+$('.slider > div').height()) ) {
				var x = (pos.pageX-$('.slider > div').offset().left)/$('.slider > div').width();
				$(current).css({
					'transform': 'translateX('+(-(2*dx*x))+'px)',
					'-webkit-transform': 'translateX('+(-(2*dx*x))+'px)',
					'-moz-transform': 'translateX('+(-(2*dx*x))+'px)',
					'-ms-transform': 'translateX('+(-(2*dx*x))+'px)',
					'-o-transform': 'translateX('+(-(2*dx*x))+'px)'
				});
			}
		});
	});
	$('.rb .slider > div .container > div > div h3, .rb .slider > div .container > div > div p').css({
		'margin-right': $('.rb .slider > div .pagination').width()+40+'px'
	});
}
function spec() {
	if ( $('.wrapper').width() >= 1240 ) {
		var cols = 4;
	}
	else {
		var cols = 3;
	}
	for ( var i = 0; i < Math.ceil($('.rb .spec .tab ul li').length/cols); i++ ) {
		var max = 0;
		for ( var j = 1; j <= cols; j++ ) {
			$('.rb .spec .tab ul li:nth-child('+eval(i*cols+j)+')').each(function() {
				var h = $(this).outerHeight(); 
				max = h > max ? h : max;
			});
		}
		for ( var j = 1; j <= cols; j++ ) {
			$('.rb .spec .tab ul li:nth-child('+eval(i*cols+j)+') > div').outerHeight(max);
		}
	}
}
function reccslide() {
	$('.reccslide > div .slides_control, .reccslide > div .pagination').remove();
	$('.reccslide > div .container > div').remove();
	var rl = $('.reccslide .temp .element').size();
	if ( $('.wrapper').width() < 1260  || $.browser.msie && parseInt($.browser.version, 10) === 8 ) {
		var cols = 3;
	}
	else {
		var cols = 4;
	}
	for ( var i = 0; i < rl/cols; i++ ) {
		$('.reccslide > div .container').append('<div></div>');
		for ( var j = 1; j <= cols; j++ ) {
			$('.reccslide .temp .element:nth-child('+eval(cols*i+j)+')').clone().appendTo($('.reccslide > div .container > div:nth-child('+eval(i+1)+')'));
		}
	}
	var lastsize = $('.reccslide > div .container > div:last-child .element').size();
	$('.reccslide > div .container > div:last-child').each(function() {
		if ( lastsize < cols ) {
			for ( i = 1; i <= cols-lastsize; i++ ) {
				$('.reccslide > div .container > div:first-child .element:nth-child('+i+')').clone().appendTo('.reccslide > div .container > div:last-child').addClass('cloned');
			}
		}
	});
	$('.reccslide > div').slides({
		generatePagination: true,
		generateNextPrev: true,
		container: 'container',
		effect: 'slide',
		slideSpeed: 500,
		slideEasing: 'easeInOutCubic',
		play: 10000,
		pause: 2500
	});
	$('.reccslide > div').bind('swiperight', function() {
		$('.reccslide > div .prev').trigger('click');
	});
	$('.reccslide > div').bind('swipeleft', function() {
		$('.reccslide > div .next').trigger('click');
	});
}
function rebuild() {
	if ( $('.wrapper').width() >= 1260 ) {
		re = 0;
	}
	else {
		re = 1;
	}
	$('input.re').val(re);
}
function otheritem() {
	if ( $(window).width() < 1260 || $.browser.msie && parseInt($.browser.version, 10) === 8 ) {
		var max = 0;
		$('.item .other ul li > div').each(function() {
			var h = $(this).outerHeight(); 
			max = h > max ? h : max;
		});
		$('.item .other ul li > div').outerHeight(max);
	}
	else {
		$('.item .other ul li > div').css({
			'height': 'auto'
		});
	}
}
function mediagallery() {
	if ( $(window).width() < 1260 || $.browser.msie && parseInt($.browser.version, 10) === 8 ) {
		$('.item .media .gallery .big').width(550);
		$('.item .media .gallery .preview, .item .media .gallery .carousel').remove();
		$('.item .media .gallery').append('<ul class="carousel"></ul>');
		$('.item .media .gallery .temp li').clone().appendTo('.item .media .gallery .carousel');
		if ( $('.item .media .gallery .carousel li').size() > 6 ) {
			$('.item .media .gallery .carousel').jcarousel({
				vertical: true,
				scroll: 1,
				animation: 250,
				easing: 'easeInOutCubic'
			});
		}
	}	
	else {
		if ( $('.item .media .gallery .temp li').size() <= 6 ) {
			$('.item .media .gallery .big').width(789);
			$('.item .media .gallery .preview, .item .media .gallery .carousel').remove();
			$('.item .media .gallery').append('<ul class="preview"></ul>');
			$('.item .media .gallery .preview').width(90);
			$('.item .media .gallery .temp li').clone().appendTo('.item .media .gallery .preview');
		}
		if ( $('.item .media .gallery .temp li').size() <= 12 && $('.item .media .gallery .temp li').size() >= 7 ) {
			$('.item .media .gallery .big').width(699);
			$('.item .media .gallery .preview, .item .media .gallery .carousel').remove();
			$('.item .media .gallery').append('<ul class="preview"></ul>');
			$('.item .media .gallery .preview').width(180);
			$('.item .media .gallery .temp li').clone().appendTo('.item .media .gallery .preview');
		}
		if ( $('.item .media .gallery .temp li').size() <= 18 && $('.item .media .gallery .temp li').size() >= 13 ) {
			$('.item .media .gallery .big').width(655);
			$('.item .media .gallery .preview, .item .media .gallery .carousel').remove();
			$('.item .media .gallery').append('<ul class="preview"></ul>');
			$('.item .media .gallery .preview').width(270);
			$('.item .media .gallery .temp li').clone().appendTo('.item .media .gallery .preview');
		}
		if ( $('.item .media .gallery .temp li').size() >= 19 ) {
			$('.item .media .gallery .big').width(789);
			$('.item .media .gallery .preview, .item .media .gallery .carousel').remove();
			$('.item .media .gallery').append('<ul class="carousel"></ul>');
			$('.item .media .gallery .temp li').clone().appendTo('.item .media .gallery .carousel');
			$('.item .media .gallery .carousel').jcarousel({
				vertical: true,
				scroll: 1,
				animation: 250,
				easing: 'easeInOutCubic'
			});
		}
	}
	$('.item .media .gallery .preview li a, .item .media .gallery .carousel .jcarousel-item a, .item .media .gallery .carousel > li > a').bind('click', function() {
		$(this).parent().addClass('active').siblings().removeClass('active');
		$(this).parents('.gallery').find('.big').children('img[data-img="'+$(this).attr('href')+'"]').show().siblings().hide();
		return false;
	}).parent().filter(':nth-child(1)').children('a').click();
}
function mediavideo() {
	if ( $(window).width() < 1260 || $.browser.msie && parseInt($.browser.version, 10) === 8 ) {
		$('.item .media .video .big, .item .media .video .big > div').width(550);
		$('.item .media .video .preview, .item .media .video .carousel').remove();
		$('.item .media .video').append('<ul class="carousel"></ul>');
		$('.item .media .video .temp li').clone().appendTo('.item .media .video .carousel');
		if ( $('.item .media .video .carousel li').size() > 6 ) {
			$('.item .media .video .carousel').jcarousel({
				vertical: true,
				scroll: 1,
				animation: 250,
				easing: 'easeInOutCubic'
			});
		}
	}	
	else {
		if ( $('.item .media .video .temp li').size() <= 6 ) {
			$('.item .media .video .big, .item .media .video .big > div').width(789);
			$('.item .media .video .preview, .item .media .video .carousel').remove();
			$('.item .media .video').append('<ul class="preview"></ul>');
			$('.item .media .video .preview').width(90);
			$('.item .media .video .temp li').clone().appendTo('.item .media .video .preview');
		}
		if ( $('.item .media .video .temp li').size() <= 12 && $('.item .media .video .temp li').size() > 7 ) {
			$('.item .media .video .big, .item .media .video .big > div').width(699);
			$('.item .media .video .preview, .item .media .video .carousel').remove();
			$('.item .media .video').append('<ul class="preview"></ul>');
			$('.item .media .video .preview').width(180);
			$('.item .media .video .temp li').clone().appendTo('.item .media .video .preview');
		}
		if ( $('.item .media .video .temp li').size() <= 18 && $('.item .media .video .temp li').size() > 13 ) {
			$('.item .media .video .big, .item .media .video .big > div').width(609);
			$('.item .media .video .preview, .item .media .video .carousel').remove();
			$('.item .media .video').append('<ul class="preview"></ul>');
			$('.item .media .video .preview').width(270);
			$('.item .media .video .temp li').clone().appendTo('.item .media .video .preview');
		}
		if ( $('.item .media .video .temp li').size() > 18 ) {
			$('.item .media .video .big, .item .media .video .big > div').width(789);
			$('.item .media .video .preview, .item .media .video .carousel').remove();
			$('.item .media .video').append('<ul class="carousel"></ul>');
			$('.item .media .video .temp li').clone().appendTo('.item .media .video .carousel');
			$('.item .media .video .carousel').jcarousel({
				vertical: true,
				scroll: 1,
				animation: 250,
				easing: 'easeInOutCubic'
			});
		}
	}
	$('.item .media .video .carousel .jcarousel-item a, .item .media .video .carousel > li > a, .item .media .video .preview li a').bind('click', function() {
		$(this).parent().addClass('active').siblings().removeClass('active');
		$(this).parents('.video').find('.big').children('div[data-video="'+$(this).attr('href')+'"]').show().siblings().hide();
		return false;
	}).parent().filter(':nth-child(1)').children('a').click();
}
function events() {
	if ( $(window).width() < 1260 || $.browser.msie && parseInt($.browser.version, 10) === 8 ) {
		var cols = 4;
	}
	else {
		var cols = 5;
	}
	for ( var i = 0; i < Math.ceil($('.events > div > ul li').length/cols); i++ ) {
		var max = 0;
		for ( var j = 1; j <= cols; j++ ) {
			$('.events > div > ul li:nth-of-type('+eval(i*cols+j)+')').each(function() {
				var h = $(this).outerHeight(); 
				max = h > max ? h : max;
			});
		}
		for ( var j = 1; j <= cols; j++ ) {
			$('.events > div > ul li:nth-of-type('+eval(i*cols+j)+') > div').outerHeight(max);
		}
	}
}
function reviews() {
	if ( $(window).width() < 1260 || $.browser.msie && parseInt($.browser.version, 10) === 8 ) {
		var cols = 4;
	}
	else {
		var cols = 5;
	}
	for ( var i = 0; i < Math.ceil($('.reviews ul li').length/cols); i++ ) {
		var max = 0;
		for ( var j = 1; j <= cols; j++ ) {
			$('.reviews ul li:nth-of-type('+eval(i*cols+j)+')').each(function() {
				var h = $(this).outerHeight(); 
				max = h > max ? h : max;
			});
		}
		for ( var j = 1; j <= cols; j++ ) {
			$('.reviews ul li:nth-of-type('+eval(i*cols+j)+') > div').outerHeight(max);
		}
	}
}
function otherevents() {
	if ( $(window).width() < 1260 || $.browser.msie && parseInt($.browser.version, 10) === 8 ) {
		$('.otherevents ul li:nth-child(5)').hide();
	}
	else {
		$('.otherevents ul li:nth-child(5)').show();
	}
	var max = 0;
	$('.otherevents ul li').each(function() {
		var h = $(this).outerHeight(); 
		max = h > max ? h : max;
	});
	$('.otherevents ul li > div').outerHeight(max);
}
function otherposts() {
	if ( $(window).width() < 1260 || $.browser.msie && parseInt($.browser.version, 10) === 8 ) {
		$('.otherposts ul li:nth-child(5)').hide();
	}
	else {
		$('.otherposts ul li:nth-child(5)').show();
	}
	var max = 0;
	$('.otherposts ul li').each(function() {
		var h = $(this).outerHeight(); 
		max = h > max ? h : max;
	});
	$('.otherposts ul li > div').outerHeight(max);
}
function sitemap() {
	var size = $('.sitemap .temp li').size();
	if ( $(window).width() < 1260 || $.browser.msie && parseInt($.browser.version, 10) === 8 ) {
		var cols = 4;
	}
	else {
		var cols = 5;
	}
	var colsize = Math.ceil(size/cols);
	$('.sitemap .nav').empty();
	for ( var i = 1; i <= cols; i++ ) {
		$('.sitemap .nav').append('<li><ul></ul></li>');
		for ( var j = 1; j <= colsize; j++ ) {
			$('.sitemap .temp li:nth-child('+eval((i-1)*colsize+j)+')').clone().appendTo('.sitemap .nav > li:nth-child('+i+') ul');
		}
	}
}
function citynav() {
	var current = 1;
	var end = 0;
	$('.catalog > div > .offices .list > div .cities > div span.before').hide();
	$('.catalog > div > .offices .list > div .cities .prev').addClass('disabled');
	if ( $(window).width() < 1260 || $.browser.msie && parseInt($.browser.version, 10) === 8 ) {
		var width = 846;
	}
	else {
		var width = 1086;
	}
	$('.catalog > div > .offices .list > div .cities .next').bind('click', function() {
		if ( $('.catalog > div > .offices .list > div .cities > div ul').width()-($('.catalog > div > .offices .list > div .cities > div ul li:nth-child('+eval(current+1)+')').position().left+26) > $('.catalog > div > .offices .list > div .cities > div').width() ) {
			current++;
			$('.catalog > div > .offices .list > div .cities > div ul').stop(true,true).animate({
				'left': -($('.catalog > div > .offices .list > div .cities > div ul li:nth-child('+current+')').position().left+26)+'px'
			}, 500);
			$('.catalog > div > .offices .list > div .cities .prev').removeClass('disabled');
		}
		else {
			end = 1;
			$('.catalog > div > .offices .list > div .cities > div ul').stop(true,true).animate({
				'left': -($('.catalog > div > .offices .list > div .cities > div ul').width()-$('.catalog > div > .offices .list > div .cities > div').width())+'px'
			}, 500);
			$('.catalog > div > .offices .list > div .cities > div span.after').hide();
			$('.catalog > div > .offices .list > div .cities > div span.before').show();
			$('.catalog > div > .offices .list > div .cities .next').addClass('disabled');
		}
		return false;
	});
	$('.catalog > div > .offices .list > div .cities .prev').bind('click', function() {
		if ( $('.catalog > div > .offices .list > div .cities > div ul').position().left < 0 ) {
			if ( end == 1 ) {
				$('.catalog > div > .offices .list > div .cities > div ul').stop(true,true).animate({
					'left': -($('.catalog > div > .offices .list > div .cities > div ul li:nth-child('+current+')').position().left+26)+'px'
				}, 500);
				$('.catalog > div > .offices .list > div .cities > div span.before').hide();
				$('.catalog > div > .offices .list > div .cities > div span.after').show();
				$('.catalog > div > .offices .list > div .cities .next').removeClass('disabled');
				end = 0;
			}
			if ( end == 0 && current > 2 ) {
				current--;
				$('.catalog > div > .offices .list > div .cities > div ul').stop(true,true).animate({
					'left': -($('.catalog > div > .offices .list > div .cities > div ul li:nth-child('+current+')').position().left+26)+'px'
				}, 500);
			}
			if ( current == 2 ) {
				current = 1;
				$('.catalog > div > .offices .list > div .cities > div ul').stop(true,true).animate({
					'left': '0'
				}, 500);
				$('.catalog > div > .offices .list > div .cities .prev').addClass('disabled');
			}
		}
		return false;
	});
}
function helpme() {
	var scroll = $('.helpme > div > div > div').jScrollPane();
	var api = scroll.data('jsp');
	scroll.bind('mousewheel', function (event, delta, deltaX) { 
        api.scrollByX(delta*-100);
        return false;
    }); 
	$(window).bind('scroll', function() {
		if ( $('.helpme > div > div').outerWidth() + api.getContentPositionX() >= api.getContentWidth() ) {
			$('.helpme > div > div .rs').fadeOut(500);
		}
		else {
			$('.helpme > div > div .rs').fadeIn(500);
		}
		if ( api.getContentPositionX() > 0 ) {
			$('.helpme > div > div .ls').fadeIn(500);
		}
		else {
			$('.helpme > div > div .ls').fadeOut(500);
		}
	});
}
$(window).resize(function() {
	if ( $('.slider').length > 0 ) {
		slider();
	}
	if ( $('.rb .spec .tab').length > 0 ) {
		spec();
	}
	if ( $('.reccslide').length > 0 ) {
		reccslide();
		/*rebuild();
		$('input.re').change(function() {
			reccslide();
			$('.reccslide > div .pagination li:first-child a').trigger('click');
		});*/
	}
	if ( $('.item .media .gallery').length > 0 ) {
		mediagallery();
	}
	if ( $('.item .media .video').length > 0 ) {
		mediavideo();
	}
	if ( $('.item .other').length > 0 ) {
		otheritem();
	}
	if ( $('.events').length > 0 && $.browser.msie && parseInt($.browser.version, 10) !== 8 ) {
		events();
	}
	if ( $('.reviews').length > 0 ) {
		reviews();
	}
	if ( $('.otherevents').length > 0 ) {
		otherevents();
	}
	if ( $('.otherposts').length > 0 ) {
		otherposts();
	}
	if ( $('.sitemap').length > 0 ) {
		sitemap();
	}
	if ( $('.cities').length > 0 ) {
		citymap();
	}
	if ( $('.helpme').length > 0 ) {
		helpme();
	}
	if ( $('.filterup').length > 0 ) {
		$('div.filterup').css({
			'left': $('.lb .filter > div > div').offset().left+'px'
		});
	}
	if ( $('.found').length > 0 ) {
		$('div.found').css({
			'left': $('.lb .filter > div > div').offset().left+'px'
		});
	}
});
$(document).ready(function() {
	$('.catalog .item').prev('.catalog .introduction').css({
		'margin-bottom': '0'
	});
	if ( $('.citysel').length > 0 ) {
		var cols = 4;
		for ( var i = 1; i <= 4; i++ ) {
			$('.citysel > div > div.listing').append('<div class="col"></div>');
			$('.citysel > div > div.temp div.city[data-col="'+i+'"]').clone().appendTo('.citysel > div > div.listing > div.col:nth-child('+i+')');
		}
		$('.citysel > div > .listing .city').each(function() {
			$(this).attr('data-start', ($(this).find('h5').text().substring(0,1)));
			$(this).find('h6').text($(this).find('h5').text().substring(0,1));
			if ( $(this).prev().attr('data-start') == $(this).attr('data-start') ) {
				$(this).find('h6').remove();
			}
		});
	}
	if ( $('.sitemap').length > 0 ) {
		sitemap();
	}
	if ( $('.cities').length > 0 ) {
		$('.catalog > div > .offices .list > div .cities > div').append('<span class="before"></span><span class="after"></span>');
		citynav();
	}
	$('.catalog > div > .vacancy > div > ul > li .preview h3 a').bind('click', function() {
		$(this).parents('li').stop(true,true).fadeOut(0).siblings().fadeIn(0);
		$(this).parents('li').parent().parent().find('.full').remove();
		$(this).parents('li').parent().before('<div class="full">'+$(this).parents('li').html()+'</div>');
		$(this).parents('li').parent().parent().find('.full br').remove();
		$(this).parents('li').parent().parent().find('.full').stop(true,true).slideDown(500);
		$('html, body').animate({ scrollTop: $(this).parents('li').parent().parent().find('.full').offset().top-70 }, 500);
		$(this).parents('li').parent().parent().find('.full').find('.preview h3 a').bind('click', function() {
			$(this).parents('.full').stop(true,true).slideUp(500);
			$(this).parents('.full').parent().children('ul').find('li').stop(true,true).fadeIn(0);
			return false;
		});
		return false;
	});
	$(['./img/a_bg_hover.png','./img/a_bg_type2_hover.png','./img/a_bg_dotted_hover.png','./img/map_a_hover.png']).preload();
	if ( $('.slider').length > 0 ) {
		$('.slider > div').slides({
			generatePagination: true,
			generateNextPrev: true,
			container: 'container',
			effect: 'slide',
			slideSpeed: 500,
			slideEasing: 'easeInOutCubic',
			play: 10000,
			pause: 2500
		});
		slider();
		$('.slider > div').bind('swiperight', function() {
			$('.slider .prev').trigger('click');
		});
		$('.slider > div').bind('swipeleft', function() {
			$('.slider .next').trigger('click');
		});
	}
	if ( $('.reccslide').length > 0 ) {
		var re;
		$('.wrapper').append('<input type="hidden" class="re" value="'+re+'">')
		rebuild();
		reccslide();
	}
	if ( $('.item .media .gallery').length > 0 ) {
		mediagallery();
		$('.item .media .gallery .big img').each(function() {
			$(this).css({
				'margin-left': -$(this).attr('width')/2+'px'
			});
		});
	}
	if ( $('.item .media .video').length > 0 ) {
		mediavideo();
		$('.item .media .video .big img').each(function() {
			$(this).css({
				'margin-left': -$(this).attr('width')/2+'px'
			});
		});
	}
	if ( $('.item .other').length > 0 ) {
		otheritem();
	}
	if ( $('.otherevents').length > 0 ) {
		otherevents();
	}
	if ( $('.otherposts').length > 0 ) {
		otherposts();
	}
	$('.header .search h6 span').bind('click', function() {
		$(this).parent().siblings().find('input').val($(this).text());
		return false;
	});
	if ( $('.significant').length > 0 ) {
		$('.lb .significant h2 strong em').empty().text($('.significant ul li').size());
		$('.lb .significant ul li').each(function() {
			$(this).prepend('<span>'+($(this).index()+1)+'</span>');
		});
	}
	if ( $('.blog').length > 0 ) {
		var max = 0;
		$('.blog ul li').each(function() {
			var h = $(this).height(); 
			max = h > max ? h : max;
		});
		$('.blog ul li').height(max);
	}
	if ( $('.events').length > 0 && $.browser.msie && parseInt($.browser.version, 10) !== 8 ) {
		events();
	}
	if ( $('.reviews').length > 0 ) {
		reviews();
	}
	var la = $('.rb .list > .nav ul li.active').index();
	$('.rb .list > .nav ul li a').bind('click', function() {
		$(this).parent().addClass('active').siblings().removeClass('active');
		if ( $(this).parent().next('.newest').length > 0 ) {
			$(this).parent().next('.newest').find('a').css({
				'padding-left': '34px'
			});
		}
		else {
			$('.rb .list > .nav ul li.newest').find('a').css({
				'padding-left': '20px'
			});
		}
		return false;
	});
	$('.rb .list > .sort .view li a').bind('click', function() {
		$(this).parent().addClass('active').siblings().removeClass('active');
		$(this).parents('.list').find('.tab').removeClass('lines tiles').addClass($(this).attr('href'));
		return false;
	}).filter(':first').click();
	var benefits = [ 
		'Автостоянка',
		'Ресторан',
		'Закусочная',
		'Wi-Fi',
		'TV',
		'Прачечная',
		'Парикмахерская',
		'Конференц зал',
		'ХЗ 1',
		'Бар',
		'ХЗ 2',
		'Интернет',
		'ХЗ 3',
		'Мебель',
		'Видеонаблюдение',
		'Телефон',
		'Консоль',
		'Лифт'
	];
	$('.catalog .list .tab > ul > li, .favoritelist > div > ul > li').each(function() {
		$(this).find('.status.close').hover(
			function() {
				console.log($(this).attr('data-timer'));
				$('body').append('<p class="bubble">'+$(this).attr('data-timer')+'</p>');
				$('p.bubble').css({
					'left': $(this).offset().left+'px',
					'top': $(this).offset().top+'px'
				});
			},
			function() {
				$('body').find('p.bubble').remove();
			}
		);
		$(this).find('div ul li').each(function() {
			$(this).css({
				'background-position': '0 -'+($(this).attr('data-benefit')-1)*22+'px'
			});
		});
	});
	$('.panel .drop p.password .eye').bind('click', function() {
		$(this).toggleClass('open');
		return false;
	});
	$('.panel .drop, .panel .city > div, .modal, .filterup, .sitemap').append('<span class="close"></span>');
	function panelclose() {
		$('.panel .drop, .panel .language > li > ul, .sitemap').stop(true,true).fadeOut(250);
		$('.panel .user li, .panel .language > li').removeClass('active');
		$('.found, .filterup').stop(true,true).fadeOut(250);
	}
	function cityclose() {
		$('.panel. .city > div, .fade').stop(true,true).fadeOut(250);
	}
	function enablescroll() {
		$('body').css({'position': 'static', 'top': '0', 'overflow-y': 'auto'});
		$(window).scrollTop(bh);
	}
	$('.panel .user li a').bind('click', function() {
		panelclose();
		if ( $('.panel .city > div:visible').length > 0 ) {
			cityclose();
			enablescroll();
		}
		$(this).parent().addClass('active');
		$(this).parents('.panel').find('div.drop.'+$(this).attr('href')).stop(true,true).fadeIn(250);
		return false;
	});
	$('.panel .drop .close').bind('click', function() {
		panelclose();
		return false;
	});
	$('body').bind('click', function() {
		panelclose();
	});
	$('.panel .drop, .panel .language > li > ul, .found, .lb .filter > div > div ul li input[type="checkbox"], .filterup, .lb .filter > div > div h5, .sitemap').click(function(e) {
		e.stopPropagation();
	});
	$('.panel .language > li > ul > li[data-short='+$('.panel .language > li > a').text()+']').addClass('active');
	$('.panel .language > li > ul > li').bind('click', function() {
		$(this).parents('.language').children('li').children('a').empty().text($(this).attr('data-short'));
		$(this).addClass('active').siblings().removeClass('active');
		panelclose();
		return false;
	});
	$('.panel .language > li > a').bind('click', function() {
		panelclose();
		if ( $('.panel .city > div:visible').length > 0 ) {
			cityclose();
			enablescroll();
		}
		$(this).parent().addClass('active');
		$(this).parent().children('ul').stop(true,true).fadeIn(250);
		return false;
	});
	var bh = 0;
	$('.panel .city p a').bind('click', function() {
		panelclose();
		$(this).parents('.city').children('div').stop(true,true).fadeIn(250);
		$('.fade').css({
			'z-index': '500'
		}).stop(true,true).fadeIn(250);
		bh = $(window).scrollTop();
		$('body').css({'position': 'fixed', 'top': -bh+'px', 'overflow-y': 'scroll'});
		return false;
	});
	$('.panel .city > div .close, .panel .city > div button').bind('click', function() {
		cityclose();
		enablescroll()
		return false;
	});
	$('*[data-target]').bind('click', function() {
		$('.fade').css({
			'z-index': '2000'
		}).stop(true,true).fadeIn(250);
		$('div[data-modal='+$(this).attr('data-target')+']').css({
			'margin-top': -$('div.modal[data-modal='+$(this).attr('data-target')+']').outerHeight()/2+'px'
		}).stop(true,true).fadeIn(250);
		bh = $(window).scrollTop();
		$('body').css({'position': 'fixed', 'top': -bh+'px', 'overflow-y': 'scroll'});
		return false;
	});
	$('.modal .close').bind('click', function() {
		$('.modal, .fade').stop(true,true).fadeOut(250);
		enablescroll();
		return false;
	});
	$('.fade').bind('click', function() {
		$('.modal').stop(true,true).fadeOut(250);
		cityclose();
		enablescroll();
		return false;
	});
	$('.list .click').bind('click', function() {
		$('.list .tab').toggleClass('tiles');
		return false;
	});
	$('.rb .map h5').bind('click', function() {
		if ( $(this).hasClass('active') ) {
			$(this).removeClass('active');
			$(this).children('span').html('развернуть карту<em></em><strong></strong>');
			$(this).parent().children('div').stop(true,true).animate({
				'height': '120px'
			}, 500);
			$('.rb .map .ymaps-2-1-17-controls-pane').hide();
		}
		else {
			$(this).addClass('active');
			$(this).children('span').html('свернуть карту<em></em><strong></strong>');
			$(this).parent().children('div').stop(true,true).animate({
				'height': '698px'
			}, 500);
			$('.rb .map .ymaps-2-1-17-controls-pane').show();
		}
		return false;
	});
	$('.lb .filter > div > div > ul, .lb .filter > div > div > h5, .lb .filter > div > .streets > div').hide();
	$('.lb .filter > div > div.active > ul, .lb .filter > div > div.active > h5, .lb .filter > div > .streets.active > div').show();
	$('.lb .filter > div > div h3 span').bind('click', function() {
		if ( $(this).parent().parent().hasClass('active') ) {
			$(this).parent().parent().removeClass('active');
			$(this).parent().siblings().hide();
		}
		else {
			$(this).parent().parent().addClass('active');
			$(this).parent().siblings().show();
		}
		return false;
	});
	var start = 2;
	var end = 6;
	for ( var i = start; i <= end; i++) {
		$('.lb .filter .rating span em:nth-child('+i+')').addClass('active');
	}
	$('.rating > div').slider({
		range: true,
		min: 1,
		max: 6,
		values: [start,end],
		slide: function(event,ui) {
			$('.lb .filter .rating span em').removeClass('active');
			for ( var i = ui.values[0]; i <= ui.values[1]; i++) {
				$('.lb .filter .rating span em:nth-child('+i+')').addClass('active');
			}
		}
    });
	$('.lb .filter > div > div ul li input[type="checkbox"]').bind('click', function() {
		$('.filterup').stop(true,true).fadeOut(250);
		$('div.found p span').empty().text(Math.floor(Math.random()*1000));
		$('div.found').stop(true,true).fadeOut(250);
		$('div.found').css({
			'left': $(this).offset().left+'px',
			'top': $(this).offset().top+'px'
		}).stop(true,true).fadeIn(250);
	});
	$('.lb .filter > div > div h5').bind('click', function() {
		$('div.found').stop(true,true).fadeOut(250);
		$('div.filterup').stop(true,true).fadeOut(250);
		$('div.filterup').css({
			'left': $(this).parent().offset().left+'px',
			'top': $(this).parent().offset().top+'px'
		}).stop(true,true).fadeIn(250);
		return false;
	});
	$('.filterup .close').bind('click', function() {
		$(this).parent().stop(true,true).fadeOut(250);
		return false;
	});
	$('.catalog .introduction h1 span').each(function() {
		for ( var i = 1; i <= $(this).attr('data-rating'); i++ ) {
			$(this).append('<em></em>');
		}
	});
	$('.item .information > div > ul li').each(function() {
		$(this).prepend('<span></span>');
		$(this).find('span').css({
			'background-position': '0 -'+($(this).attr('data-benefit')-1)*22+'px'
		});
	});
	$('.item .media > ul li a').bind('click', function() {
		$(this).parent().addClass('active').siblings().removeClass('active');
		return false;
	});
	$('.item > ul li a').bind('click', function() {
		$(this).parent().addClass('active').siblings().removeClass('active');
		$(this).parents('.item').children('div[data-tab='+$(this).attr('href')+']').show().siblings('div').hide();
		return false;
	}).parent().filter(':nth-child(1)').children('a').click();
	$('.item .review .data .title .rating').each(function() {
		for ( i = 1; i<=5; i++ ) {
			$(this).append('<span></span>');
		}
		for ( i = 1; i<=$(this).attr('data-score'); i++ ) {
			$(this).find('span:nth-child('+i+')').addClass('active');
		}
	});
	$('.item .review .message .rate > div').each(function() {
		var current = 0;
		for ( i = 1; i<=5; i++ ) {
			$(this).append('<span></span>');
		}
		$(this).find('span').hover(
			function() {
				for ( i = 1; i <= $(this).index()+1; i++ ) {
					$(this).parent().find('span').removeClass('current');
					$(this).parent().find('span:nth-child('+i+')').addClass('active');
				}
			},
			function() {
				$(this).parent().find('span').removeClass('active');
				if ( current > 0 ) {
					for ( i = 1; i <= current; i++ ) {
						$(this).parent().find('span:nth-child('+i+')').addClass('current');
					}
				}
			}
		);
		$(this).find('span').click(function() {
			current = $(this).index()+1;
			return false;
		});
	});
	$('.rb .spec > .nav ul li a, .rb .afisha > .nav ul li a, .events > ul li a').bind('click', function() {
		$(this).parent().addClass('active').siblings().removeClass('active');
		return false;
	});
	if ( $('.rb .spec .tab').length > 0 ) {
		spec();
	}
	$('.filter .calendar > div, .lb .filter > div > div.interval > div p input[type="text"], .catalog > div .datefilter > div > div p input[type="text"]').datepicker({
		prevText: '',
		nextText: '',
		firstDay: 1,
		dateFormat: 'dd.mm',
		showOtherMonths: true,
		dayNamesMin: [ 'Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб' ],
		monthNames: [ 'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь' ],
		hightlight: {
			format: 'dd.mm.yy',
			values: [ '17.10.2014' ]
		}
	});
	$('.item .media > ul li a').bind('click', function() {
		$(this).parent().addClass('active').siblings().removeClass('active');
		$(this).parents('.media').find('.incut').children('div[data-tab="'+$(this).attr('href')+'"]').show().siblings().hide();
		return false;
	}).parent().filter(':nth-child(1)').children('a').click();
	$('.lb .filter').prev('.nav').css({
		'margin-bottom': '20px'
	});
	$('.lb .banner').prev('.filter').css({
		'margin-bottom': '61px'
	});
	$('.lb .filter > div > div ul.direction li span').bind('click', function() {
		$(this).parent().addClass('active').siblings().removeClass('active');
		return false;
	}).filter(':first').click();
	if ( $('.filter .range.price').length > 0 ) {
		var pricemin = 10000;
		var pricemax = 40000;
		$('.filter .range.price > .slide').slider({
			range: true,
			min: 0,
			max: 50000,
			step: 500,
			values: [pricemin, pricemax],
			slide: function(event,ui) {
				$('.filter .range.price').find('input.min').val(ui.values[0]);
				$('.filter .range.price').find('input.max').val(ui.values[1]);
				rangepricehandle.eq(0).find('span').empty().text(ui.values[0]);
				rangepricehandle.eq(1).find('span').empty().text(ui.values[1]);
			}
		});
		var rangepricehandle = $(this).find('.filter .range.price > .slide .ui-slider-handle');
		$('.filter .range.price').find('input.min').val(pricemin);
		$('.filter .range.price').find('input.max').val(pricemax);
		rangepricehandle.eq(0).append('<span>'+pricemin+'</span>');
		rangepricehandle.eq(1).append('<span>'+pricemax+'</span>');
		$('.filter .range.price input.min').change(function() {
			var value1 = $('.filter .range.price input.min').val();
			var value2 = $('.filter .range.price input.max').val();
			if ( parseInt(value1) > parseInt(value2) ) {
				value1 = value2;
				$('.filter .range.price input.min').val(value1);
			}
			$('.filter .range.price > .slide').slider('values',0,value1);	
			rangepricehandle.eq(0).find('span').empty().text(value1);
		});
		$('.filter .range.price input.max').change(function() {
			var value1 = $('.filter .range.price input.min').val();
			var value2 = $('.filter .range.price input.max').val();
			if ( value2 > 50000 ) { 
				value2 = 50000;
				$('.filter .range.price input.max').val(50000);
			}
			if( parseInt(value1) > parseInt(value2) ) {
				value2 = value1;
				$('.filter .range.price input.max').val(value2);
			}
			$('.filter .range.price > .slide').slider('values',1,value2);	
			rangepricehandle.eq(1).find('span').empty().text(value2);
		});
		$('.lb .filter > div > div.range > div p input').bind('click', function() {
			$(this).val('');
		});
	}
	if ( $('.filter .range.square').length > 0 ) {
		var squaremin = 50;
		var squaremax = 250;
		$('.filter .range.square > .slide').slider({
			range: true,
			min: 0,
			max: 500,
			step: 1,
			values: [squaremin, squaremax],
			slide: function(event,ui) {
				$('.filter .range.square').find('input.min').val(ui.values[0]);
				$('.filter .range.square').find('input.max').val(ui.values[1]);
				rangesquarehandle.eq(0).find('span').empty().text(ui.values[0]);
				rangesquarehandle.eq(1).find('span').empty().text(ui.values[1]);
			}
		});
		var rangesquarehandle = $(this).find('.filter .range.square > .slide .ui-slider-handle');
		$('.filter .range.square').find('input.min').val(squaremin);
		$('.filter .range.square').find('input.max').val(squaremax);
		rangesquarehandle.eq(0).append('<span>'+squaremin+'</span>');
		rangesquarehandle.eq(1).append('<span>'+squaremax+'</span>');
		$('.filter .range.square input.min').change(function() {
			var value1 = $('.filter .range.square input.min').val();
			var value2 = $('.filter .range.square input.max').val();
			if ( parseInt(value1) > parseInt(value2) ) {
				value1 = value2;
				$('.filter .range.square input.min').val(value1);
			}
			$('.filter .range.square > .slide').slider('values',0,value1);	
			rangesquarehandle.eq(0).find('span').empty().text(value1);
		});
		$('.filter .range.square input.max').change(function() {
			var value1 = $('.filter .range.square input.min').val();
			var value2 = $('.filter .range.square input.max').val();
			if ( value2 > 500 ) { 
				value2 = 500;
				$('.filter .range.square input.max').val(500);
			}
			if( parseInt(value1) > parseInt(value2) ) {
				value2 = value1;
				$('.filter .range.square input.max').val(value2);
			}
			$('.filter .range.square > .slide').slider('values',1,value2);	
			rangesquarehandle.eq(1).find('span').empty().text(value2);
		});
	}
	$('.lb .filter > div > div.range > div p input').each(function() {
		var v = this.value;
		$(this).blur(function() {
			if (this.value.length == 0) this.value = v;
		}).focus(function () {
			this.value = "";
		}); 
	});
	$('.lb .filter > div > .streets > div > ul li span').each(function() {
		$(this).append('<em></em>');
	});
	$('.rb .afisha .tab > ul li > a, .rb .reccslide.afisha > div .container > div .element > a, .item .otherafisha ul li > a').hover(
		function() {
			$(this).children('div').children('div').css({
				'padding-top': (318-$(this).children('div').children('div').height())/2+10+'px'
			});
		},
		function() {
			$(this).children('div').children('div').css({
				'padding-top': '13px'
			});
		}
	);
	$('.catalog .introduction .breadcrumbs li.home a').bind('click', function() {
		$('.sitemap').stop(true,true).fadeIn(250);
		$('.sitemap').css({
			'top': $(this).parents().offset().top-20+'px'
		});
		return false;
	});
	$('.sitemap .close').bind('click', function() {
		$(this).parent().stop(true,true).fadeOut(250);
		return false;
	});
	$('input[type="checkbox"], input[type="radio"]').uniform();
	$('select').selectbox();
	$('input, textarea').each(function () {
		$(this).data('holder',$(this).attr('placeholder'));
		$(this).focusin(function(){
			$(this).attr('placeholder','');
		});
		$(this).focusout(function(){
			$(this).attr('placeholder',$(this).data('holder'));
		});
	});
	$('.item > div > .timeline > div > div:nth-child(2n)').css({
		'background': '#f3f3f3'
	});
	$('.rb .list .tab > ul li').bind('tap', function() {
		$(this).siblings('li').find('h5').css({
			'opacity': '0'
		});
		$(this).find('h5').css({
			'opacity': '1'
		});
	});
	$('.citysel > div > ul li a, .catalog > div > .offices .list > ul li a, .catalog > div > .offices .list > div .cities > div ul li a, .favoritelist > ul li a').bind('click', function() {
		$(this).parent().addClass('active').siblings().removeClass('active');
		return false;
	});
	$('.citysel').hide();
	$('.panel .city > div h5 a').bind('click', function() {
		$('.citysel').stop(true,true).slideDown(250);
		$('.fade, .panel .city > div').stop(true,true).fadeOut(250);
		enablescroll();
		return false;
	});
	if ( $('.helpme').length > 0 ) {
		$('.helpme').hide();
		$('.panel .nav a[href="help"]').bind('click', function() {
			$('.helpme').slideDown(500);
			$('.panel').hide();
			$('.helpme > div > div ul li p').each(function() {
				$(this).css({
					'margin-top': (220-$(this).height())/2+1+'px'
				});
			});
			$('.helpme > div > div').append('<span class="ls"></span><span class="rs"></span>');
			$('.helpme > div > div .ls').hide();
			helpme();
			return false;
		});
		$('.helpme .close').bind('click', function() {
			$('.panel').show();
			$('.helpme').slideUp(500);
			return false;
		});
	}
	$('input[placeholder], textarea[placeholder]').placeholder();
	$('.lb .filter > div > div h3').each(function() {
		if ( $(this).find('span').length == 0 ) {
			$(this).css({
				'padding-right': '0'
			});
		}
	});
	$('.events > ul li a, .rb .list > .nav ul li a, .rb .spec > .nav ul li a, .rb .afisha > .nav ul li a, .favoritelist > ul li a').append('<em></em>');
	$('.rb .list .tab > ul > li').bind('click touchstart touchmove touchend tap taphold', function(e) {
		e.stopPropagation(); 
	});
});
$(window).load(function() {
	$('.item .poster ul li p span').each(function() {
		$(this).parent().css({
			'padding-left': $(this).outerWidth()+'px'
		});
		$(this).css({
			'margin-left': -$(this).outerWidth()+'px'
		});
	});
	if ( $('.also').length > 0 ) {
		var max = 0;
		$('.also ul li').each(function() {
			var h = $(this).height(); 
			max = h > max ? h : max;
		});
		$('.also ul li').height(max);
	}
});