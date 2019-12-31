(function($) {
	var menuname = '';
	var webname = '';
	var hot_search_item_forwindow = '';
	var hot_search_item_forphone = '';

	var inside_global_methods = {
		//导航栏初始检测设置
		elecheck: function() {
			//检查sideNavbar与faw-mainpage是否存在
			if ($('.faw-sideNavbar').is(":empty") | ($('#faw-mainpage').is(":empty")) |
				($('.faw-NavSwitcher>.faw-trigger-text').is(":empty"))) {
				throw "未找到sideNavbar与faw-mainpage"
				return false
			} else {
				return true
			}
		},

		get_name: function() {
			//获取网页初始设置的变量
			menuname = $('.faw-NavSwitcher>.faw-trigger-text>span').text();
			webname = $('.faw-Navlogo>.faw-trigger-text>span').text();
		},

		first_trigger_dropdown: function() {
			//不知道为啥bootstrap的bug,初次进入网页需要触发一次下拉列表,要不然第一次就得双击才触发
			$('.dropdown>a').trigger("click");
			$('.faw-nav-topsearch-input').trigger("click");
			$('.faw-nav-topsearch-input').trigger("blur");
		},
	}

	var inside_navbar_methods = {
		//导航栏响应式改变大小
		set_mini_navbar: function() {
			//当屏幕太窄,则设置navbar样式
			$('.faw-NavSwitcher>.faw-trigger-text>span').text('')
			$('.faw-Navlogo>.faw-trigger-text>span').text('')
			$(
				'.faw-navbar,.faw-sideNavbar,.faw-mainpage,.faw-trigger-text,.faw-NavSwitcher,.faw-Navlogo,.faw-NavSearch,.faw-top-divider'
			).addClass('mini-navbar')
		},
		set_show_navbar: function() {
			//当屏幕太窄,则设置navbar样式
			$('.faw-NavSwitcher>.faw-trigger-text>span').text(menuname)
			$('.faw-Navlogo>.faw-trigger-text>span').text(webname)
			$(
				'.faw-navbar,.faw-sideNavbar,.faw-mainpage,.faw-trigger-text,.faw-NavSwitcher,.faw-Navlogo,.faw-NavSearch,.faw-top-divider'
			).removeClass('mini-navbar')
		},
		set_hide_navSearch_navbar: function() {
			//当屏幕太窄,则设置navbar样式
			$('.faw-nav-topsearchitem').css('display', 'none');
			$('.faw-trigger-text.search-mini-navbar').css('display', 'inline-block');
		},
		set_show_navSearch_navbar: function() {
			//当屏幕太窄,则设置navbar样式
			$('.faw-nav-topsearchitem').css('display', 'inline');
			$('.faw-trigger-text.search-mini-navbar').css('display', 'none');
		},

		navbar_sizecheck: function() {
			//响应屏幕改变
			if (document.body.offsetWidth < 670) {
				//屏幕宽度小于670,那就将导航栏缩小变宽一些
				inside_navbar_methods.set_mini_navbar();
			} else {
				inside_navbar_methods.set_show_navbar();
			}
			if (document.body.offsetWidth < 557) {
				//屏幕宽度小于557,就放不下搜索框了
				inside_navbar_methods.set_hide_navSearch_navbar();
			} else {
				inside_navbar_methods.set_show_navSearch_navbar();
			}
		},
		
		navbar_init_phone:function(){
			//非window桌面则使用点击而不是鼠标划过
			$('.faw-NavSwitcher').click(function() {
				if (!inside_global_methods.elecheck()) {
					//先判断有没有需要改变的菜单栏和主页部分
					return
				}
				if (!$(window).faw_sideNavbar('public_check_sidebar_status')) {
					//如果菜单栏处于隐藏状态,且屏幕很小的话,那就点击后全部展开
					if (document.body.offsetWidth < 470) {
						$(window).faw_sideNavbar('public_set_mini_sidebar')
					} else {
						//如果菜单栏处于隐藏状态,屏幕不小的话,那就自适应展开
						$(window).faw_sideNavbar('public_sidebar_sizecheck')
					}
				} else {
					//如果菜单栏处于展开状态,那点击后隐藏
					$(window).faw_sideNavbar('public_set_hide_sidebar')
				}
			})
			$('.faw-mainpage').mouseenter(function() {
				//鼠标进入页面后自动隐藏菜单栏
				$(window).faw_sideNavbar('public_set_hide_sidebar')
			})
			$('#searchinfo-hide').bind("input propertychange", function(e) {
				inside_search_hide_methods.search_item(this, e.target.value);
			});
		},
	
		navbar_init_window:function(){
			$('.faw-NavSwitcher').mouseenter(function() {
				if (!inside_global_methods.elecheck()) {
					//先判断有没有需要改变的菜单栏和主页部分
					return
				}
				if (!$(window).faw_sideNavbar('public_check_sidebar_status')) {
					//如果菜单栏处于隐藏状态,且屏幕很小的话,那就点击后全部展开
					if (document.body.offsetWidth < 470) {
						$(window).faw_sideNavbar('public_set_mini_sidebar')
					} else {
						//如果菜单栏处于隐藏状态,屏幕不小的话,那就自适应展开
						$(window).faw_sideNavbar('public_sidebar_sizecheck')
					}
				}
			})
			$('.faw-mainpage').mouseenter(function() {
				//鼠标进入页面后自动隐藏菜单栏
				$(window).faw_sideNavbar('public_set_hide_sidebar')
			})
			$('#searchinfo').bind("input propertychange", function(e) {
				inside_search_hide_methods.search_item(this, e.target.value);
			});
			$('#searchinfo-hide').bind("input propertychange", function(e) {
				inside_search_hide_methods.search_item(this, e.target.value);
			});
		}
	}

	var inside_search_hide_methods = {
		//搜索框响应式改变
		set_search_hide_show: function() {
			//显示窄屏幕版搜索框
			$('.faw-search-hide-menu').addClass('show');
		},
		set_search_hide_hide: function() {
			//隐藏窄屏幕版搜索框
			$('.faw-search-hide-menu').removeClass('show');
			$('.faw-nav-hidesearch-input').val('')
		},
		regis_search_hide: function() {
			//给按钮注册显示与隐藏搜索框函数
			$('.search-mini-navbar>a').click(function() {
				inside_search_hide_methods.set_search_hide_show()
			})
			$('.faw-search-hide-overlay').click(function() {
				inside_search_hide_methods.set_search_hide_hide()
			})
			$('.faw-nav-hidesearch-button>a').eq(1).click(function() {
				inside_search_hide_methods.set_search_hide_hide()
			})
			$('.faw-nav-topsearch-input').blur(function() {
				//顶部导航栏中搜索输入框失去焦点
				$(this).val('')
			})
		},
		
		get_hot_search: function() {
			//起始时候拷贝一下热门搜索值
			let search_dropdown = $(".faw-dropdown-search-menu[aria-labelledby='searchinfo']");
			hot_search_item_forwindow = $(search_dropdown).find('a').clone(true);
			hot_search_item_forphone = $(search_dropdown).find('a').clone(true);
		},

		search_item: function(self, current_value) {
			//搜索的时候是找页面内clearfix clearfix_add all下的全部标签内的内容
			var search_dropdown_forwindow = $(".faw-dropdown-search-menu[aria-labelledby='searchinfo']");
			var search_dropdown_forphone = $('.faw-search-hide-menu>.faw-dropdown-search-hide-menu');
			//每次进入就清空搜索联想,靠下面的循环添加
			$(search_dropdown_forwindow).empty();
			$(search_dropdown_forphone).empty();
			//如果没有内容就默认显示热门搜索值,就是初始网页中的代码值
			if (current_value == '') {
				$(hot_search_item_forwindow).appendTo($(search_dropdown_forwindow))
				$(hot_search_item_forphone).appendTo($(search_dropdown_forphone))

				
				return;
			}
			$('.clearfix.clearfix_add.all>li>.large-item-title').each(function(index, ele) {
				//找到的值就显示在搜索框下面
				if ($(ele).text().indexOf(current_value) >= 0) {
					let apendnode = '<a class="faw-nav-dropdown-search-item" href="#">' + $(ele).text() + '</a>'
					$(search_dropdown_forwindow).prepend(apendnode)
					$(search_dropdown_forphone).prepend(apendnode)
				}
			})
		},
	}

	var methods = {
		//定义插件内方法
		faw_navbar_init: function() {
			//初始化
			inside_global_methods.get_name();
			inside_global_methods.first_trigger_dropdown()
			inside_navbar_methods.navbar_sizecheck()
			inside_search_hide_methods.regis_search_hide();
			inside_search_hide_methods.get_hot_search();
			//给菜单按钮绑定回调
			var u = navigator.userAgent;
			var iswindows = u.indexOf('Windows') > -1 || u.indexOf('Adr') > -1;
			if (!iswindows) {
				inside_navbar_methods.navbar_init_phone();
			} else {
				inside_navbar_methods.navbar_init_window();
			}
			$(window).resize(function() {
				//导航栏大小响应
				inside_navbar_methods.navbar_sizecheck();
			});
		},
		faw_navbar_template_init:function(){
			//模板初始化
			inside_global_methods.get_name();
			inside_global_methods.first_trigger_dropdown()
			inside_navbar_methods.navbar_sizecheck()
			inside_search_hide_methods.regis_search_hide();
			//给菜单按钮绑定回调
			var u = navigator.userAgent;
			var iswindows = u.indexOf('Windows') > -1 || u.indexOf('Adr') > -1;
			if (!iswindows) {
				inside_navbar_methods.navbar_init_phone();
			} else {
				inside_navbar_methods.navbar_init_window();
			}
			$(window).resize(function() {
				//导航栏大小响应
				inside_navbar_methods.navbar_sizecheck();
			});
		}
	
	};

	$.fn.faw_navbar = function(method) {
		// 插件的具体内容放在这里
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.faw_navbar_init.apply(this, arguments);
		} else {
			$.error('Method' + method + 'does not exist on jQuery.tooltip');
		}
	};
})(jQuery);
