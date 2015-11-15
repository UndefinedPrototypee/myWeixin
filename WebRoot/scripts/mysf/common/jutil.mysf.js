/**
 *  TODO 1、百度SEO统计；
 *  TODO 2、按需要加载微信配置
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

/**2015年10月30日11:09:01 进制转换 */
var convertorSystemUtil = {
	systemCode : /^[1-9]{1}[0-9]?$/,
	/**
	 * @TODO 十进制转换为其它进制
	 
	 * @author sfit1108
	 * @date 2015年11月2日17:59:22
	 * @returns 如可以转换则返回转化后的进制数，否则返回 false
	 */ 
	convertDecimal2other : function(origDecimal, otherSystem) {
		// 十进制转化为其它进制，入参必为数字
		if (origDecimal && !isNaN(origDecimal)) {
			return {
				toBinary : origDecimal.toString(2),
				toFouronary : origDecimal.toString(4),
				toOctonary : origDecimal.toString(8),
				toDecimal : origDecimal.toString(10),
				toHexaDecimal : origDecimal.toString(16),
				to36System : origDecimal.toString(36),
				// 转换为其它进制
				toOtherSystem : (otherSystem && "" != otherSystem && otherSystem.toString().match(this.systemCode)) ? origDecimal.toString(otherSystem) : false
 			};
		}
		return false;
	},
	/**
	 * @TODO 其它进制转换为十进制
	 
	 * @author sfit1108
	 * @time 2015年11月2日18:01:11
	 * @returns 如果参数符合要求则返回转化后的十进制数，否则返回 false
	 */  
	convertOther2decimal : function (origOther, fromSystem) {
		if (origOther && "" != origOther) {
			// 是否为相应进制数标识 
			var binaryFlag = true;
			var fourFlag = true; 
			var octFlag = true;
			var hexaFlag = /^[0-9A-Fa-f]*$/;
			var thirtyFlag = /^[0-9A-Za-z]*$/;
			// 待转换字符串长度
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

/** 页面参数 ： 可公用的参数对象 **/
pageCommonUtil = {
	/**
	 * TODO 解析url拿到对应的参数
	 
	 * @author sfit1108
	 * @time 2015年10月24日 下午5:05:03
	 * @param name 参数名（key）
	 * @returns 返回参数名下的参数值 （value） 否则返回 false
	 */
	 getReqUrlParameter : function(urlKey) {
		// 获得URL请求参数串 ,如：?memNo=00000000000000000000000000020659&mobiles=15273726290,15273726290
		var paramStr = location.search;
		if (paramStr.length == 0)
			return false;
		if (paramStr.charAt(0) != '?')
			return false;
		// 解码
		paramStr = unescape(paramStr);
		// 去？号
		paramStr = paramStr.substring(1);
		if (paramStr.length == 0)
			return false;
		// 分割参数
		var params = paramStr.split('&');
		var urlValue = null;
		for (var i = 0; i < params.length; i++) {
			if (params[i].indexOf(urlKey) >= 0) {
				// 分割 key 与 value
				urlValue = params[i].split('=');
				urlValue = urlValue[1];
			}
		}
		return urlValue;
	},
	/**
	 * TODO 数组数据去重
	 * 
	 * @author sfit1108
	 * @time 2015年10月24日 下午5:05:03
	 * @param arr 待去重数组
	 * @returns 去重后的数组
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
	 * TODO 判断访问设备是Android还是iPhone或者iPad
	 
	 * @author sfit1108
	 * @time 2015年10月28日14:49:31
	 * @returns 相应操作系统的字符串 (iphone/android/ipad)
	 */
	judgeAndroidOrIphone : function() {
        var u = navigator.userAgent, app = navigator.appVersion;
		return {
			// android终端或者uc浏览器
			isAndroid : u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, 
			// ios终端
			isIos : !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) ,
			// IE内核
			trident : u.indexOf('Trident') > -1, 
			// opera内核
            presto : u.indexOf('Presto') > -1, 
            // 苹果、谷歌内核
            webKit : u.indexOf('AppleWebKit') > -1, 
            // 火狐内核
            gecko : u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,
            // 是否为移动终端
            mobile : !!u.match(/AppleWebKit.*Mobile.*/), 
            // ios终端
            ios : !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), 
            // android终端或者uc浏览器
            android : u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, 
            // 是否为iPhone或者QQHD浏览器
            iPhone : u.indexOf('iPhone') > -1 , 
            // 是否iPad
            iPad : u.indexOf('iPad') > -1, 
            // 是否web应该程序，没有头部与底部
            webApp : u.indexOf('Safari') == -1, 
            // 是否微信 （2015-01-22新增）
            weixin : u.indexOf('MicroMessenger') > -1, 
            // 是否QQ
            qq : u.match(/\sQQ/i) == " qq" 
		};
	}(),
	/**
	 * TODO 浏览器语言
	 * @author sfit1108
	 */ 
	language : (navigator.browserLanguage || navigator.language).toLowerCase(),
	/**
	 * TODO  查询当前地址位置（返回当前 经/纬度）
	 * @author sfit1108
	 * @date 2015年11月6日10:40:50
	 * @param enableHighAccuracy 提高精度【true/false】,由于耗费资源故（默认false）
	 * @param timeout	超过timeout则调用失败（默认3000）
	 * @param maximumAge 获取到的地理信息的有效期，超过有效期则重新获取一次位置信息 （默认1000）
	 * @param needHint 是否需要在本方法内弹框提示 【true / false】（默认 false）不弹框 
	 * @return 返回当前 经/纬度
	 */
	getCurrentPosition : function(enableHighAccuracy, timeout, maximumAge, needHint) {
		// alert("进入 。。getCurrentPosition()");
		// 经度
		var longitude = null;
		// 纬度
		var latitude = null;
		// 查询结果
		var res_flag = false, res_msg = false;
		// 是否需要打印提示
        needHint = (needHint && "" != needHint) ? true : false;
        /**调用参数*/
        optionsObj = {
    		enableHighAccuracy: (enableHighAccuracy && "" != enableHighAccuracy) ? enableHighAccuracy : false, 
            timeout: (timeout && "" != timeout) ? timeout : 3000, 
            maximumAge: (maximumAge && "" != maximumAge) ? maximumAge : 1000
        };
        if (navigator.geolocation) {
        	res_msg = "正在努力获取位置...";
        	// alert("<<<<<<<<<<<<<<<<<<<<<<");
        	if (needHint) this.tipsDialog(res_msg);
			/** 该函数有如下三个参数*/
			navigator.geolocation.getCurrentPosition(successCallBack, errorCallBack, optionsObj);
		} else {
			res_flag = false;
        	res_msg = "定位失败,用户已禁用位置获取权限";
        	// alert(">>>>>>>>>>>>>>>");
			if (needHint) {
				this.tipsDialog(res_msg);
			}
		};
		/**调用成功则执行该回调函数*/
		function successCallBack(pos) {
            longitude = pos.coords.longitude;
            latitude = pos.coords.latitude;
            res_flag = true;
            /*
            alert(
                '  经度：' + pos.coords.latitude +
                '  纬度：' + pos.coords.longitude +
                '  高度：' + pos.coords.altitude +
                '  精确度(经纬)：' + pos.coords.accuracy +
                '  精确度(高度)：' + pos.coords.altitudeAccuracy +
                '  速度：' + pos.coords.speed
            );
            */
		};
		/**如果失败则执行该回调函数*/
		function errorCallBack(error) {
        	res_flag = false;
        	res_msg = error.message;
        	switch (error.code) {
	    		case error.PERMISSION_DENIED:
	    			res_msg = "定位失败,用户拒绝请求地理定位";
	    			break;
	    		case error.POSITION_UNAVAILABLE:
	    			res_msg = "定位失败,位置信息是不可用";
	    			break;
	    		case error.TIMEOUT:
	    			res_msg = "定位失败,请求获取用户位置超时";
	    			break;
	    		case error.UNKNOWN_ERROR:
	    			res_msg = "定位失败,定位系统失效";
	    			break;
    		}
        	if (needHint) {
        		this.tipsDialog(res_msg);
        	}
		};
		
        // alert("....执行getCurrentPosition()结束...");
		return {
			longitude : longitude ? longitude : "",
			latitude : latitude ? latitude : "",
			res_flag : res_flag,
			res_msg : res_msg
		};
	},
	/**
	 * TODO 提示框
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

/**对象循环**/
var circulateExeUtil = {
	// 用于计算执行次数 
	times : 0,
	// 无限循环调用
	// var test = window.setInterval("interval()", 2500)
	/**
	 * @author sfit1108
	 *
	 * @time 2015年11月3日17:11:59
	 * @param exeFunction 待执行的函数
	 * @param exeTimes （总计多少次）
	 * @param exeFrequency 执行频率（秒/次）
	 */
	diyInterval : function (exeFunction, exeTimes, exeFrequency) {
		var interrupt = null;
		if (this.times > exeTimes) {
			// 停止其无限循环调用 
			window.clearInterval(interrupt);
			return;
		}
		interrupt = this.executeFunction(exeFunction, exeFrequency);
	},
	/**
	 * @author sfit1108
	 *
	 * @time 2015年11月3日17:16:12
	 * @params exeFrequency 执行频率（秒/次） 
	 */
	executeFunction : function(exeFunction, exeFrequency) {
		if (this.times > exeTimes) {
			// 停止其无限循环调用 
			window.clearInterval(interrupt);
			return;
		}
		var interrupt = window.setInterval(exeFunction, exeFrequency);
		this.times ++;
		return interrupt;
	}
};

/**顺风微信相关工具*/
var weixinUtil = {
	/**
	 * TODO 微信JS-JDK调用配置 
	 
	 * @author sfit1108
	 * @time 2015年11月4日9:25:29
	 * @param debugMode：是否为开发模式（true/false）默认为false
	 * @param jsApiName1：附录2-所有JS接口列表中的需要调用的JS的名称（必须为字符串）
	 * @param jsApiName2：同上
	 * @param jsApiName3：同上
	 * @param jsApiName4：同上
	 */
	initWxConfig : function(debugMode, jsApiName1, jsApiName2, jsApiName3, jsApiName4) {
		// alert("微信配置中..");
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
				// alert("微信配置成功.." + wxConfig);
				jWeixin.config({
					debug : debugMode, 		// 开启调试模式,调用的所有api的返回值会在客户端remind出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
					appId : wxConfig.appId, // 必填，公众号的唯一标识
					timestamp : wxConfig.timestamp, // 必填，生成签名的时间戳
					nonceStr : wxConfig.nonceStr, // 必填，生成签名的随机串
					signature : wxConfig.signature, // 必填，签名，见附录1
					// 必填，需要使用的JS接口列表，所有JS接口列表见附录2
					jsApiList : [ jsApiName1, jsApiName2, jsApiName3, jsApiName4 ]
				});
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {

			}
		});
	},
	
	/**
	 * TODO 获取地理位置接口
	 * @param type 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
	 * @returns position{latitude, longitude, speed, accuracy}
	 */
	weixinGetLocation : function(type) {
		type = type ? type : "wgs84";
		var latitude = "", longitude = "", speed = "", accuracy = "";
		wx.getLocation({
			type: type, 					// 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
			success: function (res) {
				latitude = res.latitude; 	// 纬度，浮点数，范围为90 ~ -90
				longitude = res.longitude; 	// 经度，浮点数，范围为180 ~ -180。
				speed = res.speed; 			// 速度，以米/每秒计
				accuracy = res.accuracy; 	// 位置精度
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
	 * TODO 使用微信内置地图查看位置接口
	 * @author sfit1108
	 * @time 2015年11月11日17:25:52
	 * 
	 * @param latitude 纬度，浮点数，范围为90 ~ -90
	 * @param longitude 经度，浮点数，范围为180 ~ -180。
	 * @param addressName 位置名
	 * @param addressInfo 地址详情说明
	 * @param scale 地图缩放级别,整形值,范围从1~28。默认为最大
	 * @param infoUrl 在查看位置界面底部显示的超链接,可点击跳转
	 */
	weixinOpenPos : function(latitude, longitude, addressName, addressInfo, scale, infoUrl) {
		latitude = latitude ? latitude : 0;
		longitude = longitude ? longitude : 0;
		addressName = addressName ? addressName : '';
		addressInfo = addressInfo ? addressInfo : '';
		scale = scale ? scale : '';
		infoUrl = infoUrl ? infoUrl : '';
		wx.openLocation({
			latitude: latitude, 	// 纬度，浮点数，范围为90 ~ -90
			longitude: longitude, 	// 经度，浮点数，范围为180 ~ -180。
			name: addressName, 		// 位置名
			address: addressInfo, 	// 地址详情说明
			scale: scale, 			// 地图缩放级别,整形值,范围从1~28。默认为最大
			infoUrl: infoUrl		// 在查看位置界面底部显示的超链接,可点击跳转
		});
	},
	
	/**
	 * TODO 微信分享功能配置项目
	 *
	 * @author sfit1108
	 * @param shareLink 分享的链接
	 * @param descContent 分享内容
	 * @param successLink 分享成功后的跳转链接,如为空则跳转回本页面
	 */
	shareConfig : function(shareLink, descContent, successLink) {
		/** 显示微信右上角图标 * */
		document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
			// 显示右上角图标
			WeixinJSBridge.call('showOptionMenu');
		});

		/** 当微信内置浏览器完成内部初始化后会触发WeixinJSBridgeReady事件。 * */
		document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
			// 分享（发送）给好友
			WeixinJSBridge.on('menu:share:appmessage', function(argv) {
				shareObj.shareFriend(shareLink);
			});
			// 分享到朋友圈
			WeixinJSBridge.on('menu:share:timeline', function(argv) {
				shareObj.shareTimeline(shareLink);
			});
			// 分享到微博
			WeixinJSBridge.on('menu:share:weibo', function(argv) {
				shareObj.shareWeibo(shareLink);
			});
		}, false);
		return {
			lineLink: shareLink,
			shareDesc : descContent,
			successUrl : (successLink && "" != successLink) ? successLink : window.location.href,
			appid: "UCMP",
			shareTitle: "顺丰速运",
			imgUrl: window.location.origin + "/images/customservice/mysf_log.jpg",
			dataUrl: window.location.origin + "/weiwap/mysf/MyMusic.mp3",
		};
	},
	/**
	 * TODO 分享给朋友
	 
	 * @author sfit1108
	 * @param shareLink 分享的链接，如为空则默认配置中的分享链接
	 */ 
	shareFriend : function(shareLink) {
		// remind("执行shareFriend()...");
		// 发送给好友
		var _this = this.shareConfig();
		shareLink = (shareLink && "" != shareLink) ? shareLink : _this.lineLink;
		WeixinJSBridge.invoke('sendAppMessage', {
			"appid" : _this.appid,
			"title" : _this.shareTitle, 	// 分享标题
			"img_height" : "200",			// 显示的图标尺寸	
			"img_width" : "200",
			"desc" : _this.descContent, 	// 分享描述
			"img_url" : _this.imgUrl, 	// 分享图标
			"link" : shareLink, 			// 分享链接
		}, function(res) {
			// remind("分享地址给好友成功!");
			// alert(res.err_msg); // send_app_msg:cancel | send_app_msg:ok
			if ("send_app_msg:ok" == res.err_msg) {
				// alert("成功");
				window.location.href = _this.successUrl;
			} else {
				// alert("取消");
			}
		});
		// remind("执行shareFriend().，完毕!");
	},
	/**
	 * TODO 分享到朋友圈
	 
	 * @author sfit1108
	 * @param shareLink 分享的链接，如为空则默认配置中的分享链接
	 */
	shareTimeline : function(shareLink) {
		// remind("执行shareTimeline()");
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
			// remind("分享地址到朋友圈成功!");
			// alert(res.err_msg); // share_timeline:ok | share_timeline:cancel
			if ("share_timeline:ok" == res.err_msg) {
				// alert("成功！");
				window.location.href = _this.successUrl;
			} else {
				// alert("取消！");
			}
		});
	},
	/**
	 * TODO 分享到微博
	 
	 * @author sfit1108
	 * @param shareLink 分享的链接，如为空则默认配置中的分享链接
	 */
	shareWeibo : function(shareLink) {
		// remind("执行shareWeibo()");
		var _this = this.shareConfig();
		shareLink = (shareLink && "" != shareLink) ? shareLink : _this.lineLink;
		WeixinJSBridge.invoke('shareWeibo', {
			"content" : _this.title + ' ' + _this.descContent,
			"url" : shareLink,
		}, function(res) {
			// remind("分享地址到微博成功!");
			// alert(res.err_msg); // share_weibo:ok | share_weibo:cancel
			window.location.href = _this.successUrl;
		});
	},
};

/***
 * TODO 服务点特定工具转换类
 * @author sfit1108
 * @time 2015年11月9日17:30:05
 */
var servicePointUtil = {
	/**
	 *TODO 根据服务Content匹配出其对应的提供的服务信息  
	 *@author sfit1108
	 *@param serviceContent服务类型(1,2,3,4,5,6)
	 *@param labelName 标签名称（span/div）,如参数为空则返回服务名称（默认带标签<span>）
	 *@return 相应匹配下的对应服务名称（如传入参数不为空，则以传入参数作为标签包装为Dom对象返回）
	 */
	getOfferServByContList : function(serviceContentList, labelName) {
		var offerService = "";
		// 提供的服务种类 
		if (serviceContentList && "" != serviceContentList) {
			if (labelName && "" != labelName) {
				// 目标为标签包装 
				var labelHead = "<" + labelName + ">";
				var labelTail = "</" + labelName + ">";
				if (serviceContentList instanceof Array) {
					for (i in serviceContentList) {
						offerService += labelHead + this.matchOfferServAndCont(serviceContentList[i]) + labelTail;
					}
				} else if (serviceContentList.indexOf(",") != -1) {
					var servArea = serviceContentList.split(",");
					for (j in servArea) {
						// 获得提供服务的内容 
						offerService += labelHead + this.matchOfferServAndCont(servArea[j]) + labelTail;
					}
				} else {
					// 只有一种服务内容的时候 
					offerService += labelHead + this.matchOfferServAndCont(serviceContentList) + labelTail;
				}
			} else {
				// 目标无标签
				if (serviceContentList instanceof Array) {
					for (i in serviceContentList) {
						offerService += "<span>" + this.matchOfferServAndCont(serviceContentList[i]) + "</span>";
					}
				} else if (serviceContentList.indexOf(",") != -1) {
					var servArea = serviceContentList.split(",");
					for (j in servArea) {
						// 获得提供服务的内容 
						offerService += "<span>" + this.matchOfferServAndCont(servArea[j]) + "</span>";
					}
				} else {
					// 只有一种服务内容的时候 
					offerService += "<span>" + this.matchOfferServAndCont(serviceContentList) + "</span>";
				}
			}
		} else {
			// 默认
			offerService = "<span>自寄服务</span><span>自取服务</span><span>收件服务</span>";
		}
		return offerService;
	},
	/**
	 *TODO 根据服务Content匹配出其对应的提供的服务信息  
	 *@author sfit1108
	 *@param serviceContent服务类型(1,2,3,4,5,6)
	 *@return 相应匹配下的对应服务名称
	 */
	matchOfferServAndCont : function(serviceContent) {
		var serCont = "";
		if (serviceContent && "" != serviceContent) {
			switch (serviceContent) {
				/**1、自寄服务;2、自取服务;3、寄、取件服务;4、个人地址服;务5、便民服;务6、自寄自取优惠服务*/
				case "1" : serCont = "自寄服务"; 		break;
				case "2" : serCont = "自取服务"; 		break;
				case "3" : serCont = "寄、取件服务"; 	break;
				case "4" : serCont = "个人地址服务"; 	break;
				case "5" : serCont = "便民服务"; 		break;
				case "6" : serCont = "自寄自取优惠服务"; 	break;
				default  : serCont = "..."; 		break;
			}
		} 
		return serCont;
	},
	/**
	 * TODO 根据服务点类型确定显示何种 图标
	 * @author sfit1108
	 * @date 2015年11月9日17:36:20
	 * @param storeType 顺风店类型（0，1，2，3）
	 */
	getLogoPathByType : function(storeType) {
		var logPath = "";
		switch (storeType) {
			/**顺丰店类型 【0：非顺丰店类型、1:嘿客类型、2：顺丰站类型、3：其他类型】；注：该字段归属于营业网点类型的顺丰店类型；**/
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