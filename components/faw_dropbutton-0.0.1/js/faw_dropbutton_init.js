/*!
 * faw_dropbutton_init Free 1.0.0 by @faw
 * 
 */
;
(function(win) {
	var a = new faw_dropbutton({
		//按钮组距离可视界面最右边距离
		dropbright: 30,
		//按钮组距离可视界面最下边距离
		dropbbottom: 30,
		//弹出的按钮大小
		childbuttonsize: 60,
		//固定显示的那个按钮大小
		parentbuttonsize: 65,
		//闪出的图标排列圆半径px
		radius: 230,
		//弹出的提示框主题
		toolisp_theme:'tooltipster-punk',
		faw_dbclick: function(e) {
			console.log(e)
		}
	});
	
})(window);