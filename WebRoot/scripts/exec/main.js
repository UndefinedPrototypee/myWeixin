/*****
 * ��ַ�����
 */
requirejs.config({
	baseUrl : "../../scripts",
	paths : {
		// ������������
		jquery 	: "tp_scripts/jquery-2.0.3.min",
		zepto 	: "tp_scripts/zepto.min",
		jweixin : "tp_scripts/jweixin-1.1.0",
		// ָ�����JS
		amaps	: "mysf/plugin/amaps-1.3",
		// �Զ���JS
		commUtil: "auto_defines/myCommUtil",
		jutil 	: "auto_defines/jutil-1.0.0",
		sfutil 	: "mysf/common/jutil.mysf",
		// �Զ��幦����JS
		addr 	: "exec/myAddrUtil"
	},
	/**��ֹ���棬����ʱ���**/
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
		// ��jutil�еľֲ�������¶����
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
 * ����JS
 */
if (document.getElementById("addressPlugin")) {
	// ָ��ҳ�����
	console.info("��ַ�����ҳ��");
	requirejs(['jquery','amaps', 'addr'], function($, MAP, ADDR) {
		// alert(JSON.stringify(MAP));
		ADDR.running();
		
	});
}