$(document).ready(function() {
	$(".faw-sideNavbar").faw_sideNavbar('faw_sideNavbar_template_init');
	$(".faw-navbar").faw_navbar('faw_navbar_template_init');
	$("faw-nav-container").nicenav('nicenav_template_init');
});
window.onload = function() {
	//网页加载完毕后再出来
	$('#faw-wrapper').css('opacity', '1')
	$('.faw-loading').css('display', 'none')
}
