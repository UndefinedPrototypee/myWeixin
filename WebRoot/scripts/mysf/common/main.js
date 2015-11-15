/**
 * TODO RequireJS���������ļ� 
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
	/**��ֹ���棬����ʱ���**/
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

/**
 * TODO ����������б�ҳ�����չʾ
 * @author sfit1108
 * @time 2015��11��6��17:23:13
 */
if (document.getElementsByClassName("ser-nearby-page").length > 0) {
	console.info(">>>>>>>����������б�ҳ��....");
	/**
	 * TODO ����ҳ���������ļ����� 
	 * **/
	require(['zepto', 'jweixin', 'jutil', 'common', 'sernear'], function ($, JW, JU, COM, NEAR) {
		
		//΢�ų�ʼ������
		JU.weixinUtil.initWxConfig(true, 'openLocation', 'getLocation');
		
		// ҳ�����ʱ��ѯ�������еķ����
		NEAR.showNearServ();
		
		// ҳ�������ɺ�������¼��󶨼��ٶ�SEO�������
		NEAR.readyExecute();
		
		// ���ظ���..
		// NEAR.loadMore();
		
		// չʾ�ҹ�ע��
		NEAR.showMyAttentioned();
		
		// ָ��λ�ø�������
		NEAR.searchNearServ();
		
	});
};

/**
 * TODO ���������ҳ���������չʾ
 * @author sfit1108
 * @time 2015��11��6��17:22:58
 */
if (document.getElementsByClassName("ser-info-page").length > 0) {
	console.info(">>>>>>>���������ҳ��....");
	/***
	 * TODO ����ҳ���������� 
	 */
	require(['zepto', 'jutil', 'common', 'serinfo'], function ($, JU, COM, INFO) {
		
		// ��ʼ��ҳ��
		INFO.showServInfo();
		
		// �û�����~��ע~ȡ����ע  
		INFO.commondOrAttention();
		
	});
};


