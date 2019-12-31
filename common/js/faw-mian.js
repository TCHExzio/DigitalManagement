/*!
 * faw_main 1.0.0 by @faw
 * 
 */
;
(function(win) {
	function getconfig(url) {
		//获取配置文件
		var config;
		$.ajaxSettings.async = false; //同步
		$.getJSON(url, function(data) {
			config = data;
		})
		$.ajaxSettings.async = true; //异步
		return config;
	}

	function transtoarray(item) {
		//获取配置文件将child_item下的项目变成array数组
		let temp = item['child_item'];
		let a = new Array();
		temp.forEach(function(j, index){
			let b = "";
			for (var i = 0; i < j.item_class.length; i++) {
				b = b + j.item_class[i]
			}
			a.push(b)
		});
		return a
	}
	
	function unique(array) {
		//数组去重复
		var n = []; //一个新的临时数组
		//遍历当前数组
		for (var i = 0; i < array.length; i++) {
			//如果当前数组的第i已经保存进了临时数组，那么跳过，
			//否则把当前项push到临时数组里面
			if (n.indexOf(array[i]) == -1) n.push(array[i]);
		}
		return n;
	}
	
	function geturl(arg,page_name){
		//获取url
		return arg['url']+arg[page_name] 
	}

	win.getconfig = getconfig;
	win.transtoarray = transtoarray;
	win.unique = unique;
})(window);
