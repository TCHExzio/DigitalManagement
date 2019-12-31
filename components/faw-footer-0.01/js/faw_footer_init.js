; (function ($) {
	var u = navigator.userAgent;
	var iswindows = u.indexOf('Windows') > -1 || u.indexOf('Adr') > -1;
	if (!iswindows) {
		$('.social-icon>ul>li').tooltipster({
			theme: 'tooltipster-shadow',
			animationDuration: 300,
			delay: 0,
			side: 'right',
			trigger:'click'
		});
	} else {
		$('.social-icon>ul>li').tooltipster({
			theme: 'tooltipster-shadow',
			animationDuration: 300,
			delay: 0,
			side: 'right'
		});
	}
}(jQuery));