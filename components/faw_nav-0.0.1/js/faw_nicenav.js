; (function ($) {
	var methods = {
		nicenav_template_init:function(){
			//作为模板的时候不用绑定nicenav_click
			methods.nicenav_sizecheck();
			$(window).resize(function() {
				methods.nicenav_sizecheck()
			});
		},

		nicenav_init: function(){
			methods.nicenav_sizecheck();
			methods.nicenav_click();
			$(window).resize(function() {
				methods.nicenav_sizecheck()
			});
		},
		
		nicenav_sizecheck: function(){
			if (document.body.offsetWidth < 670 ) {
				$(".faw-nav").css('display','none')
			}else{
				$(".faw-nav").css('display','block')
			}
		},
		
		nicenav_click: function(){
			$('.faw-nav-container>ul>li>a').click(function(){
				//导航栏点击回调函数,同时主页面显示相应的项目
				var tabname = $(this).find('span').text();
				var onflag = true;
				$('.faw-nav-container>ul>li>a').removeClass('cur')
				$(this).addClass('cur')
				$('.large-switch-circle>ul>li').removeClass('on')
				$('.large-switch-circle>ul>li').removeClass('show')
				$('.large-switch-circle>ul>li').each(function(index,ele){
					if ($(ele).hasClass(tabname)){
						if (onflag){
							$(ele).trigger('click')
							$(ele).addClass('on')
							onflag = false;
						}
						$(ele).addClass('show')
					}
				})
			})
		},
	}
	$.fn.nicenav = function(method){
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.nicenav_init.apply(this, arguments);
		} else {
			$.error('Method' + method + 'does not exist on jQuery.tooltip');
		}
	}
}(jQuery));