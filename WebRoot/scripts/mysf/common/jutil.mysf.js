/**
 *  TODO 1���ٶ�SEOͳ�ƣ�
 *  TODO 2������Ҫ����΢������
 */
var baiduSEO = {
	execSEO : function() {
		$(document).ready(function() {
			var _hmt = _hmt || [];
			(function() {
				var hm = document.createElement("script");
				hm.src = "//hm.baidu.com/hm.js?e3ee4754efe5ba2415c7db261415f45c";
				var s = document.getElementsByTagName("script")[0]; 
				s.parentNode.insertBefore(hm, s);
			})();
		});
	}
};

/**2015��10��30��11:09:01 ����ת�� */
var convertorSystemUtil = {
	systemCode : /^[1-9]{1}[0-9]?$/,
	/**
	 * @TODO ʮ����ת��Ϊ��������
	 
	 * @author sfit1108
	 * @date 2015��11��2��17:59:22
	 * @returns �����ת���򷵻�ת����Ľ����������򷵻� false
	 */ 
	convertDecimal2other : function(origDecimal, otherSystem) {
		// ʮ����ת��Ϊ�������ƣ���α�Ϊ����
		if (origDecimal && !isNaN(origDecimal)) {
			return {
				toBinary : origDecimal.toString(2),
				toFouronary : origDecimal.toString(4),
				toOctonary : origDecimal.toString(8),
				toDecimal : origDecimal.toString(10),
				toHexaDecimal : origDecimal.toString(16),
				to36System : origDecimal.toString(36),
				// ת��Ϊ��������
				toOtherSystem : (otherSystem && "" != otherSystem && otherSystem.toString().match(this.systemCode)) ? origDecimal.toString(otherSystem) : false
 			};
		}
		return false;
	},
	/**
	 * @TODO ��������ת��Ϊʮ����
	 
	 * @author sfit1108
	 * @time 2015��11��2��18:01:11
	 * @returns �����������Ҫ���򷵻�ת�����ʮ�����������򷵻� false
	 */  
	convertOther2decimal : function (origOther, fromSystem) {
		if (origOther && "" != origOther) {
			// �Ƿ�Ϊ��Ӧ��������ʶ 
			var binaryFlag = true;
			var fourFlag = true; 
			var octFlag = true;
			var hexaFlag = /^[0-9A-Fa-f]*$/;
			var thirtyFlag = /^[0-9A-Za-z]*$/;
			// ��ת���ַ�������
			var length = origOther.toString().length;
			for (var i = 0; i < length; i++) {
				if (binaryFlag && (isNaN(origOther[i]) || origOther[i] > 1))
					binaryFlag = false;
				if (fourFlag && (isNaN(origOther[i]) || origOther[i] > 3))
					fourFlag = false;
				if (octFlag && (isNaN(origOther[i]) || origOther[i] > 7))
					octFlag = false;
				if (hexaFlag && !origOther[i].match(hexaFlag))
					hexaFlag = false;
				if (thirtyFlag && !origOther[i].match(thirtyFlag))
					thirtyFlag = false;
			}
			return {
				fromBinary : binaryFlag ? parseInt(origOther, 2) : false,
				fromFour : fourFlag ? parseInt(origOther, 4) : false,
				fromOctonary : octFlag ? parseInt(origOther, 8) : false,
				fromHexadeciaml : hexaFlag ? parseInt(origOther, 16) : false,
				from36System : thirtyFlag ? parseInt(origOther, 36) : false,
				formOtherSystem : (fromSystem && "" != fromSystem && fromSystem.toString().match(this.systemCode)) ? parseInt(origOther, fromSystem) : false
			};
		}
		return false;
	},
};

/** ҳ����� �� �ɹ��õĲ������� **/
pageCommonUtil = {
	/**
	 * TODO ����url�õ���Ӧ�Ĳ���
	 
	 * @author sfit1108
	 * @time 2015��10��24�� ����5:05:03
	 * @param name ��������key��
	 * @returns ���ز������µĲ���ֵ ��value�� ���򷵻� false
	 */
	 getReqUrlParameter : function(urlKey) {
		// ���URL��������� ,�磺?memNo=00000000000000000000000000020659&mobiles=15273726290,15273726290
		var paramStr = location.search;
		if (paramStr.length == 0)
			return false;
		if (paramStr.charAt(0) != '?')
			return false;
		// ����
		paramStr = unescape(paramStr);
		// ȥ����
		paramStr = paramStr.substring(1);
		if (paramStr.length == 0)
			return false;
		// �ָ����
		var params = paramStr.split('&');
		var urlValue = null;
		for (var i = 0; i < params.length; i++) {
			if (params[i].indexOf(urlKey) >= 0) {
				// �ָ� key �� value
				urlValue = params[i].split('=');
				urlValue = urlValue[1];
			}
		}
		return urlValue;
	},
	/**
	 * TODO ��������ȥ��
	 * 
	 * @author sfit1108
	 * @time 2015��10��24�� ����5:05:03
	 * @param arr ��ȥ������
	 * @returns ȥ�غ������
	 */
	distinctArray : function(arr) {
		var res = [];
		var obj = {};
		for(var i = 0; i < arr.length; i++){
			if(!obj[arr[i]]){
		   		res.push(arr[i]);
		   		obj[arr[i]] = 1;
		  	}
		}
		return res;
	},
	/**
	 * TODO �жϷ����豸��Android����iPhone����iPad
	 
	 * @author sfit1108
	 * @time 2015��10��28��14:49:31
	 * @returns ��Ӧ����ϵͳ���ַ��� (iphone/android/ipad)
	 */
	judgeAndroidOrIphone : function() {
        var u = navigator.userAgent, app = navigator.appVersion;
		return {
			// android�ն˻���uc�����
			isAndroid : u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, 
			// ios�ն�
			isIos : !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) ,
			// IE�ں�
			trident : u.indexOf('Trident') > -1, 
			// opera�ں�
            presto : u.indexOf('Presto') > -1, 
            // ƻ�����ȸ��ں�
            webKit : u.indexOf('AppleWebKit') > -1, 
            // ����ں�
            gecko : u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,
            // �Ƿ�Ϊ�ƶ��ն�
            mobile : !!u.match(/AppleWebKit.*Mobile.*/), 
            // ios�ն�
            ios : !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), 
            // android�ն˻���uc�����
            android : u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, 
            // �Ƿ�ΪiPhone����QQHD�����
            iPhone : u.indexOf('iPhone') > -1 , 
            // �Ƿ�iPad
            iPad : u.indexOf('iPad') > -1, 
            // �Ƿ�webӦ�ó���û��ͷ����ײ�
            webApp : u.indexOf('Safari') == -1, 
            // �Ƿ�΢�� ��2015-01-22������
            weixin : u.indexOf('MicroMessenger') > -1, 
            // �Ƿ�QQ
            qq : u.match(/\sQQ/i) == " qq" 
		};
	}(),
	/**
	 * TODO ���������
	 * @author sfit1108
	 */ 
	language : (navigator.browserLanguage || navigator.language).toLowerCase(),
	/**
	 * TODO  ��ѯ��ǰ��ַλ�ã����ص�ǰ ��/γ�ȣ�
	 * @author sfit1108
	 * @date 2015��11��6��10:40:50
	 * @param enableHighAccuracy ��߾��ȡ�true/false��,���ںķ���Դ�ʣ�Ĭ��false��
	 * @param timeout	����timeout�����ʧ�ܣ�Ĭ��3000��
	 * @param maximumAge ��ȡ���ĵ�����Ϣ����Ч�ڣ�������Ч�������»�ȡһ��λ����Ϣ ��Ĭ��1000��
	 * @param needHint �Ƿ���Ҫ�ڱ������ڵ�����ʾ ��true / false����Ĭ�� false�������� 
	 * @return ���ص�ǰ ��/γ��
	 */
	getCurrentPosition : function(enableHighAccuracy, timeout, maximumAge, needHint) {
		// alert("���� ����getCurrentPosition()");
		// ����
		var longitude = null;
		// γ��
		var latitude = null;
		// ��ѯ���
		var res_flag = false, res_msg = false;
		// �Ƿ���Ҫ��ӡ��ʾ
        needHint = (needHint && "" != needHint) ? true : false;
        /**���ò���*/
        optionsObj = {
    		enableHighAccuracy: (enableHighAccuracy && "" != enableHighAccuracy) ? enableHighAccuracy : false, 
            timeout: (timeout && "" != timeout) ? timeout : 3000, 
            maximumAge: (maximumAge && "" != maximumAge) ? maximumAge : 1000
        };
        if (navigator.geolocation) {
        	res_msg = "����Ŭ����ȡλ��...";
        	// alert("<<<<<<<<<<<<<<<<<<<<<<");
        	if (needHint) this.tipsDialog(res_msg);
			/** �ú�����������������*/
			navigator.geolocation.getCurrentPosition(successCallBack, errorCallBack, optionsObj);
		} else {
			res_flag = false;
        	res_msg = "��λʧ��,�û��ѽ���λ�û�ȡȨ��";
        	// alert(">>>>>>>>>>>>>>>");
			if (needHint) {
				this.tipsDialog(res_msg);
			}
		};
		/**���óɹ���ִ�иûص�����*/
		function successCallBack(pos) {
            longitude = pos.coords.longitude;
            latitude = pos.coords.latitude;
            res_flag = true;
            /*
            alert(
                '  ���ȣ�' + pos.coords.latitude +
                '  γ�ȣ�' + pos.coords.longitude +
                '  �߶ȣ�' + pos.coords.altitude +
                '  ��ȷ��(��γ)��' + pos.coords.accuracy +
                '  ��ȷ��(�߶�)��' + pos.coords.altitudeAccuracy +
                '  �ٶȣ�' + pos.coords.speed
            );
            */
		};
		/**���ʧ����ִ�иûص�����*/
		function errorCallBack(error) {
        	res_flag = false;
        	res_msg = error.message;
        	switch (error.code) {
	    		case error.PERMISSION_DENIED:
	    			res_msg = "��λʧ��,�û��ܾ��������λ";
	    			break;
	    		case error.POSITION_UNAVAILABLE:
	    			res_msg = "��λʧ��,λ����Ϣ�ǲ�����";
	    			break;
	    		case error.TIMEOUT:
	    			res_msg = "��λʧ��,�����ȡ�û�λ�ó�ʱ";
	    			break;
	    		case error.UNKNOWN_ERROR:
	    			res_msg = "��λʧ��,��λϵͳʧЧ";
	    			break;
    		}
        	if (needHint) {
        		this.tipsDialog(res_msg);
        	}
		};
		
        // alert("....ִ��getCurrentPosition()����...");
		return {
			longitude : longitude ? longitude : "",
			latitude : latitude ? latitude : "",
			res_flag : res_flag,
			res_msg : res_msg
		};
	},
	/**
	 * TODO ��ʾ��
	 */
	tipsDialog : function(content) {
		var $dialog = $('<div class="dialog-tips" style="text-align: center; font-weight: bolder;"></div>');
		var $content = $('<div class="content"></div>');
		$content.html(content);
		$dialog.append($content);
		$("body").append($dialog);		
		var windowWidth = $(window).width();   
		var windowHeight = $(window).height();  
		var popupHeight = $dialog.height();   
		var popupWidth = $dialog.width();
		var top = (windowHeight-popupHeight)/2;
		$dialog.css({"top": top}).fadeIn(500);		
		setTimeout(function () {
			$dialog.fadeOut(3000);
		}, 1100);
	}
};

/**����ѭ��**/
var circulateExeUtil = {
	// ���ڼ���ִ�д��� 
	times : 0,
	// ����ѭ������
	// var test = window.setInterval("interval()", 2500)
	/**
	 * @author sfit1108
	 *
	 * @time 2015��11��3��17:11:59
	 * @param exeFunction ��ִ�еĺ���
	 * @param exeTimes ���ܼƶ��ٴΣ�
	 * @param exeFrequency ִ��Ƶ�ʣ���/�Σ�
	 */
	diyInterval : function (exeFunction, exeTimes, exeFrequency) {
		var interrupt = null;
		if (this.times > exeTimes) {
			// ֹͣ������ѭ������ 
			window.clearInterval(interrupt);
			return;
		}
		interrupt = this.executeFunction(exeFunction, exeFrequency);
	},
	/**
	 * @author sfit1108
	 *
	 * @time 2015��11��3��17:16:12
	 * @params exeFrequency ִ��Ƶ�ʣ���/�Σ� 
	 */
	executeFunction : function(exeFunction, exeFrequency) {
		if (this.times > exeTimes) {
			// ֹͣ������ѭ������ 
			window.clearInterval(interrupt);
			return;
		}
		var interrupt = window.setInterval(exeFunction, exeFrequency);
		this.times ++;
		return interrupt;
	}
};

/**˳��΢����ع���*/
var weixinUtil = {
	/**
	 * TODO ΢��JS-JDK�������� 
	 
	 * @author sfit1108
	 * @time 2015��11��4��9:25:29
	 * @param debugMode���Ƿ�Ϊ����ģʽ��true/false��Ĭ��Ϊfalse
	 * @param jsApiName1����¼2-����JS�ӿ��б��е���Ҫ���õ�JS�����ƣ�����Ϊ�ַ�����
	 * @param jsApiName2��ͬ��
	 * @param jsApiName3��ͬ��
	 * @param jsApiName4��ͬ��
	 */
	initWxConfig : function(debugMode, jsApiName1, jsApiName2, jsApiName3, jsApiName4) {
		// alert("΢��������..");
		debugMode = debugMode ? debugMode : false;
		var url = window.location.href;
		var mm = {};
		mm.url = url;
		$.ajax({
			type : "get",
			dataType : "json",
			data : mm,
			cache : false,
			url : "/service/weixin/querySignService",
			success : function(wxConfig) {
				// alert("΢�����óɹ�.." + wxConfig);
				jWeixin.config({
					debug : debugMode, 		// ��������ģʽ,���õ�����api�ķ���ֵ���ڿͻ���remind��������Ҫ�鿴����Ĳ�����������pc�˴򿪣�������Ϣ��ͨ��log���������pc��ʱ�Ż��ӡ��
					appId : wxConfig.appId, // ������ںŵ�Ψһ��ʶ
					timestamp : wxConfig.timestamp, // �������ǩ����ʱ���
					nonceStr : wxConfig.nonceStr, // �������ǩ���������
					signature : wxConfig.signature, // ���ǩ��������¼1
					// �����Ҫʹ�õ�JS�ӿ��б�����JS�ӿ��б����¼2
					jsApiList : [ jsApiName1, jsApiName2, jsApiName3, jsApiName4 ]
				});
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {

			}
		});
	},
	
	/**
	 * TODO ��ȡ����λ�ýӿ�
	 * @param type Ĭ��Ϊwgs84��gps���꣬���Ҫ����ֱ�Ӹ�openLocation�õĻ������꣬�ɴ���'gcj02'
	 * @returns position{latitude, longitude, speed, accuracy}
	 */
	weixinGetLocation : function(type) {
		type = type ? type : "wgs84";
		var latitude = "", longitude = "", speed = "", accuracy = "";
		wx.getLocation({
			type: type, 					// Ĭ��Ϊwgs84��gps���꣬���Ҫ����ֱ�Ӹ�openLocation�õĻ������꣬�ɴ���'gcj02'
			success: function (res) {
				latitude = res.latitude; 	// γ�ȣ�����������ΧΪ90 ~ -90
				longitude = res.longitude; 	// ���ȣ�����������ΧΪ180 ~ -180��
				speed = res.speed; 			// �ٶȣ�����/ÿ���
				accuracy = res.accuracy; 	// λ�þ���
			}
		});
		var position = {
			latitude : latitude, 
			longitude : longitude, 
			speed : speed, 
			accuracy : accuracy
		};
		return position;
	},
	
	/***
	 * TODO ʹ��΢�����õ�ͼ�鿴λ�ýӿ�
	 * @author sfit1108
	 * @time 2015��11��11��17:25:52
	 * 
	 * @param latitude γ�ȣ�����������ΧΪ90 ~ -90
	 * @param longitude ���ȣ�����������ΧΪ180 ~ -180��
	 * @param addressName λ����
	 * @param addressInfo ��ַ����˵��
	 * @param scale ��ͼ���ż���,����ֵ,��Χ��1~28��Ĭ��Ϊ���
	 * @param infoUrl �ڲ鿴λ�ý���ײ���ʾ�ĳ�����,�ɵ����ת
	 */
	weixinOpenPos : function(latitude, longitude, addressName, addressInfo, scale, infoUrl) {
		latitude = latitude ? latitude : 0;
		longitude = longitude ? longitude : 0;
		addressName = addressName ? addressName : '';
		addressInfo = addressInfo ? addressInfo : '';
		scale = scale ? scale : '';
		infoUrl = infoUrl ? infoUrl : '';
		wx.openLocation({
			latitude: latitude, 	// γ�ȣ�����������ΧΪ90 ~ -90
			longitude: longitude, 	// ���ȣ�����������ΧΪ180 ~ -180��
			name: addressName, 		// λ����
			address: addressInfo, 	// ��ַ����˵��
			scale: scale, 			// ��ͼ���ż���,����ֵ,��Χ��1~28��Ĭ��Ϊ���
			infoUrl: infoUrl		// �ڲ鿴λ�ý���ײ���ʾ�ĳ�����,�ɵ����ת
		});
	},
	
	/**
	 * TODO ΢�ŷ�����������Ŀ
	 *
	 * @author sfit1108
	 * @param shareLink ���������
	 * @param descContent ��������
	 * @param successLink ����ɹ������ת����,��Ϊ������ת�ر�ҳ��
	 */
	shareConfig : function(shareLink, descContent, successLink) {
		/** ��ʾ΢�����Ͻ�ͼ�� * */
		document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
			// ��ʾ���Ͻ�ͼ��
			WeixinJSBridge.call('showOptionMenu');
		});

		/** ��΢���������������ڲ���ʼ����ᴥ��WeixinJSBridgeReady�¼��� * */
		document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
			// �������ͣ�������
			WeixinJSBridge.on('menu:share:appmessage', function(argv) {
				shareObj.shareFriend(shareLink);
			});
			// ��������Ȧ
			WeixinJSBridge.on('menu:share:timeline', function(argv) {
				shareObj.shareTimeline(shareLink);
			});
			// ����΢��
			WeixinJSBridge.on('menu:share:weibo', function(argv) {
				shareObj.shareWeibo(shareLink);
			});
		}, false);
		return {
			lineLink: shareLink,
			shareDesc : descContent,
			successUrl : (successLink && "" != successLink) ? successLink : window.location.href,
			appid: "UCMP",
			shareTitle: "˳������",
			imgUrl: window.location.origin + "/images/customservice/mysf_log.jpg",
			dataUrl: window.location.origin + "/weiwap/mysf/MyMusic.mp3",
		};
	},
	/**
	 * TODO ���������
	 
	 * @author sfit1108
	 * @param shareLink ��������ӣ���Ϊ����Ĭ�������еķ�������
	 */ 
	shareFriend : function(shareLink) {
		// remind("ִ��shareFriend()...");
		// ���͸�����
		var _this = this.shareConfig();
		shareLink = (shareLink && "" != shareLink) ? shareLink : _this.lineLink;
		WeixinJSBridge.invoke('sendAppMessage', {
			"appid" : _this.appid,
			"title" : _this.shareTitle, 	// �������
			"img_height" : "200",			// ��ʾ��ͼ��ߴ�	
			"img_width" : "200",
			"desc" : _this.descContent, 	// ��������
			"img_url" : _this.imgUrl, 	// ����ͼ��
			"link" : shareLink, 			// ��������
		}, function(res) {
			// remind("�����ַ�����ѳɹ�!");
			// alert(res.err_msg); // send_app_msg:cancel | send_app_msg:ok
			if ("send_app_msg:ok" == res.err_msg) {
				// alert("�ɹ�");
				window.location.href = _this.successUrl;
			} else {
				// alert("ȡ��");
			}
		});
		// remind("ִ��shareFriend().�����!");
	},
	/**
	 * TODO ��������Ȧ
	 
	 * @author sfit1108
	 * @param shareLink ��������ӣ���Ϊ����Ĭ�������еķ�������
	 */
	shareTimeline : function(shareLink) {
		// remind("ִ��shareTimeline()");
		var _this = this.shareConfig();
		shareLink = (shareLink && "" != shareLink) ? shareLink : _this.lineLink;
		WeixinJSBridge.invoke('shareTimeline', {
			"img_url" : _this.imgUrl,
			"img_width" : "200",
			"img_height" : "200",
			"link" : shareLink,
			"desc" : _this.descContent,
			"title" : _this.shareTitle
		}, function(res) {
			// remind("�����ַ������Ȧ�ɹ�!");
			// alert(res.err_msg); // share_timeline:ok | share_timeline:cancel
			if ("share_timeline:ok" == res.err_msg) {
				// alert("�ɹ���");
				window.location.href = _this.successUrl;
			} else {
				// alert("ȡ����");
			}
		});
	},
	/**
	 * TODO ����΢��
	 
	 * @author sfit1108
	 * @param shareLink ��������ӣ���Ϊ����Ĭ�������еķ�������
	 */
	shareWeibo : function(shareLink) {
		// remind("ִ��shareWeibo()");
		var _this = this.shareConfig();
		shareLink = (shareLink && "" != shareLink) ? shareLink : _this.lineLink;
		WeixinJSBridge.invoke('shareWeibo', {
			"content" : _this.title + ' ' + _this.descContent,
			"url" : shareLink,
		}, function(res) {
			// remind("�����ַ��΢���ɹ�!");
			// alert(res.err_msg); // share_weibo:ok | share_weibo:cancel
			window.location.href = _this.successUrl;
		});
	},
};

/***
 * TODO ������ض�����ת����
 * @author sfit1108
 * @time 2015��11��9��17:30:05
 */
var servicePointUtil = {
	/**
	 *TODO ���ݷ���Contentƥ������Ӧ���ṩ�ķ�����Ϣ  
	 *@author sfit1108
	 *@param serviceContent��������(1,2,3,4,5,6)
	 *@param labelName ��ǩ���ƣ�span/div��,�����Ϊ���򷵻ط������ƣ�Ĭ�ϴ���ǩ<span>��
	 *@return ��Ӧƥ���µĶ�Ӧ�������ƣ��紫�������Ϊ�գ����Դ��������Ϊ��ǩ��װΪDom���󷵻أ�
	 */
	getOfferServByContList : function(serviceContentList, labelName) {
		var offerService = "";
		// �ṩ�ķ������� 
		if (serviceContentList && "" != serviceContentList) {
			if (labelName && "" != labelName) {
				// Ŀ��Ϊ��ǩ��װ 
				var labelHead = "<" + labelName + ">";
				var labelTail = "</" + labelName + ">";
				if (serviceContentList instanceof Array) {
					for (i in serviceContentList) {
						offerService += labelHead + this.matchOfferServAndCont(serviceContentList[i]) + labelTail;
					}
				} else if (serviceContentList.indexOf(",") != -1) {
					var servArea = serviceContentList.split(",");
					for (j in servArea) {
						// ����ṩ��������� 
						offerService += labelHead + this.matchOfferServAndCont(servArea[j]) + labelTail;
					}
				} else {
					// ֻ��һ�ַ������ݵ�ʱ�� 
					offerService += labelHead + this.matchOfferServAndCont(serviceContentList) + labelTail;
				}
			} else {
				// Ŀ���ޱ�ǩ
				if (serviceContentList instanceof Array) {
					for (i in serviceContentList) {
						offerService += "<span>" + this.matchOfferServAndCont(serviceContentList[i]) + "</span>";
					}
				} else if (serviceContentList.indexOf(",") != -1) {
					var servArea = serviceContentList.split(",");
					for (j in servArea) {
						// ����ṩ��������� 
						offerService += "<span>" + this.matchOfferServAndCont(servArea[j]) + "</span>";
					}
				} else {
					// ֻ��һ�ַ������ݵ�ʱ�� 
					offerService += "<span>" + this.matchOfferServAndCont(serviceContentList) + "</span>";
				}
			}
		} else {
			// Ĭ��
			offerService = "<span>�Լķ���</span><span>��ȡ����</span><span>�ռ�����</span>";
		}
		return offerService;
	},
	/**
	 *TODO ���ݷ���Contentƥ������Ӧ���ṩ�ķ�����Ϣ  
	 *@author sfit1108
	 *@param serviceContent��������(1,2,3,4,5,6)
	 *@return ��Ӧƥ���µĶ�Ӧ��������
	 */
	matchOfferServAndCont : function(serviceContent) {
		var serCont = "";
		if (serviceContent && "" != serviceContent) {
			switch (serviceContent) {
				/**1���Լķ���;2����ȡ����;3���ġ�ȡ������;4�����˵�ַ��;��5�������;��6���Լ���ȡ�Żݷ���*/
				case "1" : serCont = "�Լķ���"; 		break;
				case "2" : serCont = "��ȡ����"; 		break;
				case "3" : serCont = "�ġ�ȡ������"; 	break;
				case "4" : serCont = "���˵�ַ����"; 	break;
				case "5" : serCont = "�������"; 		break;
				case "6" : serCont = "�Լ���ȡ�Żݷ���"; 	break;
				default  : serCont = "..."; 		break;
			}
		} 
		return serCont;
	},
	/**
	 * TODO ���ݷ��������ȷ����ʾ���� ͼ��
	 * @author sfit1108
	 * @date 2015��11��9��17:36:20
	 * @param storeType ˳������ͣ�0��1��2��3��
	 */
	getLogoPathByType : function(storeType) {
		var logPath = "";
		switch (storeType) {
			/**˳������� ��0����˳������͡�1:�ٿ����͡�2��˳��վ���͡�3���������͡���ע�����ֶι�����Ӫҵ�������͵�˳������ͣ�**/
			case "0" : 
				logPath = window.location.origin + "/images/serv_point/hezuobianli.png";  		
				break;
			case "1" : 
				logPath = window.location.origin + "/images/serv_point/heike.png";  		
				break;
			case "2" : 
				logPath = window.location.origin + "/images/serv_point/shunfengzhan.png"; 		
				break;
			case "3" : 
				logPath = window.location.origin + "/images/serv_point/ziying.png";
				break;
			default  : 
				logPath = window.location.origin + "/images/serv_point/ziying.png";  		
				break;
		}
		return logPath;
	},
};