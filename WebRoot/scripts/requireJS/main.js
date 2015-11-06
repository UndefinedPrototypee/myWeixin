/**
 * TODO RequireJS的主JS ， 配置其它JS的入口
 * 
 * @author Administrator
 * @time 2015年11月6日22:49:02
 */
requirejs.config({
	// 基本路径
	baseUrl : '../scripts/serv_js',
	// 需要引入管的JS的引用及其路径（注意：需要去掉.js后缀）
	paths : {
		// 引入jQuery库
		jquery : '../tp_scripts/jquery-2.1.1',
		// 引入自定义的JS
		jutil : '../auto_defines/jutil-1.0.0',
		// 引入其它业务类JS库
		myrequire : 'myrequire',
		test : 'test'
	}/*,
	shim : {
		
	}*/
});

/**
 * TODO 调用各JS
 */
requirejs([ 'jquery', 'jutil', 'myrequire', 'test' ], function($, JU, MR, TE) {
	TE.helloRequireJs();
	MR.hello();
	TE.seeJQuery();
});

/**
 * TODO 只有这一个页面才调用
 */
if (document.getElementById("requireJS") && "" != document.getElementById("requireJS")) {
	console.info(">>>>>>MyRequireJS...的配置成功.");
	/**
	 * TODO 调用各JS
	 */
	requirejs([ 'jquery', 'jutil', 'myrequire', 'test' ], function($, JU, MR, TE) {
		TE.helloRequireJs();
		MR.hello();
		TE.seeJQuery();
		$("#requireJS").append("注入JQuery成功");
	});
}