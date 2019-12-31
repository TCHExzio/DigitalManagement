Vue.component('search_hide_menu', {
	template: '\
		<div class="faw-search-hide-menu">\
			<!--当显示于手机的时候显示的搜索框-->\
			<div class="faw-search-hide-overlay"></div>\
			<!--遮罩-->\
			<div class="faw-search-hide-input">\
				<input class="faw-nav-hidesearch-input" id="searchinfo-hide" placeholder="搜索" />\
				<div class="faw-nav-hidesearch-button" style="background-color:#62010c;">\
					<!--搜索图标和取消搜索图标-->\
					<a href="#" style="margin-right: 4px;">\
						<span style="color: #DBDFE4;">\
							<i class="fas fa-search fa-1x fa-fw faw-trigger-icon"></i>\
						</span>\
					</a>\
					<i class="faw-top-divider" style="height: 100%;width: 1px;margin: 1px 5px 0px 0px;"></i>\
					<a href="#" style="margin-right: 4px;">\
						<span style="color: #DBDFE4;">\
							<i class="fas fa-times fa-1x fa-fw faw-trigger-icon"></i>\
						</span>\
					</a>\
				</div>\
			</div>\
			<div class="faw-dropdown-search-hide-menu">\
				<slot></slot>\
			</div>\
			<div class="faw-search-hide-overlay down"></div>\
			<!--遮罩-->\
		</div>',
});

new Vue({
	el: '#search_hide_menu',
});