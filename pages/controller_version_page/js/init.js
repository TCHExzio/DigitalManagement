$(document).ready(function() {
	$('body').controller_version()
});

window.onload = function() {
	//网页加载完毕后再出来
	$('#faw-wrapper').css('opacity', '1')
	$('.faw-loading').css('display', 'none')
}
