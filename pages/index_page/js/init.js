$(document).ready(function() {
	$(".faw-sideNavbar").faw_sideNavbar();
	$(".faw-navbar").faw_navbar();
	$("faw-nav-container").nicenav();
	$(".large-switch").tab_hover_init();
});
window.onload = function() {
	//网页加载完毕后再出来
	$('#faw-wrapper').css('opacity', '1')
	$('.faw-loading').css('display', 'none')
}
