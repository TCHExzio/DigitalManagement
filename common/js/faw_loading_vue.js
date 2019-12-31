Vue.component('faw-loading', {
	template: '\
	<div class="faw-loading">\
		<div class="faw-loading-icon">\
			<p><i class="fas fa-circle-notch fa-6x fa-spin "></i></p>\
		</div>\
	</div>',
});

new Vue({el: '#loading'});