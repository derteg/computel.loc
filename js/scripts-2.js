/*
$(function(){
	
	
	// left menu model
	
	var LeftMenuModel = Backbone.Model.extend({
		
		defaults: {
			level: 0,
			max: 3
		},
		
		setLevel: function(level) {
			//this.set('level', this.get('level')+1);
		},
		
		nextLevel: function() {
			this.set('level', this.get('level')+1);
		},
		
		prevLevel: function() {
			this.set('level', this.get('level')-1);
		},
		
		checkLevel: function() {
			return this.level === this.max
		}
		
	});
	
	
	var leftMenuModel = new LeftMenuModel({level:0, max:2});
	
	
	
	// left menu view
	
	var LeftMenuView = Backbone.View.extend({
		
		el: '.leftmenu',
		
		events: {
			'click li': 'check',
			'click a': 'checkHref'
		},
		
		initialize: function() {
			this.render();
		},
		
		render: function() {
			_.each($(this.el).find('li'), function(el){
				$(el).attr('data-level', ($(el).parents('ul').length));
			});
			
		},
		
		getLevel: function() {
			return this.model.get('level');
		},
		
		checkHref: function(e) {
			$link = $(e.target);
			//if ($link.attr('href') !== '#') {location.href = $link.attr('href')}
		},
		
		check: function(e) {
			var $el = $(e.target).closest('li');
			
			if (!$el.hasClass('active')) {
				this.open($el);
			}
			else {
				this.close($el);
			}

		},
		
		open: function($el) {
			//console.log(parseInt($el.attr('data-level')) +' '+this.getLevel());
			//if (parseInt($el.attr('data-level')) === this.model.get('max')) {return;}
			$el.addClass('active');
			this.model.nextLevel();
		},
		
		close: function($el) {
			console.log(parseInt($el.attr('data-level')) +' '+this.getLevel());
			if (parseInt($el.attr('data-level')) !== this.getLevel()) {return}
			$el.removeClass('active');
			this.model.prevLevel();
		}
		
	});
	
	var leftMenuView = new LeftMenuView({model:leftMenuModel});
	
	
	
});
*/


$(function(){
	
	
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
 
	
	
});