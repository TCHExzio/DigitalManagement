Vue.component('faw-nav-pagetitle', {
	template: '\
	<div class="faw-nav-topitem">\
		<!--导航条菜单栏和主页按钮部分-->\
		<a class="faw-NavSwitcher" href="#">\
			<span class="faw-trigger-text">\
				<i class="fas fa-bars fa-1x fa-fw faw-trigger-icon"></i>\
				<span>菜单</span>\
			</span>\
		</a>\
		<i class="faw-top-divider"></i>\
		<a class="faw-Navlogo" :href=[page_info.href]>\
			<span class="faw-trigger-text">\
				<i class="fas fa-chart-line fa-1x fa-fw" style="margin-right: 5px"></i>\
				<span>{{page_info.name}}</span>\
			</span>\
		</a>\
	</div>',
	props: ['page_info'],
});


Vue.component('faw-nav-toprightitem', {
	template: '\
	<div class="faw-nav-toprightitem">\
		<!--导航条最右侧通知部分-->\
		<div class="faw-nav-ctrl">\
			<div class="faw-trigger-text search-mini-navbar">\
				<!--宽度够的时候隐藏的搜索按钮-->\
				<a class="faw-nav-notice">\
					<span class="fa-layers">\
						<i class="fas fa-search fa-1x fa-fw faw-trigger-icon"></i>\
					</span>\
				</a>\
			</div>\
			<div class="faw-trigger-text">\
				<div class="dropdown" style="display: inline;float: right;">\
					<!--任务通知按钮-->\
					<a class="faw-nav-notice" id="missioninfo" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\
						<span class="fa-layers">\
							<i class="fas fa-lightbulb"></i>\
							<span class="fa-layers-counter" style="background:Tomato" v-if="nav_content[0].mission_tag"></span>\
						</span>\
					</a>\
					<div class="dropdown-menu faw-dropdown-menu" aria-labelledby="missioninfo">\
						<a class="faw-nav-dropdown-item" href="#"><span class="fa fa-bell fa-fw" style="margin-right: 6px;"></span>{{nav_content[0].mission}}</a>\
						<a class="faw-nav-dropdown-item" href="#"><span class="fa fa-comment-dots fa-fw" style="margin-right: 6px;"></span>{{nav_content[0].mission_feedback}}</a>\
						<div class="dropdown-divider"></div>\
						<a class="faw-nav-dropdown-item" href="#"><span class="fa fa-user-friends fa-fw" style="margin-right: 6px;"></span>查看全部</a>\
					</div>\
				</div>\
			</div>\
			<div class="faw-trigger-text">\
				<div class="dropdown" style="display: inline;float: right;">\
					<!--消息通知按钮-->\
					<a class="faw-nav-notice" id="messageinfo" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\
						<span class="fa-layers">\
							<i class="fas fa-envelope"></i>\
							<span class="fa-layers-counter" style="background:Tomato" v-if="nav_content[1].info_tag"></span>\
						</span>\
					</a>\
					<div class="dropdown-menu faw-dropdown-menu" aria-labelledby="messageinfo">\
						<a class="faw-nav-dropdown-item" href="#"><span class="fa fa-bell fa-fw" style="margin-right: 6px;"></span>{{nav_content[1].info}}</a>\
						<a class="faw-nav-dropdown-item" href="#"><span class="fa fa-comment-dots fa-fw" style="margin-right: 6px;"></span>{{nav_content[1].info_feedback}}</a>\
						<div class="dropdown-divider"></div>\
						<a class="faw-nav-dropdown-item" href="#"><span class="fa fa-user-friends fa-fw" style="margin-right: 6px;"></span>查看全部</a>\
					</div>\
				</div>\
			</div>\
			<div class="faw-trigger-text">\
				<div class="dropdown" style="display: inline;float: right;">\
					<!--用户按钮-->\
					<a class="faw-nav-notice" id="userinfo1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\
						<span class="fa-layers">\
							<i class="fa fa-user-circle fa-fw"></i>\
						</span>\
					</a>\
					<div class="dropdown-menu faw-dropdown-menu" aria-labelledby="userinfo1">\
						<a class="faw-nav-dropdown-item" href="#"><span class="fa fa-camera fa-fw" style="margin-right: 6px;"></span>修改头像</a>\
						<a class="faw-nav-dropdown-item" href="#"><span class="fa fa-user-cog fa-fw" style="margin-right: 6px;"></span>个人资料</a>\
						<div class="dropdown-divider"></div>\
						<a class="faw-nav-dropdown-item" href="login.html"><span class="fa fa-sign-out-alt fa-fw" style="margin-right: 6px;"></span>安全退出</a>\
					</div>\
				</div>\
			</div>\
		</div>\
	</div>',
	props: ['navcontent'],
});

Vue.component('faw-nav-topsearchitem', {
	template: '\
	<div class="faw-nav-topsearchitem">\
		<!--导航条最右搜索部分-->\
		<div class="dropdown" style="height: 100%;">\
			<input class="faw-nav-topsearch-input" id="searchinfo" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" placeholder="搜索" />\
			<div class="faw-nav-topitem faw-search">\
				<a class="faw-NavSearch" href="#" style="padding-right: 10px;">\
					<span class="faw-trigger-text">\
						<i class="fas fa-search fa-1x fa-fw faw-trigger-icon"></i>\
					</span>\
				</a>\
			</div>\
			<div class="dropdown-menu faw-dropdown-search-menu" aria-labelledby="searchinfo">\
				<slot></slot>\
			</div>\
		</div>\
	</div>',
});

new Vue({
	el: '.faw-navbar',
	data:{
		navcontent:nav_content,
		hotsearch:hot_search
	}
});
