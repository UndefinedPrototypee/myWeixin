/**
 * TODO RequireJS引入依赖文件 
 * @author sfit1108
 * **/
require.config({
	baseUrl : 		'/',
	paths : {
		zepto : 	'weiwap/cerinfo/js/zepto.min',
		jquery : 	'js/jquery-1.7.2.min',
		jweixin : 	'js/jweixin-1.0.0',
		jutil : 	'js/weiwap/mysf/jutil.mysf',
		common : 	'js/weiwap/commonSkin',
		sernear : 	'weiwap/cerinfo/js/ser-nearby',
		serinfo : 	'weiwap/cerinfo/js/ser-info',
		addrUtil : 	'weiwap/cerinfo/js/adressUtil'
	},
	/**防止缓存，部署时清除**/
	urlArgs: "bust=" +  (new Date()).getTime(),
	/*
	waitSeconds: 15,
	map : {
		'*' : {
			'css' : 'lib/css'
		}
	},
	*/
	shim : {
		zepto : {
			exports : 'Zepto'
		},
		jweixin : {
			exports : 'jweixin'
		},
		// 将jutil中的局部方法显露出来
		jutil : {
			init : function () {
				return {
					convertorSystemUtil : convertorSystemUtil,
					pageCommonUtil : pageCommonUtil,
					weixinUtil : weixinUtil,
					servicePointUtil : servicePointUtil,
					baiduSEO : baiduSEO
				};
			}
		},
		common : {
			exports : 'tipsDialog'
		}
	}
});

/**
 * TODO 附近服务点列表页面相关展示
 * @author sfit1108
 * @time 2015年11月6日17:23:13
 */
if (document.getElementsByClassName("ser-nearby-page").length > 0) {
	console.info(">>>>>>>附近服务点列表页面....");
	/**
	 * TODO 调用页面所依赖文件方法 
	 * **/
	require(['zepto', 'jweixin', 'jutil', 'common', 'sernear'], function ($, JW, JU, COM, NEAR) {
		
		//微信初始化配置
		JU.weixinUtil.initWxConfig(true, 'openLocation', 'getLocation');
		
		// 页面加载时查询附近所有的服务点
		NEAR.showNearServ();
		
		// 页面加载完成后的其它事件绑定及百度SEO引擎添加
		NEAR.readyExecute();
		
		// 加载更多..
		// NEAR.loadMore();
		
		// 展示我关注的
		NEAR.showMyAttentioned();
		
		// 指定位置附近搜索
		NEAR.searchNearServ();
		
	});
};

/**
 * TODO 服务点详情页面相关数据展示
 * @author sfit1108
 * @time 2015年11月6日17:22:58
 */
if (document.getElementsByClassName("ser-info-page").length > 0) {
	console.info(">>>>>>>服务点详情页面....");
	/***
	 * TODO 调用页面依赖函数 
	 */
	require(['zepto', 'jutil', 'common', 'serinfo'], function ($, JU, COM, INFO) {
		
		// 初始化页面
		INFO.showServInfo();
		
		// 用户点赞~关注~取消关注  
		INFO.commondOrAttention();
		
	});
};


