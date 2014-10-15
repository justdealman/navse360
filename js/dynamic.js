$.fn.preload = function() {
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
			'-o-transform': 'translateX('+(-dx)+'px)'
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
	$('.wrapper').append('<div class="temp"></div>');
	$('.reccslide > div .element:not(.cloned)').detach().appendTo($('.temp'));
	$('.reccslide > div .slides_control, .reccslide > div .pagination').remove();
	$('.reccslide > div .container > div').remove();
	var rl = $('.temp .element').size();
	if ( $('.wrapper').width() >= 1260 ) {
		var cols = 4;
	}
	else {
		var cols = 3;
	}
	for ( var i = 0; i < rl/cols; i++ ) {
		$('.reccslide > div .container').append('<div></div>');
		for ( var j = 1; j <= cols; j++ ) {
			$('.temp .element:first-child').detach().appendTo($('.reccslide > div .container > div:nth-child('+eval(i+1)+')'));
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
		generateNextPrev: false,
		container: 'container',
		effect: 'slide',
		slideSpeed: 500,
		slideEasing: 'easeInOutCubic',
		play: 10000,
		pause: 2500
	});
	$('.wrapper .temp').remove();
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
	if ( $(window).width() < 1260 ) {
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
$(window).resize(function() {
	if ( $('.slider').length > 0 ) {
		slider();
	}
	if ( $('.rb .spec .tab').length > 0 ) {
		spec();
	}
	if ( $('.reccslide').length > 0 ) {
		rebuild();
		$('input.re').change(function() {
			reccslide();
			$('.reccslide > div .pagination li:first-child a').trigger('click');
		});
	}
	if ( $('.item .other').length > 0 ) {
		otheritem();
	}
});
$(document).ready(function() {
	$(['./img/a_bg_hover.png','./img/a_bg_type2_hover.png','./img/map_a_hover.png']).preload();
	if ( $('.slider').length > 0 ) {
		$('.slider > div').slides({
			generatePagination: true,
			generateNextPrev: false,
			container: 'container',
			effect: 'slide',
			slideSpeed: 500,
			slideEasing: 'easeInOutCubic',
			play: 10000,
			pause: 2500
		});
		slider();
		$('.slider').bind('swiperight', function() {
			$('.slider .prev').trigger('click');
		});
		$('.slider').bind('swipeleft', function() {
			$('.slider .next').trigger('click');
		});
	}
	if ( $('.reccslide').length > 0 ) {
		var re;
		$('.wrapper').append('<input type="hidden" class="re" value="'+re+'">')
		rebuild();
		reccslide();
	}
	if ( $('.item .other').length > 0 ) {
		otheritem();
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
		'ХЗ 2'
	];
	$('.catalog .list .tab > ul > li').each(function() {
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
	$('.panel .drop, .panel .city > div, .modal, .filterup').append('<span class="close"></span>');
	function panelclose() {
		$('.panel .drop, .panel .language > li > ul').stop(true,true).fadeOut(250);
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
	$('.panel .drop, .panel .language > li > ul, .found, .lb .filter > div > div ul li input[type="checkbox"], .filterup, .lb .filter > div > div h5').click(function(e) {
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
			$('.rb .map .ymaps-controls-pane').hide();
		}
		else {
			$(this).addClass('active');
			$(this).children('span').html('свернуть карту<em></em><strong></strong>');
			$(this).parent().children('div').stop(true,true).animate({
				'height': '400px'
			}, 500);
			$('.rb .map .ymaps-controls-pane').show();
		}
		return false;
	});
	$('.lb .filter > div > div > ul, .lb .filter > div > div > h5').hide();
	$('.lb .filter > div > div.active > ul, .lb .filter > div > div.active > h5').show();
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
	$('.rb .spec > .nav ul li a').bind('click', function() {
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
});