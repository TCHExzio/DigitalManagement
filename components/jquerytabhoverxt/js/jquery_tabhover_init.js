;
(function($) {

	var methods = {
		tab_hover_init: function() {
			//初始化功能滑动按钮
			$(".large-switch").slide({
				autoPlay: false,
				trigger: "click",
				delayTime: 1000
			});
			//初始化功能收藏功能
			$(".large-switch").collection();
			methods.set_item_click();
		},

		set_mini_collection_star: function() {
			//屏幕太窄,进行响应式适应
			$('.large-switch-middle .large-switch-item').css('height', '104px');
			$('.large-switch-middle .large-switch-item-clear').css('height', '104px');
			$('.large-switch-dx').css('line-height', '104px');
			$('.large-switch-item .large-item-img').css('margin-top', '11px');
			$('.large-item-img').css('height', '48px');
		},

		set_show_collection_star: function() {
			//屏幕太宽,进行响应式适应
			$('.large-switch-middle .large-switch-item').removeAttr("style");
			$('.large-switch-middle .large-switch-item-clear').removeAttr("style");
			$('.large-switch-dx').removeAttr("style");
			$('.large-switch-item .large-item-img').removeAttr("style");
			$('.large-item-img').removeAttr("style");
		},

		collection_star_sizecheck: function() {
			//根据浏览器大小自适应调整宽度
			if (document.body.offsetWidth < 1070) {
				methods.set_mini_collection_star();
				return
			}
			if (document.body.offsetWidth > 1070) {
				methods.set_show_collection_star();
				return
			}
		},
		
		set_item_click:function(){		
			$('.large-switch-item>.large-item-img').click(function(){
				let a = $(this).siblings('a')
				$(a)[0].click();
			})
		}
	}

	$.fn.tab_hover_init = function() {
		//插件具体代码
		methods.tab_hover_init();
		methods.collection_star_sizecheck();
		$(window).resize(function() {
			methods.collection_star_sizecheck();
		});
	}
}(jQuery));
