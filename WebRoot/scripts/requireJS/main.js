/**
 * TODO RequireJS鐨勪富JS 锛�閰嶇疆鍏跺畠JS鐨勫叆鍙�
 * 
 * @author Administrator
 * @time 2015骞�1鏈�鏃�2:49:02
 */
requirejs.config({
	// 鍩烘湰璺緞
	baseUrl : '../scripts/serv_js',
	// 闇�寮曞叆绠＄殑JS鐨勫紩鐢ㄥ強鍏惰矾寰勶紙娉ㄦ剰锛氶渶瑕佸幓鎺�js鍚庣紑锛�
	paths : {
		// 寮曞叆jQuery搴�
		jquery : '../tp_scripts/jquery-2.1.1',
		// 寮曞叆鑷畾涔夌殑JS
		jutil : '../auto_defines/jutil-1.0.0',
		// 寮曞叆鍏跺畠涓氬姟绫籎S搴�
		myrequire : 'myrequire',
		test : 'test'
	}/*,
	shim : {
		
	}*/
	
});

/**
 * TODO 璋冪敤鍚凧S
 */
requirejs([ 'jquery', 'jutil', 'myrequire', 'test' ], function($, JU, MR, TE) {
	TE.helloRequireJs();
	MR.hello();
	TE.seeJQuery();
});

/**
 * TODO 鍙湁杩欎竴涓〉闈㈡墠璋冪敤
 */
if (document.getElementById("requireJS") && "" != document.getElementById("requireJS")) {
	console.info(">>>>>>MyRequireJS...鐨勯厤缃垚鍔�");
	/**
	 * TODO 璋冪敤鍚凧S
	 */
	requirejs([ 'jquery', 'jutil', 'myrequire', 'test' ], function($, JU, MR, TE) {
		TE.helloRequireJs();
		MR.hello();
		TE.seeJQuery();
		$("#requireJS").append("娉ㄥ叆JQuery鎴愬姛");
	});
}