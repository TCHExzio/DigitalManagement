Vue.component('faw-footer', {
	template: '\
		<div class="faw-footer-container">\
			<div class="row">\
				<div class="social-icon">\
					<ul>\
						<li data-tooltip-content="#tooltip_content">Contact us</li>\
						<div style="display: none;">\
							<span id="tooltip_content">\
								<img src="static/developer_info.jpg" width="250px" />\
							</span>\
						</div>\
					</ul>\
				</div>\
				<div class="copyright">\
					<ul>\
						<li>© 2019 All Right Reserved By</li>\
					</ul>\
				</div>\
			</div>\
		</div>',
});

new Vue({el: '.faw-footer-bottom'});
