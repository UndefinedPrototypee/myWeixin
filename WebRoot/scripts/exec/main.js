/*****
 * 地址插件库
 */
requirejs.config({
	baseUrl : "../../scripts",
	paths : {
		// 第三方信赖库
		jquery 	: "tp_scripts/jquery-2.0.3.min",
		zepto 	: "tp_scripts/zepto.min",
		jweixin : "tp_scripts/jweixin-1.1.0",
		// 指定插件JS
		amaps	: "mysf/plugin/amaps-1.3",
		// 自定义JS
		commUtil: "auto_defines/myCommUtil",
		jutil 	: "auto_defines/jutil-1.0.0",
		sfutil 	: "mysf/common/jutil.mysf",
		// 自定义功能性JS
		addr 	: "exec/myAddrUtil"
	},
	/**防止缓存，部署时清除**/
	urlArgs	: "bust=" +  (new Date()).getTime(),
	shim : {
		zepto : {
			exports : 'Zepto'
		},
		jweixin : {
			exports : 'jweixin'
		},
		amaps : {
			exports : 'AMap'
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

console.info("---come...in------........main.js=========");

/**
 * 调用JS
 */
if (document.getElementById("addressPlugin")) {
	// 指定页面进入
	console.info("地址插件库页面");
	requirejs(['jquery','amaps', 'addr'], function($, MAP, ADDR) {
		// alert(JSON.stringify(MAP));
		ADDR.running();
		
	});
}