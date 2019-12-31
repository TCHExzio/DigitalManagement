;
(function($) {

	var inside_global_methods = {
		//收藏插件初始检测设置
		elecheck: function() {
			//检查large-item-collection与collection是否存在
			if ($('.large-item-collection').length == 0 | ($('.collection').length == 0)) {
				throw "未找到large-item-collection与collection"
				return false
			} else {
				return true
			}
		},
		localStorage_init: function() {
			//初始化的时候判断是否被定义,如果被定义,就按照变量内容重现收藏内容,否则清空
			var local = localStorage.getItem("current_collection");
			if (local == null || local == '' || local == undefined) {
				var current_collection = {};
				current_collection['收藏项目'] = new Array();
				localStorage.setItem("current_collection", JSON.stringify(current_collection))
			}
		},
	}
	
	var inside_collection_star = {
		collection_star_callback: function() {
			$('.large-item-collection').click(function() {
				//将收藏的项目存下来
				var current_collection = JSON.parse(localStorage.getItem("current_collection"));
				var current_title = $(this).nextAll().eq(1).text();
				$(this).toggleClass('collected');
				if ($(this).hasClass('collected')) {
					//点击小星星添加收藏
					$('.clearfix.clearfix_add.collection').prepend($(this).closest('li').clone(true));
					//点击小星星将所有显示的此标题的项目都打上小星星
					$('.clearfix.clearfix_add').not('.collection').find('li>.large-item-title').each(function(j, ele) {
						if ($(ele).text() == current_title) {
							$(ele).prevAll().eq(1).addClass('collected')
						}
					})
					//写入本地变量
					current_collection['收藏项目'].push(current_title);
					localStorage.setItem("current_collection", JSON.stringify(current_collection))
				} else {
					$('.clearfix.clearfix_add>.large-switch-item>.large-item-title').each(function(index, ele) {
						if ($(ele).text() == current_title) {
							//点击小星星删除收藏
							if ($(ele).closest('ul').hasClass('collection')) {
								$(ele).closest('li').remove()
								var pos = $.inArray(current_title, current_collection['收藏项目']);
								current_collection['收藏项目'].splice(pos, 1)
								localStorage.setItem("current_collection", JSON.stringify(current_collection))
							} else {
								//移除非收藏目录下的项目的小星星
								$(ele).prevAll().eq(1).removeClass('collected')
							}
						}
					})
				}
			})
		},

		collection_star_init: function() {
			var current_collection = JSON.parse(localStorage.getItem("current_collection"));
			current_collection = current_collection['收藏项目'];
			current_collection.forEach(function(current_title, i) {
				var copyflag = true;
				$('.clearfix.clearfix_add').not('.collection').find('li>.large-item-title').each(function(j, ele) {
					if ($(ele).text() == current_title & (copyflag)) {
						//重启浏览器记录收藏的项目
						$(ele).prevAll().eq(1).addClass('collected')
						$('.clearfix.clearfix_add.collection').prepend($(ele).closest('li').clone(true));
						copyflag = false;
					}
				})
			})
		},
	}
	
	var methods = {
		//定义插件内方法
		collection_init: function() {
			inside_global_methods.elecheck();
			inside_global_methods.localStorage_init();
			inside_collection_star.collection_star_init();
			inside_collection_star.collection_star_callback();
		}
	}

	$.fn.collection = function(method) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.collection_init.apply(this, arguments);
		} else {
			$.error('Method' + method + 'does not exist on jQuery.tooltip');
		}

	}
}(jQuery));
