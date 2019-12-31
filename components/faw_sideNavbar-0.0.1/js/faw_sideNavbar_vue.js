Vue.component('faw-sidenavbar-header', {
	//侧面菜单栏的头部部分,头像,名字
	template: '\
	<div class="faw-host-head">\
		<img width="80px" />\
		<div class="faw-car">\
			<img width="70px" />\
		</div>\
		<div class="faw-nav-header" style="display: block;margin-left: 15px;">\
			<span class="companyname">中国一汽</span>\
		</div>\
		<div class="faw-nav-header" style="display: block;margin-left: 15px;margin-bottom: 5px">\
			<span class="departmentname">研发总院试验所</span>\
		</div>\
		<div class="user-button-group" style="min-width: 200px;">\
			<div class="dropdown" style="display: inline;margin-left: 12px;">\
				<a class="faw-nav-header" id="userinfo2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\
					<i class="fa fa-user-circle fa-fw"></i>\
					<span>{{ content.user_name}}</span>\
				</a>\
				<div class="dropdown-menu faw-dropdown-menu" aria-labelledby="userinfo2">\
					<a class="faw-nav-dropdown-item" href="#"><span class="fa fa-camera fa-fw" style="margin-right: 6px;"></span>修改头像</a>\
					<a class="faw-nav-dropdown-item" href="#"><span class="fa fa-user-cog fa-fw" style="margin-right: 6px;"></span>个人资料</a>\
					<div class="dropdown-divider"></div>\
					<a class="faw-nav-dropdown-item" href="login.html"><span class="fa fa-sign-out-alt fa-fw" style="margin-right: 6px;"></span>安全退出</a>\
				</div>\
			</div>\
		</div>\
	</div>',
	props: ['content'],
})

Vue.component('faw-sideNavbar-li', {
	template: '\
	<li class="nav-item faw-nav_item-animation">\
		<a class="nav-link" :href=[content.title_id] aria-expanded="false" data-toggle="collapse">\
			<i class="fas fa-1x fa-fw" :class=[content.title_icon]></i>\
			<span>{{ content.title }}</span>\
			<span class="fa fa-caret-right" v-if="content.has_child"></span>\
		</a>\
		<slot></slot>\
	</li>',
	props: ['content'],
});

new Vue({
	el: '#sidebar-accordion',
	data: {
		username:user_name,
		items: page_config
	},
});
