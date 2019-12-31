//针对这个插件把配置文件参数重新排列一下
var tabhover_li_a = page_config;
var tabhover_li_b = new Array();
var tabhover_ul_b = new Array();
tabhover_li_a.forEach(function(item){
	//将a中每个元素从string字变成string数组
	tabhover_li_c = transtoarray(item)
	//将c中子类项去重
	tabhover_li_d = unique(tabhover_li_c)
	if ((tabhover_li_c.length==0)||(tabhover_li_d.length==1)){
		//如果c中子类项没有,或者c中子类项只有一个,那么显示在页面上管理服务下面那行字显示的就是title
		if (item.isActive){
			tabhover_li_b.push({'item_content':item['title'],'item_class':item['title_En']+' show'+' on'})
		}else{
			tabhover_li_b.push({'item_content':item['title'],'item_class':item['title_En']})
		}
		//处理的是每一个switch卡下的内容
		if (item['title']=="收藏"){
			tabhover_ul_b.push({"ul_class":"clearfix clearfix_add collection","is_collection":true,"switch_item":item['child_item']})
		}else{
			tabhover_ul_b.push({"ul_class":"clearfix clearfix_add","is_collection":false,"switch_item":item['child_item'] })
		}
	}else{
		//否则就是显示全部+子类项
		if (item.isActive){
			tabhover_li_b.push({'item_content':"全部",'item_class':item['title_En']+' show'+' on'}),
			tabhover_li_d.forEach(function(itemd){
				tabhover_li_b.push({'item_content':itemd,'item_class':item['title_En']+' show'})
			})
		}else{
			tabhover_li_b.push({'item_content':"全部",'item_class':item['title_En']}),
			tabhover_li_d.forEach(function(itemd){
				tabhover_li_b.push({'item_content':itemd,'item_class':item['title_En']})
			})
		}
		//处理的是每一个switch卡下的内容
		tabhover_ul_b.push({"ul_class":"clearfix clearfix_add all","is_collection":false,"switch_item":item['child_item']})
		tabhover_li_d.forEach(function(item_uld){
			let tabhover_ul_c = item['child_item'];
			let	tabhover_ul_d = new Array();
			tabhover_ul_c.forEach(function(item_ulc){
				//把之前去重的部分子项都插入到对应item_class的子类中
				if (item_uld==item_ulc['item_class']){
					tabhover_ul_d.push(item_ulc)
				}
			})
			tabhover_ul_b.push({"ul_class":"clearfix clearfix_add","is_collection":false,"switch_item":tabhover_ul_d})
		})
	}
})

//渲染页面内switch项目的分小类标题
Vue.component('jquery_tabhover_li', {
	template: '<li :class=[content.item_class]>\
	<slot></slot>\
	</li>',
	props: ['content'],
});

new Vue({
	el: '#tabhover_title',
	data: {
		items:tabhover_li_b
	},
});

//渲染页面内switch项目
Vue.component('jquery_tabhover_switch_ul', {
	template: '<ul :class=[content.ul_class]>\
	<slot></slot>\
	</ul>',
	props: ['content'],
});

new Vue({
	el: '#switch-middle',
	data: {
		items: tabhover_ul_b
	},
});
