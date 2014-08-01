(function($) {
	return custom_prefs	= {
		init: function () {
			/** Social Icons animation **/
			$('.footer_inner .social_icons a').hover(function () {
				$(this).find('i').stop(true,true).delay(200).animate({
					top:-60
				}, 'fast', function (){
					$(this)
						.addClass('active')
						.css({
							top:120
						})
						.animate({top:0})
				});
			},function (){

				$(this)
					.find('i')
					.stop(true,true)
					.animate({
						top:0
					})
					.removeClass('active')
			});


			/** HomePage Portfolio Overlay **/

			$('.portfolio div.portfolio-item').hover(function (){

				var t = $(this),
					img = t.find('img');

				if (!!img.length) {
					var img_right = img.position().right;
					var img_left = img.position().left;
					var img_top = img.position().top;
					var img_w = img.width();
					var img_h = img.height();

					t.find('.overlay').css({
						width: 0,
						height: img_h,
						left: img_right,
						top: img_top
					});

					t.find('.overlay').stop(true, true).animate({width: img_w});

					t.find('.item').stop(true, true).css({
						width: img_w - 80,
						height: img_h - 80,
						left: img_left + 40,
						top: img_top + 40
					}).fadeIn('fast');

					t.find('a').stop(true, true).css({
						width: img_w,
						height: img_h,
						left: img_left,
						top: img_top
					}).fadeIn('fast');
				}

			},function(){

				var t = $(this);


				t.find('.item').stop(true,true).fadeOut('fast');
				t.find('.overlay').stop(true,true).animate({width:0}).fadeIn(0);

			});



			/** Portfolio Mix **/

			$('.js-container .js-image').each(function (i) { //$('.js-container[data-id="all"] .js-image')

				t = $(this);
				t.delay(100*i).fadeIn('slow');
			});


			var remaining = 0;

			$('.portfolio-mix .qs_links a').click(function (i) {

				i.preventDefault();
				$(this).addClass('sel').siblings().removeClass('sel');

				var visible = $('.js-container:visible');
				remaining = visible.find('.js-image').length;


//				var rel = $(this).attr('data-id');

				visible.find('.js-image').each(function (i) {

					t = $(this);

					t.delay(50*i).fadeOut('slow', function () {

						if(i == (remaining-1))
						{

							$('.js-container').fadeIn('fast', function (){//.js-container[data-id="'+rel+'"]

								$('.js-container .js-image').each(function (i) {//div[data-id="'+rel+'"].js-container .js-image

									t = $(this);
									t.delay(100*i).fadeIn('slow');
								});

							});
							visible.fadeOut('fast');
						}
					});
				});

			});



			$('.js-container .js-image').hover(function (){

				var t = $(this),
					img = t.find('img');

				if (!!img.length) {
					var img_right = img.position().right;
					var img_left = img.position().left;
					var img_top = img.position().top;
					var img_w = img.width();
					var img_h = img.height();

					t.find('.overlay').css({
						width: 0,
						height: img_h,
						left: img_right,
						top: img_top
					});

					t.find('.overlay').stop(true, true).animate({width: img_w});

					t.find('.item').stop(true, true).css({
						width: img_w - 80,
						height: img_h - 80,
						left: img_left + 40,
						top: img_top + 40
					}).fadeIn('fast');

					t.find('a').stop(true, true).css({
						width: img_w,
						height: img_h,
						left: img_left,
						top: img_top
					}).fadeIn('fast');
				}

			},function(){

				var t = $(this);


				t.find('.item').stop(true,true).fadeOut('fast');
				t.find('.overlay').stop(true,true).animate({width:0}).fadeIn(0);

			});




			/** HomePage Articles Overlay **/

			$('.projects .step').hover(function (){

				var t = $(this),
					img = t.find('img');

				if (!!img.length) {
					var img_left = img.position().left;
					var img_top = img.position().top;
					var img_w = img.width();
					var img_h = img.height();

					$('.projects .step .overlay').css({
						width: img_w,
						height: img_h,
						left: img_left,
						top: img_top
					});

					t.find('.overlay').fadeTo('fast', 0.9);

					$('.link_button').css({
						width: 45,
						height: 31,
						left: ((img_w - 100) / 2) + img_left,
						top: ((img_h - 45) / 2) + img_top
					});

					$('.resize_button').css({
						width: 45,
						height: 31,
						left: ((img_w - 100) / 2) + img_left + 55,
						top: ((img_h - 45) / 2) + img_top
					});

					t.find('.link_button, .resize_button').fadeTo('fast', 0.7);
				}

			},function(){

				var t = $(this)

				t.find('.overlay, .link_button, .resize_button').fadeOut('fast');

			});




			/** About Us Team Overlay **/

			$('.team .step').hover(function (){

				var t = $(this),
					img = t.find('img');

				if (!!img.length) {
					var img_left = img.position().left;
					var img_top = img.position().top;
					var img_w = img.width();
					var img_h = img.height();

					$('.overlay').css({
						width: img_w,
						height: img_h,
						left: img_left,
						top: img_top
					});

					t.find('.overlay').fadeTo('fast', 0.9);

					$('.tw').css({
						width: 45,
						height: 31,
						left: ((img_w - 100) / 2) + img_left,
						top: ((img_h - 45) / 2) + img_top
					});

					$('.fb').css({
						width: 45,
						height: 31,
						left: ((img_w - 100) / 2) + img_left + 55,
						top: ((img_h - 45) / 2) + img_top
					});

					t.find('.tw, .fb').fadeTo('fast', 1);
				}

			},function(){

				var t = $(this)

				t.find('.overlay, .tw, .fb').fadeOut('fast');

			});


			/** Go To Top Page Link **/

			$('.go-top').click(function(e){
				event.preventDefault();
				$("html, body").animate({ scrollTop: 0 }, 600);
			});




			/** Fancybox initialize **/

			$(".fancybox").fancybox({
				openEffect	: 'elastic',
				closeEffect	: 'elastic'
			});




			/** Isotope Portfolio **/

			try {
				var $container = $('#isotope');

				$container.isotope({
					itemSelector : '.element',
					animationEngine: 'jquery'
				});
			} catch(e)
			{
				//do nothing
			}


			$('#filters a').click(function(){
				var $this = $(this);
				$(this).addClass('sel').siblings().removeClass('sel');

				// don't proceed if already selected
				if ( $this.hasClass('selected') ) {
					return false;
				}
				var $optionSet = $this.parents('.option-set');
				$optionSet.find('.selected').removeClass('selected');
				$this.addClass('selected');

				// make option object dynamically, i.e. { filter: '.my-filter-class' }
				var options = {},
					key = $optionSet.attr('data-option-key'),
					value = $this.attr('data-option-value');
				// parse 'false' as false boolean
				value = value === 'false' ? false : value;
				options[ key ] = value;
				if ( key === 'layoutMode' && typeof changeLayoutMode === 'function' ) {
					// changes in layout modes need extra logic
					changeLayoutMode( $this, options )
				} else {
					// otherwise, apply new options
					$container.isotope( options );
				}

				return false;
			});



			$('#isotope li').hover(function (){

				var t = $(this),
					img = t.find('img'),
					link = t.find('a').attr('href');

				if (!!img.length) {
					var img_left = img.position().left;
					var img_top = img.position().top;
					var img_w = img.width();
					var img_h = img.height();

					var overlay = $('<a></a>').attr('href', link).addClass('overlay fancybox').css({
						width: img_w,
						height: img_h,
						left: img_left,
						top: img_top
					});

					t.append(overlay).find('.overlay').fadeTo('fast', 0.9);
				}


			},function(){

				var t = $(this)

				t.find('.overlay').remove();

			});



			/** Instagram Photo Widget **/
			$('#instagram').on('hover', 'li', function (){

				var t = $(this);
				$('#instagram li').not(this).fadeTo('slow', 0.5);
				t.stop(true,true).fadeTo('fast', 1);

			});

			$('#instagram').mouseleave(function() {
				$(this).find('li').stop(true,true).fadeTo('fast', 1);
			});




			/** Blog Articles Overlay **/

			$('.blog-items .step').hover(function (){

				var t = $(this),
					img = t.find('img');

				if (!!img.length) {
					var img_left = img.position().left;
					var img_top = img.position().top;
					var img_w = img.width();
					var img_h = img.height();

					$('.overlay').css({
						width: img_w,
						height: img_h,
						left: img_left,
						top: img_top
					});

					t.find('.overlay').fadeTo('fast', 0.9);

					$('.link_button').css({
						width: 45,
						height: 31,
						left: ((img_w - 100) / 2) + img_left,
						top: ((img_h - 45) / 2) + img_top
					});

					$('.resize_button').css({
						width: 45,
						height: 31,
						left: ((img_w - 100) / 2) + img_left + 55,
						top: ((img_h - 45) / 2) + img_top
					});

					t.find('.link_button, .resize_button').fadeTo('fast', 0.7);
				}

			},function(){

				var t = $(this);
				t.find('.overlay, .link_button, .resize_button').fadeOut('fast');

			});




			/** Button Hover **/
			$('.btn-primary').hover(function () {

				$(this).fadeTo('fast', 0.8);


			}, function () {

				$(this).fadeTo('fast', 1);
			})


			/** Back link **/
			$('a.back').click(function(e){
				e.preventDefault();
				parent.history.back();
			});

		}
	}


})(jQuery);