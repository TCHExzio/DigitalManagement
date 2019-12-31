//读取配置文件
var config = getconfig("config.json");
//读取页面控件配置文件
var page_config = config['faw_nav_item_index'];
//读取页面头信息配置
var page_info = config['index_config'].page_info;
//读取url
var url = config['url'];
//动态配置的页面参数
var user_name = {"user_name":"张宇飞"}

var hot_search = [{
	"item_name": "行车日志",
	"item_href": "#"
}, {
	"item_name": "加油充电",
	"item_href": "#"
}]

var nav_content = [{
		"mission_tag": false,
		"mission": "无任务",
		"mission_feedback": "无任务反馈"
	},
	{
		"info_tag": true,
		"info": "您收到3条回复",
		"info_feedback": "您收到10条问题反馈"
	}
]
