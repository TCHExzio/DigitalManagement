Vue.component('faw-nav-li', {
	template: '\
	<li>\
	<a href="#" :class="{ cur: content.isActive}">\
	{{ content.title }}<span>{{ content.title_En }}</span>\
	</a>\
	</li>',
	props: ['content']
});


new Vue({
	el: '#faw-nav-ul',
	data: {
		items:page_config
	},
});


