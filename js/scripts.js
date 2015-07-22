$(function(){

	var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
	var isFirefox = typeof InstallTrigger !== 'undefined'; 
	var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
	var isChrome = !!window.chrome && !isOpera;              
	var isIE = /*@cc_on!@*/false || !!document.documentMode;
	
	var is_touch_device = 'ontouchstart' in document.documentElement;
	var is_windows_touch = false;
	if (navigator.userAgent.toLowerCase().indexOf("windows phone") != -1) {is_windows_touch = true;}
	var isAndroid = navigator.userAgent.toLowerCase().indexOf("android") > -1;
	
	if (isOpera) {$('html').addClass('opera')}
	if (isFirefox) {$('html').addClass('ff')}
	if (isSafari) {$('html').addClass('safari')}
	if (isChrome) {$('html').addClass('chrome')}
	if (isIE) {$('html').addClass('ie')}
	
	if (is_touch_device) {$('html').addClass('touch');}
	if (is_windows_touch) {$('html').addClass('wp');}
	if (isAndroid) {$('html').addClass('android');}
	

	widthClasses();
	centerSliderContent();
	initPeppermint();
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
	

	// coddy 
	$('.other .peppermint, .clnts .peppermint, .js-news__slider').slider3();
	$('.js-tabs').lightTabs();
	ajaxMoreBlocks();
				
	
	function widthClasses() {
		var $html = $('html');
		
		function removeWidthClasses(elem) {
			elem.removeClass('w1216 w9012 w7590 w5075 wl75 wg16');
		};
		
		function setWidthClasses() {
			var w = $html.width();
			if (w > 1600) {removeWidthClasses($html);$html.addClass('wg16')}
			else if (w <= 1600 && w > 1100) {removeWidthClasses($html);$html.addClass('w1216')}
			else if (w <= 1100 && w > 900) {removeWidthClasses($html);$html.addClass('w9012')}
			else if (w <= 900 && w > 700) {removeWidthClasses($html);$html.addClass('w7590')}
			else if (w <= 700 && w > 500) {removeWidthClasses($html);$html.addClass('w5075')}
			else if (w <= 500 && w > 300) {removeWidthClasses($html);$html.addClass('wl75')}
		};  
		
		setWidthClasses();
		$(window).resize(function(){setWidthClasses();});
	};
	
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
						
				$this.css({'position':'absolute', 'top':'50%', 'margin-top':'-'+mt+'px', 'left':'0', 'right':'0'});
			});
		};
		
		center();
		$(window).resize(function(){center();});	
	};
	
	function initPeppermint() {
		
		if (!$('.peppermint').length) {return false;}
		var curSlideNumber = 0,
				commonTimer = 4000;
		
		var slider1 = $('.slider.peppermint');

		slider1.Peppermint({
			speed: 500,
			slideshow: true,
			slideshowInterval: commonTimer,
			stopSlideshowAfterInteraction: false,
			dots: true
		});
	
		
		var slider2 = $('.partners-slider.peppermint');
			slider2.Peppermint({
				slideshow: false,
				dots: false
			});
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
		var $menu = $('.mainmenu');
		if (!$menu.length) {return false;}
		
		var $link = $('.mainmenu-link'),
				$submenu = $('.submenu'),
				$closer = $('.mainmenu-closer'),
				$icon = $('.header-menuIcon');
				timer = 400;
		
		
		function isSmallScreen() {
			return ($('html').hasClass('w7590'))
		};
		
		function isPhone() {
			return ($('html').hasClass('wl75') || $('html').hasClass('w5075'))
		}
				
		
		$link.on('click', function(e){
			var $this = $(this);
			
			if (!$this.find('.submenu').length) {var loc = $this.attr('href'); location.href = loc;}
			
			if (isPhone()) {
				var had = false;
				if ($this.hasClass('active')) {had = true;}
				$('.mainmenu-link').removeClass('active');
				if (!had) {
					$this.addClass('active');
				}
			}
			else if (isSmallScreen() && (is_touch_device || is_windows_touch || isAndroid)) {
				$('.submenu').hide();
				$this.find('.submenu').show();
			}
			else {
				$this.find('.submenu').stop().fadeIn(timer);
			}
		});
		
		
		$link.on('mouseenter', function(e){
			var $this = $(this);
			if (isPhone()) {}
			else if (isSmallScreen() || (is_touch_device || is_windows_touch || isAndroid)) {}
			else {$this.find('.submenu').stop().fadeIn(timer);} 
		});
		
		
		$link.on('mouseleave', function(e){
			if (isPhone()) {}
			else if (isSmallScreen() && (is_touch_device || is_windows_touch || isAndroid)) {$this.find('.submenu').hide();}
			else {$(this).find('.submenu').stop().fadeOut(timer);}  
		});
		
		
		$closer.on('click', function(e){
			e.preventDefault();
			$('.mainmenu').removeClass('active')
		});
		
		
		$icon.on('click', function(e){
			e.preventDefault();
			$('.mainmenu').addClass('active')
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
			if (ok) {$wrap.append(templ2);}
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
				PREVBLOCK = a.parents('.js-ajax-block__list');

			$.ajax({
				url: a.attr('href'),
				method: 'GET',
				cache: true,
				success: function(html){
					$('body').animate({
						scrollTop: a.offset().top - 35
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
	$.fn.slider3 = function(){
		var slider = $(this);

		slider.Peppermint({
			slideshow: false,
			dots: true
		});
	}
})(jQuery);



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