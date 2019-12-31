;
(function($) {

	var responsive_methods = {
		//响应式需要的函数
		set_transfer_col: function() {
			let temp = $('.layui-icon.layui-icon-next');
			$(temp).removeClass('layui-icon-next');
			$(temp).addClass('layui-icon-up');
			temp = $('.layui-icon.layui-icon-prev');
			$(temp).removeClass('layui-icon-prev');
			$(temp).addClass('layui-icon-down');
		},

		set_transfer_row: function() {
			let temp = $('.layui-icon.layui-icon-up');
			$(temp).removeClass('layui-icon-up');
			$(temp).addClass('layui-icon-next');
			temp = $('.layui-icon.layui-icon-down');
			$(temp).removeClass('layui-icon-down');
			$(temp).addClass('layui-icon-prev');
		},

		transfer_sizecheck_first: function() {
			//首次加载页面的时候,要等layui加载完毕后才能操作她产生的ui
			if (document.body.offsetWidth < 1000) {
				$('.faw-cv-transfer').addClass('column');
				var foldtimer = setInterval(function() {
					responsive_methods.set_transfer_col();
					clearInterval(foldtimer);
				}, 500);
			}
		},
		transfer_sizecheck: function() {
			//根据页面大小做穿梭框的响应式布局
			if (document.body.offsetWidth < 1000) {
				$('.faw-cv-transfer').addClass('column');
				responsive_methods.set_transfer_col();
			} else {
				$('.faw-cv-transfer').removeClass('column');
				responsive_methods.set_transfer_row();
			}
		}
	}

	var upload_methods = {
		drag_upload: function() {
			//给网页绑定拖拽上传文件名
			$('body').bind('drop', function(ev) {
				ev.preventDefault();
				ev.stopPropagation();
				var fileslist = event.dataTransfer.files
				if (fileslist.length != 1) {
					layer.open({
						type: 1,
						skin: 'controller_version-pop-out',
						title: false,
						closeBtn: 0,
						time: 2000,
						anim: 6,
						offset: 't', //具体配置参考：offset参数项
						content: '<div style="padding: 10px 10px;">请只拖拽上传一个工程文件</div>',
						shadeClose: true
					});
				} else {
					$('input[name="软件版本"]').val(fileslist[0]["name"])
				}
			});
			$('body').bind('dragover', function(ev) {
				ev.preventDefault();
			})
		},
		
		binding_input_name: function() {
			//给input框绑定对应的name值,保证提交的时候数据正确
			$('.faw-cv-input>div>span').each(function(index, ele) {
				$(ele).closest('div').next().attr('name', $(ele).text());
			})
		}
	}


	var methods = {
		controller_version_init: function() {
			$(".faw-sideNavbar").faw_sideNavbar('faw_sideNavbar_template_init');
			$(".faw-navbar").faw_navbar('faw_navbar_template_init');
			$(".faw-nav-container").nicenav('nicenav_template_init');
			var data1 = [{
				"value": "1",
				"title": "李白"
			}]
			layui.use(['transfer', 'laydate'], function() {
				layer.config({
					extend: 'myskin/controller_version-pop-out.css' //同样需要加载新皮肤
				});
				var transfer = layui.transfer;
				var laydate = layui.laydate;
				//渲染穿梭框
				transfer.render({
					elem: '#controller_version', //绑定元素
					data: data1,
					id: 'transfer_cv', //定义索引
					title: ['车载控制器', '刷写控制器'],
					showSearch: true,
					width: '35%',
					height: 230
				});
				//渲染日期栏
				laydate.render({
					elem: '#date', //指定元素
					theme: '#4f0404'
				});
			});
			$('.faw-cv-input').tooltipster({
				theme: 'tooltipster-light',
				animationDuration: 0,
				delay: 0,
				side: 'bottom'
			});
			$('#cv-carnum').tokenfield()
			responsive_methods.transfer_sizecheck_first();
			upload_methods.drag_upload();
			upload_methods.binding_input_name();
			$(window).resize(function() {
				//检测屏幕大小以设定穿梭框的竖直响应式
				responsive_methods.transfer_sizecheck();
			});
		},
	}
	$.fn.controller_version = function(method) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.controller_version_init.apply(this, arguments);
		} else {
			$.error('Method' + method + 'does not exist on jQuery.tooltip');
		}
	}
}(jQuery));
