/**附近服务点页面JS**/
define(['zepto', 'jweixin', 'jutil', 'addrUtil'], function($, JW, JU, ADU) {
	
	/** TODO 百度SEO统计； */
	$(document).ready(function() {
		// alert("百度");
		var _hmt = _hmt || [];
		(function() {
		  var hm = document.createElement("script");
		  hm.src = "//hm.baidu.com/hm.js?e3ee4754efe5ba2415c7db261415f45c";
		  var s = document.getElementsByTagName("script")[0]; 
		  s.parentNode.insertBefore(hm, s);
		})();
	});
	
	return {
		// 页面地理位置
		position : {},
		// 用于判断页面遮罩层判断
		hintFlag : false,
		// 添加百度搜索引擎与页面点击事件绑定----1.1
		readyExecute : function() {
			var _this = this;
			// 页面用户点击搜索事件 
			_this.hintFlag = false;
			var searchInput = $(".nearby-header input.input");
				searchInput.focus(function(){
					_this.hintFlag = false;
					_this.filter_time($(this));
					$("#wrapper").addClass("search-focus");
					$(".btn-gps").addClass("hide");
					$(".btn-cancel").removeClass("hide").click(function(){
						_this.hintFlag = true;
						$(this).addClass("hide");
						$("#wrapper").removeClass("search-focus");
						$(".btn-gps").removeClass("hide");
					});
			}).blur(function(){
				_this.hintFlag = true;
				$("#wrapper").removeClass("search-focus");
				$(".btn-gps").removeClass("hide");
				$(".btn-cancel").addClass("hide");
			});
		},
		// 添加百度搜索引擎与页面点击事件绑定----1.2
		filter_time : function(obj) {  
			var _this = this;
		    var time = setInterval(function(){
		    		_this.filter_staff_from_exist(obj);
		    	}, 100);  
		    $(this).bind("blur",function(){  
		        clearInterval(time);  
		    });
		},
		// 添加百度搜索引擎与页面点击事件绑定----1.3
		filter_staff_from_exist : function(obj) {
			var _this = this;
			var str = "";
			var now = "";
		    	now = $.trim(obj.val());
		    if(now != "" && now != str){    	
		        if(now.length > 0){
		       		$(".nearby-header button.btn-clear").removeClass("hide").click(function(){
		       			obj.val("");
		       		});
		       		if(!_this.hintFlag){
			       		$(".add-ass").removeClass("hide").find("li").each(function(){
			       			$(this).click(function(){
			       				obj.val($(this).text());
			       			});
			       		});
					}else{
						setTimeout(function(){
							$(".add-ass").addClass("hide");
						},100);				
					}
		        }
			}else{
				$(".nearby-header button.btn-clear").addClass("hide");
			}
		},
		
		/**
		 * TODO 获得当前位置信息
		 */
		weixinGetLocation : function() {
			return JU.weixinUtil.weixinGetLocation();
		},
		
		// 加载更多...
		loadMore : function() {
			$("#content .ser.more").click(function() {
				JU.pageCommonUtil.tipsDialog(3124);
			});
		},
		// 展示附近服务点列表
		showNearServ : function() {
			// debugger;
			
			// 显示等待
			$("#content_scjl").css("display","block");
			var _this = this;
			// 获取当前地理位置信息
			if(navigator.geolocation){
				// tipsDialog("正在努力获取位置...");
				var options = {enableHighAccuracy:true,timeout:5000,maximumAge:30000};
				navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options);
			}else{
				JU.pageCommonUtil.tipsDialog("定位失败,用户已禁用位置获取权限");
			}
			// 获取位置成功
			function successCallback(position) {
				var pos = {};
				pos.longitude = position.coords.longitude;  //"113.93994927";"113.93994927";//
				pos.latitude = position.coords.latitude;  //"22.52583739";//"22.52583739";//
				// 保存到全局
				_this.position = pos;
				// 执行查询
				var url = location.origin + "/service/addrServ/nearbyServPoint";
				_this.exeSyncQuery(url, false, pos);
			};
			// 定位失败 
			function errorCallback (error) {
				debugger;
				// 如本地已存在位置
				if (_this.position && "" != _this.position && JSON.stringify(_this.position).length > 2) {
					var url = location.origin + "/service/addrServ/nearbyServPoint";
					_this.exeSyncQuery(url, false, _this.position);
				} else {
					switch (error.code) {
						case error.PERMISSION_DENIED:
							closeDialog();
							JU.pageCommonUtil.tipsDialog("定位失败,用户拒绝请求地理定位");
							break;
						case error.POSITION_UNAVAILABLE:
							closeDialog();
							JU.pageCommonUtil.tipsDialog("定位失败,位置信息是不可用");
							break;
						case error.TIMEOUT:
							closeDialog();
							JU.pageCommonUtil.tipsDialog("定位失败,请求获取用户位置超时");
							break;
						case error.UNKNOWN_ERROR:
							closeDialog();
							JU.pageCommonUtil.tipsDialog("定位失败,定位系统失效");
							break;
					}
					// 显示等待
					$("#content_scjl").css("display","none");
					// 如为本地查询
					if (!pageCommonUtil.judgeAndroidOrIphone.mobile) {
						// 执行页面数据查询
						var url = location.origin + "/service/addrServ/nearbyServPoint";
						var pos = {};
						pos.longitude = "113.934968";
						pos.latitude = "22.527589";
						_this.exeSyncQuery(url, false, pos);
					};
				}
			};
		},
		
		/** 展示我关注的列表 **/
		showMyAttentioned : function() {
			debugger;
			var _this = this;
			$("#myAttentioned").click(function() {
				// 显示等待
				$("#content_scjl").css("display","block");
				// 置空数据列表
				$("#content").empty();
				// debugger;
				var url = location.origin + "/service/addrServ/userAttentedPoint";
				if (_this.position && "" != _this.position && JSON.stringify(_this.position).length > 2) {
					// 执行查询
			    	_this.exeSyncQuery(url, true, _this.position);
				} else {
					// 重新获取位置
					wx.getLocation({
						type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
						success: function(res) {
							// 查询当前地理位置成功
							var pos = {};
							pos.longitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
							pos.latitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
							pos.speed = res.speed; // 速度，以米/每秒计
							pos.accuracy = res.accuracy; // 位置精度
							// 保存最新地址
							_this.position = pos;
							// 执行查询
							_this.exeSyncQuery(url, true, pos);
						},
						cancel: function (res) {
							JU.pageCommonUtil.tipsDialog('用户拒绝授权获取地理位置');
						}
					});
				}
			});
		},
		
		/**搜索自定义位置附近服务点**/
		searchNearServ : function() {
			
			var _this = this;
			
			var url = location.origin + "/service/addrServ/nearbyServPoint";
			
			// 文字转化为地理座标搜索
			$("#autoSearch").click(function() {
				debugger;
				// 显示等待
				$("#content_scjl").css("display","block");
				// 置空数据列表
				$("#content").empty();
				
				var pos = {};
				var addrArea = $("#autoSearch").siblings("input").val();
				if (addrArea && "" != addrArea) {
					pos.longitude = $("#addrLng").text();
					pos.latitude = $("#addrLat").text();
				} else {
					// 用户未输入地址
					if (_this.position && "" != _this.position && JSON.stringify(_this.position).length > 2) {
						// 执行查询
				    	_this.exeSyncQuery(url, true, _this.position);
					} else {
						// 重新定位当前位置
						wx.getLocation({
					        type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
					        success: function(res) {
					        	// 查询当前地理位置成功
					        	// alert("queryLocSuccess:" + JSON.stringify(res));
						    	var pos = {};
						    	pos.longitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
						    	pos.latitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
						    	pos.speed = res.speed; // 速度，以米/每秒计
						    	pos.accuracy = res.accuracy; // 位置精度
						    	// 保存最新位置
						    	_this.position = pos;
						    	// 执行查询
						    	_this.exeSyncQuery(url, false, pos);
					        },
					        cancel: function (res) {
					        	JU.pageCommonUtil.tipsDialog('用户拒绝授权获取地理位置');
					        }
					    });
					}
				} 
				_this.exeSyncQuery(url, false, pos);
			});
			
			// 按当前地理位置搜索
			$("#mapSearch").click(function() {
				debugger;
				// 显示等待
				$("#content_scjl").css("display","block");
				// 置空数据列表
				$("#content").empty();
				alert("搜索当前地理位置附近的。。。");
			    // 查询当前的地理位置
			    wx.getLocation({
			        type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
			        success: function(res) {
			        	// 查询当前地理位置成功
				    	var pos = {};
				    	pos.longitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
				    	pos.latitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
				    	pos.speed = res.speed; // 速度，以米/每秒计
				    	pos.accuracy = res.accuracy; // 位置精度
				    	// 保存最新位置
				    	_this.position = pos;
				    	// 执行查询
				    	_this.exeSyncQuery(url, false, pos);
			        },
			        cancel: function (res) {
			        	JU.pageCommonUtil.tipsDialog('用户拒绝授权获取地理位置');
			        }
			    });
			});
			
			// 点击跳转至距离最近的服务点地图
			$("#myNavigator").click(function() {
				debugger;
				var storeName = $("#storeName").text();
				storeName = storeName.substring(0, storeName.lenth - 3);
				storeName = storeName && "" != storeName ? storeName : "百度国际大厦";
				var addr = $("#myNavigator").text();
				addr = addr && "" != addr ? addr : "深圳市南山区科苑路";
				var lng = $("#longitude").text();
				var lat = $("#latitude").text();
				lng = (lng && "" != lng) ? parseFloat(lng) : 113.934968;
				lat = (lat && "" != lat) ? parseFloat(lat) : 22.527589;
				// 打开地图,查看地理位置: 
				wx.openLocation({
					latitude: lng, 		// 纬度，浮点数，范围为90 ~ -90
					longitude: lat, 		// 经度，浮点数，范围为180 ~ -180。
					name: storeName, 				// 位置名
					address: addr, // 地址详情说明
					scale: 12, 					// 地图缩放级别,整形值,范围从1~28。默认为最大
					infoUrl: 'http://weixin.qq.com' // 在查看位置界面底部显示的超链接,可点击跳转
				});
			});
		},
		
		/**
		 * TODO 执行异步查询（并填充结果）
		 * @author sfit1108
		 * @date 2015年11月11日15:46:46
		 * @param  queryUrl 查询的URL
		 * @param  queryAttentioned 是否查询关注的列表（true/false）,默认false
		 * @param  position 查询的所参考的座标（如无则默认查询当前位置附近的服务点）
		 */
		exeSyncQuery : function(queryUrl, queryAttentioned, position) {
			var _this = this;
			var longitude = "", latitude = "";
			var noMoreData = "<li class=\"ser more\"><a href=\"javascript:nearByService.noMore();\" id=\"loadMore1\"><h3 style=\"display:none;\">加载更多</h3><p>附近没有更多服务点</p></a></li>";
			 debugger;
			if (position && "" != position) {
				longitude = position.longitude;
				latitude = position.latitude;
				alert("本次正常执行--exeSyncQuery(),pos:" + JSON.stringify(position));
			} else if (_this.position && "" != _this.position && JSON.stringify(_this.position).length > 2) {
				longitude = _this.position.longitude;
				latitude = _this.position.latitude;
				alert("本次查询未传输position参数,使用之前的地理位置：_this.position:" + longitude + "," + latitude);
			} else {
				alert("异常执行，无位置。不能查询出结果。");
				// 隐藏等待
				$("#content_scjl").css("display","none");
				// 将DOM中的HTML清除后再添加数据到页面中
				$("#content").empty().append(noMoreData);
				return;
			}
			//  执行查询
			$.ajax({
				type : "POST",
				dataType : "json",
				url : queryUrl,
				data: {"longitude" : longitude, "latitude" : latitude},
				success : function(res) {
					if (res && "" != res) {
						// debugger;
						if ("1" == res.status) {
							var queryResFlag, queryResData = "";
							if (queryAttentioned) {
								queryResFlag = res.result && "" != res.result && res.result.attentionDtoList && "" != res.result.attentionDtoList;
								queryResData = queryResFlag ? res.result.attentionDtoList : "";
							} else {
								queryResFlag = res.result && "" != res.result && res.result.storeList && "" != res.result.storeList;
								queryResData = queryResFlag ? res.result.storeList : "";
							}
							// 获得组装完成的Dom
							var dom = "";
							if (queryResFlag && queryResData instanceof Array) {
								var logoPath = "";
								var addrInfo = "";
								var attentionFlag = false;
								var index = 0, stoPoint;
								for(i in queryResData) {
									// 地址JSON对象 
									stoPoint = queryResData[i];
									// 要求大于5KM不显示
									if (stoPoint.distance > 100000) {
										continue;
									}
									// logo图标
									logoPath = servicePointUtil.getLogoPathByType(stoPoint.isHk);
									// 拼接地址
									addrInfo = stoPoint.province + stoPoint.city + stoPoint.district + stoPoint.address; 
									// 是否已关注 
									attentionFlag = stoPoint.isAttention == 1;
									index ++;
									//展示的第一条数据，用户可点击进入地图 
									if (index == 1) {
										_this.fillToMyNavigator(stoPoint, addrInfo);
									}
									// 获得DOM
									dom += _this.getNearStoreDom(logoPath, stoPoint.name, addrInfo, stoPoint.serviceContent, 
											stoPoint.distance, stoPoint.code, stoPoint.tel, attentionFlag);
								}
								dom += "<li class=\"ser more\"><a href=\"javascript:nearByService.loadMore();\" id=\"loadMore1\"><h3 style=\"display:none;\">加载更多</h3><p>附近没有更多服务点</p></a></li>";
							} else {
								dom += noMoreData;
							}
							// 隐藏等待
							$("#content_scjl").css("display","none");
							// 将DOM中的HTML清除后再添加数据到页面中
							$("#content").empty().append(dom);
						} else if ("0" == res.status) {
							// 隐藏等待
							$("#content_scjl").css("display","none");
							JU.pageCommonUtil.tipsDialog("查询失败，原因：" + res.message);
						} else {
							// 隐藏等待
							$("#content_scjl").css("display","none");
						}
					} else {
						// 显示“没有更多” 
						$(".ser-lists .ser.more p").removeClass("hide");
						// 隐藏“加载更多”
						$(".ser-lists .ser.more h3").addClass("hide");
						// 不可再点击 
						$(".ser-lists .ser.more > a").attr("href","#");
					}
				},
				fail : function(res) {
					// 隐藏等待
					$("#content_scjl").css("display","none");
				},
			});
		},
		
		/**
		 * TODO 将我的导航填充
		 * @param servPoint 服务点对象
		 * @param addrInfo 详细地址（已拼接完成）
		 */
		fillToMyNavigator : function(servPoint, addrInfo) {
			debugger;
			if (servPoint && "" != servPoint) {
				var myNavDom = (addrInfo && "" != addrInfo) ? addrInfo : (stoPoint.province + stoPoint.city + stoPoint.district + stoPoint.address);
				myNavDom = myNavDom.substring(0, 11) + "...";
				myNavDom += "<span id='storeName' style='display:none;'>" + servPoint.name + "</span>";
				myNavDom += "<span id='longitude' style='display:none;'>" + servPoint.longitude + "</span>";
				myNavDom += "<span id='latitude' style='display:none;'>" + servPoint.latitude + "</span>";
				$("#myNavigator").html(myNavDom);
			}
		},
		
		/**
		 * TODO 获得附近服务点DOM
		 * @author sfit1108
		 * @date 2015年11月9日10:37:46
		 * @param logPath 	Log图标地址
		 * @param storeName 服务点名称 
		 * @param address  	服务点详细点址
		 * @param offerServ 提供的服务（服务列表，数组）, 默认为 ['自寄服务','自取服务','收件服务']
		 * @param distance 	距离 
		 * @param storeId 	下单,用户点击的服务点id 
		 * @param tel 		电话
		 * @param attentionFlag 是否为已关注 （true:表示'是', false：表示'否'）默认为 false
		 */
		getNearStoreDom : function(logPath, storeName, address, offerServ, distance, storeId, tel, attentionFlag) {
			storeId = (storeId && "" != storeId) ? storeId : "自寄下单";
			tel = (tel && "" != tel) ? tel : "10086";
			var service = servicePointUtil.getOfferServByContList(offerServ, "span");
			var dom = "<li class='ser'>" 
				+ "<div class='ser-info-box d-flex' onclick='nearByService.gotoServInfo(\"" + storeId + "\");'>"
				+ "<img class='logo radius100' src='" + logPath + "'>"
				+ "<figure class='flex-right flex-1'>"
				+ "<h2 class='h1 nowrap'> " + storeName + "</h2>"
				+ "<p class='nowrap'>" + address + "</p>"
				+ service
				+ "</figure>"
				+ "</div>"
				+ "<div class='ser-to d-flex'>"
				+ "<span>" + distance + "km</span>"
				+ "<p class='flex-1'><a class='order' href=\"javascript:nearByService.sendOrderSelf(\'" + storeId + "\')\">自寄下单</a><a class='tel' href='tel:" + tel + "'>电话</a></p>"
				+ "</div>";
			if (attentionFlag) {
				dom += "<div class='flowed'><i class='ico'></i><span>已关注</span></div>";
			}
			dom += "</li>";
			return dom;
		},
		
		
	};
});