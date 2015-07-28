$(function(){
	centerSliderContent();
	searchHeader();
	mainMenu();
	catMenu();
	numberLists();
	scrollpane();
	dropDown();
	setEqualHeights();
	fancy();
	clients();
	rc();
	leftMenu();
	

	clntsMenu();


	

	// coddy 
	$('.js-tabs').lightTabs();
	$('.js-promo__slider').promoSlider();
	$('.partners-slider').partnersSlider();
	$('.other-slider').otherSlider();
	ajaxMoreBlocks();
	if($('#mapContact').length){
		$('#mapContact').mapContacts();
	}	
	$('.js-head__accord').headAccordion();

	
	function centerSliderContent() {
		var $slider = $('.slider');
		if (!$slider.length) {return false;}
		
		var $item = $slider.find('.slider-item'),
				$cont = $slider.find('.slider-content'),
				h = $slider.height();
		
		function center() {
			$cont.each(function(){
				var $this = $(this),
						th = $this.height(),
						mt = th/2;
						
				$this.css({'position':'absolute', 'top':'50%', 'margin-top':'-'+mt-10+'px', 'left':'0', 'right':'0'});
			});
		};
		
		center();
		$(window).resize(function(){center();});	
	};
	
	function searchHeader() {	
		var $search = $('.header-search');
		if (!$search.length) {return false;}
		
		var $form = $search.find('.search-form'),
				$closer = $search.find('.search-close'),
				$input = $search.find('.search-input'),
				$button = $search.find('.search-button'),
				$menuIcon = $('.header-menuIcon');
					
		function hideForm() {
			$form.fadeOut(400);
			$menuIcon.removeClass('active');
			$search.removeClass('active');
			setTimeout(function(){
				$form.show();
			}, 500);
		};      
		

		$search.on('click', function(e){
			e.preventDefault();
			var $target = $(e.target);
			
			if ($target.closest('.search-form').length) {}
			else {
				$search.addClass('active');
				$menuIcon.addClass('active');
				$input.focus();
			}
		});
		
		$('html').on('click', function(e){
			// e.preventDefault();
			var $target = $(e.target);
			if (!$target.closest('.search').length && $('.search.active').length) {
				hideForm();
			}
		});     
		
		$closer.on('click', function(e){
			e.preventDefault();
			hideForm();
		});	
	};
	
	function mainMenu() {		
		var $menu = $('.mainmenu'),
			$link = $('.mainmenu-link', $menu),
			$submenu = $('.submenu', $menu),
			$closer = $('.mainmenu-closer', $menu),
			$icon = $('.header-menuIcon'),
			win = $(window);

		$menu.on('click', '.mainmenu-link', function(e){
			var $this = $(this);
			$link.removeClass('active');
			$this.addClass('active');
		});

		$menu.on('click', '.mainmenu-link.active', function(e){
			$(this).removeClass('active');
		});
		
		
		$(window).on('load resize', function(){			
			var wW = $(this).width();
			if(wW >= 900){
				$link.on('mouseenter', function(e){
					var $this = $(this);
					$this.addClass('active');
				});

				$link.on('mouseleave', function(e){
					var $this = $(this);
					$this.removeClass('active');
				});
			} else {
				$link.off('mouseenter mouseleave')
			}
		});

		$closer.on('click', function(e){
			$menu.removeClass('active')
			$link.removeClass('active');
		});
		
		$icon.on('click', function(e){
			($menu.hasClass('active')) ? $menu.removeClass('active') : $menu.addClass('active')			
		});
	};	
	
	function catMenu() {	
		var $menu = $('.catmenu[data-menu]'),
			$link = $('[data-menu] .catmenu-link');
		
		$link.on('click', function(e){
			e.preventDefault();
			var $this = $(this),
				href = $this.attr('href').replace('#', '');
			
			$('html, body').animate({scrollTop: $('[name="'+href+'"]').offset().top}, function(){
				location.hash = href;
			});
		});
	};
	
	function numberLists() {
		var $lists = $('.rightContent ol, .centers ol'),
			clsNm = 'numberredlist-number';
		
		$lists.each(function(){
			var $this = $(this),
				indx = 1;
			
			$this.find('li').each(function(){
				$(this).append('<div class="'+clsNm+'">'+indx+'</div>');
				++indx;
			});
		});	
	};
	
	function scrollpane() {	
		if (!$('.scrollpane').length) {return}
		$('.scrollpane').jScrollPane();	
	};
	
	function dropDown() {	
		var $select = $('.select'),
				$hidden = $select.find('input[type="hidden"]'),
				$value = $select.find('.select-val'),
				$list = $select.find('.select-list'),
				
				listClass = 'select-list',
				selectClass = 'select';
		
		function showList() {
			$list.fadeIn(200);
			scrollpane();
		};
		
		function hideList() {
			$list.fadeOut(200);
		};
		
		function changeValue($item) {
			var vl = $item.text();
			$value.text(vl);
			$hidden.val(vl);
			tags.addTag(vl);
		};
		
		
		$select.on('click', function(e){
			e.preventDefault();
			if ($(e.target).closest('.'+listClass).length) {
				changeValue($(e.target).closest('li'));
				hideList();
			}
			else {
				showList();
			}
		});
		
		$('html').on('click', function(e){
			// e.preventDefault();
			if (!$(e.target).closest('.'+selectClass).length) {
				hideList();
			}
		});
	};
	
	// ! tags
	
	function Tags() {	
		var th = this,
				$tags = $('.tags'),
				$wrap = $tags.find('.tags-wrap'),
				$reset = $tags.find('.tag-reset'),
				
				template = '<span class="tag"><%= tag =%></span>';
		
		this.addTag = function(text) {
			templ2 = template.replace('<%= tag =%>', text);
			$reset.show();
			var ok = true;
			$wrap.find('.tag').each(function(){
				var $this = $(this);
				if ($this.text() == text) {ok = false;}
			});
			if (ok) {$wrap.append(templ2).addClass('active');}
		};
		
		this.removeTag = function($tag) {
			$tag.remove();
			if ($tag.length == 1) {
				$reset.hide();
			}
		};
		
		this.removeTags = function() {
			$wrap.find('.tag').remove();
			$reset.hide();
			// $wrap.removeClass('active');
		};
		
		$wrap.on('click', function(e){
			e.preventDefault();
			var $tag = $(e.target).closest('.tag');
			if ($tag.length) {
				th.removeTag($tag);
			}
		});
		
		$reset.on('click', function(e){
			e.preventDefault();
			th.removeTags();
		});
		
		return this;
	};
	
	var tags = new Tags();
	
	function setEqualHeights() {	
		var elements = [$('.prj-item, .js-height_adjust')], 
				max = 0;
		
		for (var i = 0; i<elements.length; ++i) {
			var $elements = elements[i];
			max = 0;
			
			$elements.removeAttr('style').each(function(){
			if ($(this).height() > max) {max=$(this).height();}
		  });
		  $elements.height(max);
		}
	};
	
	$(window).resize(function(){
		setEqualHeights();
	});
	
	function fancy() {		
		if (!$('.license a').length) {return false;}
		$('.license a').fancybox();
	};
	
	function clients() {		
		$('.js-tabs-client__list a').on('click', function(e){
			e.preventDefault();
			
			$('.js-tabs-client__list a').removeClass('active');
			$(this).addClass('active');
			
			var group = $(this).attr('href').replace('#', '');
			if (group == 'all') {$('.js-tabs-client__rel').show();}
			else {
				$('.js-tabs-client__rel').hide();
				$('[rel="'+group+'"]').show();
				}
		});		
	};
	
	function rc() {
		var $r = $('.rightcol');
		var $el;
		var api;
		
		function isOk() {return ($('html').hasClass('w7590'))}
		
		// function initSc() {
			
		// 	$el = $('.rightcol-content').jScrollPane();
		// 	api = element.data('jsp');
			
		// };
		
		function setMargin() {
			var m = $('#all').height() - $('.footer').height() - $(window).height();
			var sc = $(window).scrollTop();
			if (sc >= m) {
				$r.css({'margin-bottom': (sc-m)+'px' });
			}
			else {
				$r.css({'margin-bottom': 'auto' });
			}
		};
				
		$(window).scroll(function(){
			if (isOk()) {
				setMargin();
			}
		});
		
		$(window).resize(function(){
			if (isOk()) {
				setMargin();
				// initSc();
				if($r.hasClass('active')) {$r.css({'height':($(window).height() - $('.header').height())});}
			}
			else {
				$r.css({'margin-bottom': 'auto' });
				if (api) {
				api.destroy();
				}
			}
		});
		
		
		$r.on('click', function(e){
			if (!$(e.target).closest('a').length) {
				e.preventDefault();
				if ($r.hasClass('active')) {
					$r.animate({'height':'55px'}, 400).removeClass('active');
				}
				else {
					$r.animate({'height':($(window).height() - $('.header').height())}, 400, function(){
					}).addClass('active');
					// setTimeout(function(){initSc();}, 600);
				}
			}
		});
	};	


	function ajaxMoreBlocks(){
	    var btn = $('.js-blocks__more');

	    	btn.click(function(e){
				e.preventDefault();
				var a = $(this),
				PREVBLOCK = a.parent().prev('.js-ajax-block__list');

			$.ajax({
				url: a.attr('href'),
				method: 'GET',
				cache: true,
				success: function(html){
					$('body').animate({
						scrollTop: a.offset().top - 70
					}, 800)
					PREVBLOCK.append(html).fadeIn('slow');
					setEqualHeights();
					a.parent().hide();
					}
				});			
	      return false;
	     });
	}


	function leftMenu(){
		$('.leftmenu li').each(function(){
				$(this).attr('data-level', ($(this).parents('ul').length));
			});
			
			
			$('.leftmenu a').click(function(e){
				e.preventDefault();
				var $p = $(this).closest('li');
				if (!$p.find('ul').length) {location.href = $(this).attr('href');}
				
				if (!$p.hasClass('active')) {
					var level = $p.attr('data-level');
					$('.active[data-level="'+level+'"]').slideUp(200);
					$p.addClass('active');
					$p.find('> ul').slideDown(200);
				}
				else {
					$p.removeClass('active');
					$p.find('> ul').slideUp(200);
				}
			});
	}
		
});





(function($){				
    jQuery.fn.lightTabs = function(options){

        var createTabs = function(){
            tabs = this;
            i = 0;
            
            showPage = function(i){
                $(tabs).children("div").children("div").hide();
                $(tabs).children("div").children("div").eq(i).show();
                $(tabs).children("ul").children("li").removeClass("active");
                $(tabs).children("ul").children("li").eq(i).addClass("active");
            }
                                
            showPage(0);				
            
            $(tabs).children("ul").children("li").each(function(index, element){
                $(element).attr("data-page", i);
                i++;                        
            });
            
            $(tabs).children("ul").children("li").click(function(){
                showPage(parseInt($(this).attr("data-page")));
            });				
        };		
        return this.each(createTabs);
    };	
})(jQuery);

(function($){
	$.fn.mapContacts = function(){
		   google.maps.event.addDomListener(window, 'load', init);
		    var map;
		    function init() {
		        var mapOptions = {
		            center: new google.maps.LatLng(55.708867,37.654072900000074),
		            zoom: 15,
		            zoomControl: false,
		            disableDoubleClickZoom: true,
		            mapTypeControl: false,
		            scaleControl: false,
		            scrollwheel: false,
		            panControl: false,
		            streetViewControl: false,
		            draggable : true,
		            overviewMapControl: false,
		            overviewMapControlOptions: {
		                opened: false,
		            },
		            mapTypeId: google.maps.MapTypeId.ROADMAP,
		            styles: [{"stylers":[{"hue":"#ff1a00"},{"invert_lightness":true},{"saturation":-100},{"lightness":33},{"gamma":0.4}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#2D333C"}]}],
		        }
		        var mapElement = document.getElementById('mapContact');
		        var map = new google.maps.Map(mapElement, mapOptions);
		        var locations = [
		['Бизнес-центр “Слободской”, 3-й этаж', 'undefined', 'undefined', 'undefined', 'undefined', 55.712379, 37.654072900000074, 'img/ico_07.png']
		        ];
		        for (i = 0; i < locations.length; i++) {
					if (locations[i][1] =='undefined'){ description ='';} else { description = locations[i][1];}
					if (locations[i][2] =='undefined'){ telephone ='';} else { telephone = locations[i][2];}
					if (locations[i][3] =='undefined'){ email ='';} else { email = locations[i][3];}
		           if (locations[i][4] =='undefined'){ web ='';} else { web = locations[i][4];}
		           if (locations[i][7] =='undefined'){ markericon ='';} else { markericon = locations[i][7];}
		            marker = new google.maps.Marker({
		                icon: markericon,
		                position: new google.maps.LatLng(locations[i][5], locations[i][6]),
		                map: map,
		                title: locations[i][0],
		                desc: description,
		                tel: telephone,
		                email: email,
		                web: web
		            });
		link = '';     }

		}
	}
})(jQuery);


(function($){
	$.fn.headAccordion = function(){
		var $cont = this,
			$btn = $('.place', $cont),
			$dropdown = $('.contacts__accord-dropdown', $cont);

			$('html').on('click', function(e){
		      	$cont.addClass('closed').removeClass('opened');
		    });

			$btn.on('click', function(event){
				event.stopPropagation();
				if($cont.hasClass('closed')){
					$cont.addClass('opened').removeClass('closed');
				} else {
					$cont.addClass('closed').removeClass('opened');
				}
			});

			$dropdown.on('click', 'li:not(.current)', function(event){
				var data = $(this).attr('data-type'),
					text = $(this).text();

					$dropdown.find('li.current').removeClass('current');
					$(this).addClass('current');
					$btn.text(text);

					$cont.removeClass('car metro').addClass(data);
			});

	}
})(jQuery);


function clntsMenu(){
	var cont = $('.js-mobile__accord'),
		block = $('.clnts-items', cont);
		$window = $(window),
		hasPrepended = false;


	function toggleBar(){
		if($(this).outerWidth(true) <= 765){
			if(hasPrepended == true){
				return;
			}
			hasPrepended = true;

			// block.hide();
			cont.on('click', clientEv);
		} else if ($(this).outerWidth(true) > 765){
			hasPrepended = false;
			// block.show();
			cont.off('click');
		}
	}

	function clientEv(event){
		var that = $(this),
			nodeType = event.target.nodeName,
			closestA = event.target.closest('a'),
			offsetA = that.offset().top - 70;
			
		block = $('.clnts-items', that);

			$('body').finish().animate({
				scrollTop: offsetA
			});

		if(nodeType !== 'INPUT' && nodeType !== 'A' &&  closestA == null ){
			that.toggleClass('current');
		}		
	}

	

	$window.on('load resize', function(){ toggleBar(); });
	
}



(function($){
	$.fn.promoSlider = function(){
		var slider = this;

		slider.slick({
			infinite: true,
			dots: true,
			arrows: false
		})
	}
})(jQuery);

(function($){
	$.fn.partnersSlider = function(){
		var slider = this;

		slider.slick({
			slidesToShow: 5,
			slidesToScroll: 5,
			infinite: false,
			arrow: false,
			responsive: [
				{
					breakpoint: 1100,
					settings: {
						slidesToShow: 4,
						slidesToScroll: 1,
						infinite: false,
						centerMode: false,
						variableWidth: false,
						arrows: true
					}
				}
			]
		})
	}
})(jQuery);


(function($){
	$.fn.otherSlider = function(){
		var slider = this;

		slider.slick({
			slidesToShow: 3,
			slidesToScroll: 1,
			arrows: false,
			dots: true,
			swipe: false,
			responsive: [
				{
					breakpoint: 1100,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 1,
						swipe: true,
					}
				},
				{
					breakpoint: 765,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
						swipe: true,
					}
				}
			]
		});
	}
})(jQuery);