$(function(){


    function brandsSlider() {
        var slider = document.querySelector('.site-brands__items');
        var respSettings = {
            0: {items: 2, gutter: 20},
            640: {items: 4, gutter: 20},
            768: {items: 4, gutter: 30},
            1024: {items: 5, gutter: 30},
            1261: {items: 5, gutter: 30},
            1280: {items: 6, gutter: 30}
        };

        if ($(slider).length) {
            var multislider = tns({
                loop: false,
                rewind: true,
                container: slider,
                slideBy: 1,
                autoplayHoverPause: true,
                mode: 'carousel',
                axis: 'horizontal',
                autoplay: false,
                autoplayButtonOutput: false,
                mouseDrag: true,
                center: false,
                autoWidth: false,
                nav: true,
                swipeAngle: 50,
                navPosition: 'bottom',
                preventActionWhenRunning: false,
                responsive: respSettings,
                controls: false
            });
        };
    }
    brandsSlider();


    $(function(){
        var $self = $('.lp-menu-1');
		var $block = $self.hasClass('js-menu-wrap') ? $self : $self.find('.js-menu-wrap');

		$block.each(function(){
			var $this = $(this),
				$topMenuWrap = $this.find('.js-menu__wrap'),
				$menu = $this.find('.js-menu_appedable'),
				$burger = $this.find('.js-burger'),
				$popup = $this.find('.js-popup'),
	    		popupHeight = $(window).height() - $this.height(),
	    		menuHeight = $this.outerHeight(),
	    		popupTop = menuHeight < 0 ? 0 : menuHeight,
	    		$bgTop = $this.height() + 50 < 0 ? 0 : $this.height() + 50,
	    		$liHaschild = $this.find('.haschild');

    		$this.find('.lp-menu-block-bg').animate({top: $bgTop}, 400);

	    	$popup.css('top', popupTop);

			// $menu.clone().prependTo($topMenuWrap);

			$(this).append('<div class="lp-menu-block-bg"></div>');

			function menuShow() {
		        var $ulWidth = 0,
		            $ulWrapWidth = $this.find('.js-menu__wrap').width();

		        $($menu).children('li').each(function(){
		            var $width = $(this).children('a').outerWidth(true);
		            $ulWidth += $width;
		        });

		        if (window.matchMedia('(min-width : 960px)').matches) {
		        	if ($ulWidth < $ulWrapWidth) {
		        		$this.find('.js-menu__wrap').addClass('show');
		        		$this.find('.js-burger').hide();
		        	}
		        	else {
		        		$this.find('.js-menu__wrap').removeClass('show');
		        		$this.find('.js-burger').show();
		        	}
		        } else if (window.matchMedia('(max-width : 959px)').matches && $menu.find('li').length == 0) {
					$this.find('.js-menu__wrap').addClass('show');
				    $this.find('.js-burger').hide();

				} else if (window.matchMedia('(max-width : 959px)').matches) {
		    		$this.find('.js-menu__wrap').removeClass('show');
		    		$this.find('.js-burger').show();
		        }

		        var $bgTop = $this.offset().top + $this.height();

		        menuHeight = $this.outerHeight(),
	    		popupTop = menuHeight < 0 ? 0 : menuHeight,
	    		$bgTop = $this.height() < 0 ? 0 : $this.height(),

	    		$this.find('.lp-menu-block-bg').animate({top: $bgTop}, 400);

    			$popup.css('top', popupTop);

	    		$this.find('.lp-menu-block-bg').css('top', $bgTop);
			}

		    $(window).on('resize', function(){

	    		setTimeout(function(){
					menuShow();
	    		},500);

		    }).trigger('resize');

		    $burger.on('click', function(){
		    	$menu.find('li a').addClass('menu-popup-item-custom');
		    	if ($(this).hasClass('_in-side')) {
		    		$popup.animate({top: 0}, 400);
		    		$this.find('.lp-menu-block-bg').css('top', 0);
		    	}
		    	if (!$(this).hasClass('_in-side')) {
                    $('html, body').animate({
                        scrollTop: $this.offset().top
                    }, 100);
		    	}

		    	$popup.find('.js-popup__inner').css({
		    		'overflow' : 'auto',
		    		'max-height' : '100%'
		    	});

		    	$burger.toggleClass('opened');
		    	if ($popup.hasClass('opened')) {
		    		$popup.animate({height: "0%"}, {duration: 800, complete: function() {$this.css('z-index', '')}}).removeClass('opened');
		    		$this.find('.lp-menu-block-bg').fadeOut(600);

		    		$('html').css('overflow', '');
		    	}
		    	else {
		    		$popup.animate({height: popupHeight}, {duration: 800}).addClass('opened');
		    		$this.find('.lp-menu-block-bg').fadeIn(600);
		    		$this.css('z-index', '999')
		    		$('html').css('overflow', 'hidden');
		    	}
		    });

		    $this.find('.haschild').on('click', function(e){
		    	e.stopPropagation();
		    	$(this).toggleClass('_open').children('ul').slideToggle();
		    });

		    $popup.find('.js-menu_appedable').on('click', 'a', function(){
		    	$burger.toggleClass('opened');
		    	$popup.animate({height: "0%"}, 800).removeClass('opened');
	    		$this.find('.lp-menu-block-bg').fadeOut(600);
	    		$this.css('z-index', '');
	    		$('html').css('overflow', '');
		    });
		});
    })
});