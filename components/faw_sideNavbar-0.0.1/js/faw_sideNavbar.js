;(function($) {
	var opts;
	var defaluts = {
	    sidebar_header_bg: 'components/faw_sideNavbar-0.0.1/image/sidebar_header_bg.jpg',
	    user_image: 'components/faw_sideNavbar-0.0.1/image/user_image.png',
		mini_user_image:'static/logo_img/金属logo-白色slogan.png',
		show_bottom_image:'static/logo_img/金属logo-白色slogan.png'
	};
	
	var inside_header_methods = {
		//菜单栏mini模式时候点击图标展开
		cat_click_arrow: function() {
			//平板模式下点击那个小汽车
			$('.faw-host-head>.faw-car').click(function() {
				inside_sidebar_methods.set_show_sidebar()
			})
		},
		set_sidebar_header_bg:function(){
			$('.faw-host-head').css('background','url('+defaluts.sidebar_header_bg+')')
			$('.faw-host-head > img').attr('src',defaluts.user_image)
			$('.faw-car > img').attr('src',defaluts.mini_user_image)
			$('.faw-bottom-logo').attr('src',defaluts.show_bottom_image)
		}
	}
	
	var inside_sidebar_methods = {
		//菜单栏响应式改变大小
		set_nav_item_hide: function() {
			//将点开的菜单闭合
			$('.nav-link').parent('.nav-item').siblings().each(function(index,ele){
				if ($(ele).hasClass('show')){
					$(ele).find('a').click();
				}
			});
		},
		set_mini_sidebar: function() {
			//左侧菜单栏变小
			$('.faw-sideNavbar').addClass("mini-sidebar");
			$('.faw-sideNavbar').removeClass("show");
			$('.faw-sideNavbar').removeClass("hide");
			$('.faw-NavSwitcher .faw-trigger-text > svg').css('transform', 'rotate(90deg)')
			inside_sidebar_methods.set_nav_item_hide()
		},
		set_hide_sidebar: function() {
			//左侧菜单栏隐藏
			$('.faw-sideNavbar').addClass("hide");
			$('.faw-sideNavbar').removeClass("mini-sidebar");
			$('.faw-sideNavbar').removeClass("show");
			$('.faw-NavSwitcher .faw-trigger-text > svg').css('transform', 'rotate(0deg)')
			inside_sidebar_methods.set_nav_item_hide()
		},
		set_show_sidebar: function() {
			//左侧菜单栏展开
			$('.faw-sideNavbar').addClass("show");
			$('.faw-sideNavbar').removeClass("mini-sidebar");
			$('.faw-sideNavbar').removeClass("hide");
			$('.faw-NavSwitcher .faw-trigger-text > svg').css('transform', 'rotate(90deg)')
			inside_sidebar_methods.set_nav_item_hide()
		},
		check_sidebar_status: function() {
			//判断现在侧边栏是否处于展开状态
			if ($('.faw-sideNavbar').hasClass("hide")) {
				return false
			} else {
				return true
			}
		},
		sidebar_sizecheck: function() {
			//根据浏览器大小自适应调整宽度
			if (document.body.offsetWidth < 1070 ) {
				inside_sidebar_methods.set_mini_sidebar();
				return
			}
			if (document.body.offsetWidth > 1070) {
				inside_sidebar_methods.set_show_sidebar();
				return
			}
		},
	}
	
	var inside_sidebar_item_methods = {
		//菜单栏条目展开响应式
		set_nav_sidebar_show: function(self) {
			//点击下拉列表的时候,只将父级列表侧栏边缘变色
			if ($(self).next().hasClass('show')) {
				$(self).parent('.nav-item').removeClass("show");
			} else {
				$(self).parent('.nav-item').addClass("show");
			}
			$(self).parent('.nav-item').siblings().removeClass("show");
		},

		check_nav_sidebar_show: function(self) {
			//当在mini_sidebar时候,有下拉列表菜单的选项,就将菜单全部显示出来
			if ($('.faw-sideNavbar').hasClass('mini-sidebar')) {
				if (!$(self).next().hasClass('show')) {
					inside_sidebar_methods.set_show_sidebar();
				}
			}
			if ($('.faw-sideNavbar').hasClass('show')) {
				setTimeout(function(){
					if (!$('.nav-link').parent('.nav-item').siblings().hasClass('show')){
						inside_sidebar_methods.set_hide_sidebar();
					}
				}, 10);
			}
		},

		item_click_arrow: function(self) {
			//设置点击条目的时候右侧小箭头
			if ($(self).next().hasClass('show')) {
				$(self).children(".fa-caret-right").css('transform', 'rotate(0deg)');
				$(self).children(".fa-caret-right").css('-ms-transform', 'rotate(0deg)'); /* IE 9 */
				$(self).children(".fa-caret-right").css('-moz-transform', 'rotate(0deg)'); /* Firefox */
				$(self).children(".fa-caret-right").css('-webkit-transform', 'rotate(0deg)'); /* Safari 和 Chrome */
				$(self).children(".fa-caret-right").css('--o-transform', 'rotate(0deg)'); /* Opera */
			} else {
				$(self).children(".fa-caret-right").css('transform', 'rotate(90deg)');
				$(self).children(".fa-caret-right").css('-ms-transform', 'rotate(90deg)'); /* IE 9 */
				$(self).children(".fa-caret-right").css('-moz-transform', 'rotate(90deg)'); /* Firefox */
				$(self).children(".fa-caret-right").css('-webkit-transform', 'rotate(90deg)'); /* Safari 和 Chrome */
				$(self).children(".fa-caret-right").css('--o-transform', 'rotate(90deg)'); /* Opera */
			}
			let flitid = $(self).attr('href')
			let arr = flitid.split("-");
			if (arr.length > 2) {
				throw "a标签href命名错误";
				return;
			}
			let flitclass = ":not(*[class*='child'])";
			if (arr.length != 1) {
				flitclass = arr[1];
				flitclass = '.' + flitclass;
			}
			$('.collapse').filter(flitclass).filter(':not(' + flitid + ')').each(function(inedx, ele) {
				//nav-link的属于同级子标签中除自己外的右侧指示箭头归位
				if ($(ele).hasClass('show')) {
					$(ele).prev().children(".fa-caret-right").css('transform', 'rotate(0deg)');
					$(ele).prev().children(".fa-caret-right").css('-ms-transform', 'rotate(0deg)'); /* IE 9 */
					$(ele).prev().children(".fa-caret-right").css('-moz-transform', 'rotate(0deg)'); /* Firefox */
					$(ele).prev().children(".fa-caret-right").css('-webkit-transform', 'rotate(0deg)'); /* Safari 和 Chrome */
					$(ele).prev().children(".fa-caret-right").css('-o-transform', 'rotate(0deg)'); /* Opera */
				}
			})
		},
		
		item_click_ncienav:function(self){
			//设置点击条目的时候主页面变化
			let index = $(self).closest('li').prevAll().length;
			$($('.faw-nav>.faw-nav-container>ul>li').eq(index-1).find('a')[0]).trigger('click')
		}
	}

	var methods = {
		//定义插件内方法
		faw_sideNavbar_init: function() {
			//初始化
			inside_header_methods.set_sidebar_header_bg()
			var u = navigator.userAgent;
			var iswindows = u.indexOf('Windows') > -1 || u.indexOf('Adr') > -1;
			if (iswindows) {
				var Scrollbar = window.Scrollbar;
				Scrollbar.init(document.querySelector('.faw-sideNavbar'));
			}
			if (this.filter('.faw-sideNavbar').length === 1) {
				$('.nav-link').click(function() {
					inside_sidebar_item_methods.item_click_ncienav(this);
					inside_sidebar_item_methods.check_nav_sidebar_show(this)
					//有下拉列表的时候才执行显示动作
					if ($(this).next().length!=0){
						inside_sidebar_item_methods.item_click_arrow(this);
						inside_sidebar_item_methods.set_nav_sidebar_show(this);
					}
					
					

				})
			} else {
				throw "有多个faw-sideNavbar元素";
			}
			inside_header_methods.cat_click_arrow();
			
			$(window).resize(function() {
				//如果菜单栏处于展开状态,再自适应展开,否则不动作
				if (inside_sidebar_methods.check_sidebar_status()) {
					inside_sidebar_methods.sidebar_sizecheck();
				}
			});
		},
		
		faw_sideNavbar_template_init: function() {
			//模板初始化
			inside_header_methods.set_sidebar_header_bg()
			var u = navigator.userAgent;
			var iswindows = u.indexOf('Windows') > -1 || u.indexOf('Adr') > -1;
			if (iswindows) {
				var Scrollbar = window.Scrollbar;
				Scrollbar.init(document.querySelector('.faw-sideNavbar'));
			}
			if (this.filter('.faw-sideNavbar').length === 1) {
				$('.nav-link').click(function() {
					inside_sidebar_item_methods.check_nav_sidebar_show(this)
					//有下拉列表的时候才执行显示动作
					if ($(this).attr("data-toggle") == "collapse") {
						inside_sidebar_item_methods.item_click_arrow(this);
						inside_sidebar_item_methods.set_nav_sidebar_show(this);
					}
				})
			} else {
				throw "有多个faw-sideNavbar元素";
			}
			inside_header_methods.cat_click_arrow();
			
			$(window).resize(function() {
				//如果菜单栏处于展开状态,再自适应展开,否则不动作
				if (inside_sidebar_methods.check_sidebar_status()) {
					inside_sidebar_methods.sidebar_sizecheck();
				}
			});
		},
		
		//开放公共接口
		public_set_mini_sidebar:function(){
			inside_sidebar_methods.set_mini_sidebar();
		},
		public_set_hide_sidebar:function(){
			inside_sidebar_methods.set_hide_sidebar();
		},
		public_set_show_sidebar:function(){
			inside_sidebar_methods.set_show_sidebar();
		},
		public_sidebar_sizecheck:function(){
			inside_sidebar_methods.sidebar_sizecheck();
		},
		public_check_sidebar_status:function(){
			inside_sidebar_methods.check_sidebar_status();
		},
	};

	$.fn.faw_sideNavbar = function(method) {
		// 插件的具体内容放在这里	
		opts = $.extend({},defaluts, method);
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.faw_sideNavbar_init.apply(this, arguments);
		} else {
			$.error('Method' + method + 'does not exist on jQuery.tooltip');
		}
	};

})(jQuery);
