/*!
 * faw_dropbutton Free 1.0.0 by @faw
 * 
 */
;
(function(win) {
	//设置按钮组位置
	var opts;
	var defalus = {
		dropbright: 150,
		dropbbottom: 160,
		childbuttonsize: 10,
		parentbuttonsize: 10,
		radius: 200,
		toolisp_theme:'tooltipster-shadow',
		faw_dbclick: function(e) {
			console.log("点击了" + e)
		}
	};

	//创建变量
	var count = 0;
	var backdrop = -1;
	var dropflag = 0;
	var maxwidth = 10000;

	function faw_dropbutton(options) {
		//构造函数
		opts = $.extend({}, defalus, options);
		faw_creatoverlay();
		faw_dropbgroup(opts);
		faw_registerdbparentbox(opts);
		faw_dropbuttonclick(opts);
		set_tooltipster();
	};

	function faw_creatoverlay() {
		//自动创建遮罩层
		if ($(".dropb-group").length != 1) {
			throw "有多个dropb-group元素";
			return;
		};
		$(".dropb-group").append('<div class="dboverlay"></div>');
		//绑定回调函数
		$(".dboverlay").click(function() {
			//点击遮罩层的回调函数
			$(this).css("display", 'none')
			faw_dbfold()
		})
	};

	function faw_dropbgroup(opts) {
		//创建按钮组位置、设置按钮大小
		if ($(".dropb-group").length != 1) {
			throw "有多个dropb-group元素";
			return;
		};
		//判断一下平台，手机平台默认大小
		var u = navigator.userAgent;
		var iswindows = u.indexOf('Windows') > -1 || u.indexOf('Adr') > -1;
		/*if (!iswindows) {
			$(".dropb-group").css({
				"right": document.body.clientWidth / 8 + 'px',
				"bottom": 100 + 'px'
			});
			$(".dbchildbox").css({
				"font-size": 150 + 'px'
			});
			count = $(".dbchildbox").length;
			if ($(".dbparentbox").length != 1) {
				throw "有多个dbparentbox元素";
				return;
			};
			$(".dbparentbox").css({
				"font-size": 150 + 'px'
			});
			opts.radius = document.body.clientWidth * 1.5 / 2.5;
			maxwidth = 150;
			return;
		}*/
		$(".dropb-group").css({
			"right": opts["dropbright"] + 'px',
			"bottom": opts["dropbbottom"] + 'px'
		});
		$(".dbchildbox").css({
			"font-size": opts["childbuttonsize"] + 'px'
		});
		count = $(".dbchildbox").length;
		if ($(".dbparentbox").length != 1) {
			throw "有多个dbparentbox元素";
			return;
		};
		$(".dbparentbox").css({
			"font-size": opts["parentbuttonsize"] + 'px'
		});
	};

	function faw_registerdbparentbox(opts) {
		//固定显示的那个按钮回调函数
		$(".dbparentbox").click(function() {
			switch (dropflag) {
				case 0:
					faw_dbunfold()
					break;
				case 1:
					faw_dbfold()
					break;
				default:
					break;
			}
		})
		$(document).on("keypress ",function(e){
		   // var currKey=e.keyCode||e.which||e.charCode;
			if(e.which==96){
				$(".dbparentbox").click()
			}
		})

	};

	function faw_dbunfold() {
		//按钮弹出函数
		//显示遮罩层
		$(".dboverlay").css("display", 'inline-block');
		//旋转父按钮
		$(".dbparenti").css("transform", 'rotate(90deg)');
		//每一个按钮对应的角度;
		var avd = 90 / ($(".dbchildbox").length - 1);
		//每一个按钮对应的弧度;
		var ahd = avd * Math.PI / 180;
		//分别按照路径公式计算按钮相对位置
		$(".dbchildbox").each(function(index, element) {
			$(this).css({
				"right": Math.sin((ahd * index)) * opts["radius"],
				"bottom": Math.cos((ahd * index)) * opts["radius"],
				"max-width": maxwidth + 'px',
			});
		});
		//设置按钮动画执行延迟，产生依次出现的效果
		var unfoldtimer = setInterval(function() {
			count--;
			if (count < 0) {
				clearInterval(unfoldtimer)
				count = $(".dbchildbox").length;
			}
			$('.dbchildbox:eq(' + count + ')').css({
				"opacity": 1
			});
		}, 50);
		dropflag = 1;
	};

	function faw_dbfold() {
		//按钮闭合函数
		$(".dboverlay").css("display", 'none');
		$(".dbparenti").css("transform", 'rotate(0deg)');
		var foldtimer = setInterval(function() {
			backdrop++;
			if (backdrop > count - 1) {
				clearInterval(foldtimer)
				$(".dbchildbox").each(function(index, element) {
					$(this).css({
						"position": "absolute",
						"max-width": "0px",
						"min-width": "0px"
					});
				})
				backdrop = -1;
			}
			$('.dbchildbox:eq(' + backdrop + ')').css({
				"opacity": 0
			});
		}, 30);
		dropflag = 0;
	}
	function faw_dropbuttonclick(opts) {
		//给弹出的按钮绑定回调函数
		$('.dbchildbox').click(function(e) {
			msg = $(e.currentTarget).find('svg').attr("class");
			opts.faw_dbclick(msg);
			faw_dbfold();
		});
	};
	
	function set_tooltipster(){
		$('.faw_dropbutton_tooltip').tooltipster({
			theme: opts.toolisp_theme,
			animationDuration:0,
			delay:0
		});
	}
	//开放外部接口
	win.faw_dropbutton = faw_dropbutton;
})(window);