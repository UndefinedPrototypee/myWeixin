/**���������ҳ��JS**/
define(['zepto', 'jweixin', 'jutil', 'addrUtil'], function($, JW, JU, ADU) {
	
	/** TODO �ٶ�SEOͳ�ƣ� */
	$(document).ready(function() {
		// alert("�ٶ�");
		var _hmt = _hmt || [];
		(function() {
		  var hm = document.createElement("script");
		  hm.src = "//hm.baidu.com/hm.js?e3ee4754efe5ba2415c7db261415f45c";
		  var s = document.getElementsByTagName("script")[0]; 
		  s.parentNode.insertBefore(hm, s);
		})();
	});
	
	return {
		// ҳ�����λ��
		position : {},
		// �����ж�ҳ�����ֲ��ж�
		hintFlag : false,
		// ��Ӱٶ�����������ҳ�����¼���----1.1
		readyExecute : function() {
			var _this = this;
			// ҳ���û���������¼� 
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
		// ��Ӱٶ�����������ҳ�����¼���----1.2
		filter_time : function(obj) {  
			var _this = this;
		    var time = setInterval(function(){
		    		_this.filter_staff_from_exist(obj);
		    	}, 100);  
		    $(this).bind("blur",function(){  
		        clearInterval(time);  
		    });
		},
		// ��Ӱٶ�����������ҳ�����¼���----1.3
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
		 * TODO ��õ�ǰλ����Ϣ
		 */
		weixinGetLocation : function() {
			return JU.weixinUtil.weixinGetLocation();
		},
		
		// ���ظ���...
		loadMore : function() {
			$("#content .ser.more").click(function() {
				JU.pageCommonUtil.tipsDialog(3124);
			});
		},
		// չʾ����������б�
		showNearServ : function() {
			// debugger;
			
			// ��ʾ�ȴ�
			$("#content_scjl").css("display","block");
			var _this = this;
			// ��ȡ��ǰ����λ����Ϣ
			if(navigator.geolocation){
				// tipsDialog("����Ŭ����ȡλ��...");
				var options = {enableHighAccuracy:true,timeout:5000,maximumAge:30000};
				navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options);
			}else{
				JU.pageCommonUtil.tipsDialog("��λʧ��,�û��ѽ���λ�û�ȡȨ��");
			}
			// ��ȡλ�óɹ�
			function successCallback(position) {
				var pos = {};
				pos.longitude = position.coords.longitude;  //"113.93994927";"113.93994927";//
				pos.latitude = position.coords.latitude;  //"22.52583739";//"22.52583739";//
				// ���浽ȫ��
				_this.position = pos;
				// ִ�в�ѯ
				var url = location.origin + "/service/addrServ/nearbyServPoint";
				_this.exeSyncQuery(url, false, pos);
			};
			// ��λʧ�� 
			function errorCallback (error) {
				debugger;
				// �籾���Ѵ���λ��
				if (_this.position && "" != _this.position && JSON.stringify(_this.position).length > 2) {
					var url = location.origin + "/service/addrServ/nearbyServPoint";
					_this.exeSyncQuery(url, false, _this.position);
				} else {
					switch (error.code) {
						case error.PERMISSION_DENIED:
							closeDialog();
							JU.pageCommonUtil.tipsDialog("��λʧ��,�û��ܾ��������λ");
							break;
						case error.POSITION_UNAVAILABLE:
							closeDialog();
							JU.pageCommonUtil.tipsDialog("��λʧ��,λ����Ϣ�ǲ�����");
							break;
						case error.TIMEOUT:
							closeDialog();
							JU.pageCommonUtil.tipsDialog("��λʧ��,�����ȡ�û�λ�ó�ʱ");
							break;
						case error.UNKNOWN_ERROR:
							closeDialog();
							JU.pageCommonUtil.tipsDialog("��λʧ��,��λϵͳʧЧ");
							break;
					}
					// ��ʾ�ȴ�
					$("#content_scjl").css("display","none");
					// ��Ϊ���ز�ѯ
					if (!pageCommonUtil.judgeAndroidOrIphone.mobile) {
						// ִ��ҳ�����ݲ�ѯ
						var url = location.origin + "/service/addrServ/nearbyServPoint";
						var pos = {};
						pos.longitude = "113.934968";
						pos.latitude = "22.527589";
						_this.exeSyncQuery(url, false, pos);
					};
				}
			};
		},
		
		/** չʾ�ҹ�ע���б� **/
		showMyAttentioned : function() {
			debugger;
			var _this = this;
			$("#myAttentioned").click(function() {
				// ��ʾ�ȴ�
				$("#content_scjl").css("display","block");
				// �ÿ������б�
				$("#content").empty();
				// debugger;
				var url = location.origin + "/service/addrServ/userAttentedPoint";
				if (_this.position && "" != _this.position && JSON.stringify(_this.position).length > 2) {
					// ִ�в�ѯ
			    	_this.exeSyncQuery(url, true, _this.position);
				} else {
					// ���»�ȡλ��
					wx.getLocation({
						type: 'wgs84', // Ĭ��Ϊwgs84��gps���꣬���Ҫ����ֱ�Ӹ�openLocation�õĻ������꣬�ɴ���'gcj02'
						success: function(res) {
							// ��ѯ��ǰ����λ�óɹ�
							var pos = {};
							pos.longitude = res.latitude; // γ�ȣ�����������ΧΪ90 ~ -90
							pos.latitude = res.longitude; // ���ȣ�����������ΧΪ180 ~ -180��
							pos.speed = res.speed; // �ٶȣ�����/ÿ���
							pos.accuracy = res.accuracy; // λ�þ���
							// �������µ�ַ
							_this.position = pos;
							// ִ�в�ѯ
							_this.exeSyncQuery(url, true, pos);
						},
						cancel: function (res) {
							JU.pageCommonUtil.tipsDialog('�û��ܾ���Ȩ��ȡ����λ��');
						}
					});
				}
			});
		},
		
		/**�����Զ���λ�ø��������**/
		searchNearServ : function() {
			
			var _this = this;
			
			var url = location.origin + "/service/addrServ/nearbyServPoint";
			
			// ����ת��Ϊ������������
			$("#autoSearch").click(function() {
				debugger;
				// ��ʾ�ȴ�
				$("#content_scjl").css("display","block");
				// �ÿ������б�
				$("#content").empty();
				
				var pos = {};
				var addrArea = $("#autoSearch").siblings("input").val();
				if (addrArea && "" != addrArea) {
					pos.longitude = $("#addrLng").text();
					pos.latitude = $("#addrLat").text();
				} else {
					// �û�δ�����ַ
					if (_this.position && "" != _this.position && JSON.stringify(_this.position).length > 2) {
						// ִ�в�ѯ
				    	_this.exeSyncQuery(url, true, _this.position);
					} else {
						// ���¶�λ��ǰλ��
						wx.getLocation({
					        type: 'wgs84', // Ĭ��Ϊwgs84��gps���꣬���Ҫ����ֱ�Ӹ�openLocation�õĻ������꣬�ɴ���'gcj02'
					        success: function(res) {
					        	// ��ѯ��ǰ����λ�óɹ�
					        	// alert("queryLocSuccess:" + JSON.stringify(res));
						    	var pos = {};
						    	pos.longitude = res.latitude; // γ�ȣ�����������ΧΪ90 ~ -90
						    	pos.latitude = res.longitude; // ���ȣ�����������ΧΪ180 ~ -180��
						    	pos.speed = res.speed; // �ٶȣ�����/ÿ���
						    	pos.accuracy = res.accuracy; // λ�þ���
						    	// ��������λ��
						    	_this.position = pos;
						    	// ִ�в�ѯ
						    	_this.exeSyncQuery(url, false, pos);
					        },
					        cancel: function (res) {
					        	JU.pageCommonUtil.tipsDialog('�û��ܾ���Ȩ��ȡ����λ��');
					        }
					    });
					}
				} 
				_this.exeSyncQuery(url, false, pos);
			});
			
			// ����ǰ����λ������
			$("#mapSearch").click(function() {
				debugger;
				// ��ʾ�ȴ�
				$("#content_scjl").css("display","block");
				// �ÿ������б�
				$("#content").empty();
				alert("������ǰ����λ�ø����ġ�����");
			    // ��ѯ��ǰ�ĵ���λ��
			    wx.getLocation({
			        type: 'wgs84', // Ĭ��Ϊwgs84��gps���꣬���Ҫ����ֱ�Ӹ�openLocation�õĻ������꣬�ɴ���'gcj02'
			        success: function(res) {
			        	// ��ѯ��ǰ����λ�óɹ�
				    	var pos = {};
				    	pos.longitude = res.latitude; // γ�ȣ�����������ΧΪ90 ~ -90
				    	pos.latitude = res.longitude; // ���ȣ�����������ΧΪ180 ~ -180��
				    	pos.speed = res.speed; // �ٶȣ�����/ÿ���
				    	pos.accuracy = res.accuracy; // λ�þ���
				    	// ��������λ��
				    	_this.position = pos;
				    	// ִ�в�ѯ
				    	_this.exeSyncQuery(url, false, pos);
			        },
			        cancel: function (res) {
			        	JU.pageCommonUtil.tipsDialog('�û��ܾ���Ȩ��ȡ����λ��');
			        }
			    });
			});
			
			// �����ת����������ķ�����ͼ
			$("#myNavigator").click(function() {
				debugger;
				var storeName = $("#storeName").text();
				storeName = storeName.substring(0, storeName.lenth - 3);
				storeName = storeName && "" != storeName ? storeName : "�ٶȹ��ʴ���";
				var addr = $("#myNavigator").text();
				addr = addr && "" != addr ? addr : "��������ɽ����Է·";
				var lng = $("#longitude").text();
				var lat = $("#latitude").text();
				lng = (lng && "" != lng) ? parseFloat(lng) : 113.934968;
				lat = (lat && "" != lat) ? parseFloat(lat) : 22.527589;
				// �򿪵�ͼ,�鿴����λ��: 
				wx.openLocation({
					latitude: lng, 		// γ�ȣ�����������ΧΪ90 ~ -90
					longitude: lat, 		// ���ȣ�����������ΧΪ180 ~ -180��
					name: storeName, 				// λ����
					address: addr, // ��ַ����˵��
					scale: 12, 					// ��ͼ���ż���,����ֵ,��Χ��1~28��Ĭ��Ϊ���
					infoUrl: 'http://weixin.qq.com' // �ڲ鿴λ�ý���ײ���ʾ�ĳ�����,�ɵ����ת
				});
			});
		},
		
		/**
		 * TODO ִ���첽��ѯ�����������
		 * @author sfit1108
		 * @date 2015��11��11��15:46:46
		 * @param  queryUrl ��ѯ��URL
		 * @param  queryAttentioned �Ƿ��ѯ��ע���б�true/false��,Ĭ��false
		 * @param  position ��ѯ�����ο������꣨������Ĭ�ϲ�ѯ��ǰλ�ø����ķ���㣩
		 */
		exeSyncQuery : function(queryUrl, queryAttentioned, position) {
			var _this = this;
			var longitude = "", latitude = "";
			var noMoreData = "<li class=\"ser more\"><a href=\"javascript:nearByService.noMore();\" id=\"loadMore1\"><h3 style=\"display:none;\">���ظ���</h3><p>����û�и�������</p></a></li>";
			 debugger;
			if (position && "" != position) {
				longitude = position.longitude;
				latitude = position.latitude;
				alert("��������ִ��--exeSyncQuery(),pos:" + JSON.stringify(position));
			} else if (_this.position && "" != _this.position && JSON.stringify(_this.position).length > 2) {
				longitude = _this.position.longitude;
				latitude = _this.position.latitude;
				alert("���β�ѯδ����position����,ʹ��֮ǰ�ĵ���λ�ã�_this.position:" + longitude + "," + latitude);
			} else {
				alert("�쳣ִ�У���λ�á����ܲ�ѯ�������");
				// ���صȴ�
				$("#content_scjl").css("display","none");
				// ��DOM�е�HTML�������������ݵ�ҳ����
				$("#content").empty().append(noMoreData);
				return;
			}
			//  ִ�в�ѯ
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
							// �����װ��ɵ�Dom
							var dom = "";
							if (queryResFlag && queryResData instanceof Array) {
								var logoPath = "";
								var addrInfo = "";
								var attentionFlag = false;
								var index = 0, stoPoint;
								for(i in queryResData) {
									// ��ַJSON���� 
									stoPoint = queryResData[i];
									// Ҫ�����5KM����ʾ
									if (stoPoint.distance > 100000) {
										continue;
									}
									// logoͼ��
									logoPath = servicePointUtil.getLogoPathByType(stoPoint.isHk);
									// ƴ�ӵ�ַ
									addrInfo = stoPoint.province + stoPoint.city + stoPoint.district + stoPoint.address; 
									// �Ƿ��ѹ�ע 
									attentionFlag = stoPoint.isAttention == 1;
									index ++;
									//չʾ�ĵ�һ�����ݣ��û��ɵ�������ͼ 
									if (index == 1) {
										_this.fillToMyNavigator(stoPoint, addrInfo);
									}
									// ���DOM
									dom += _this.getNearStoreDom(logoPath, stoPoint.name, addrInfo, stoPoint.serviceContent, 
											stoPoint.distance, stoPoint.code, stoPoint.tel, attentionFlag);
								}
								dom += "<li class=\"ser more\"><a href=\"javascript:nearByService.loadMore();\" id=\"loadMore1\"><h3 style=\"display:none;\">���ظ���</h3><p>����û�и�������</p></a></li>";
							} else {
								dom += noMoreData;
							}
							// ���صȴ�
							$("#content_scjl").css("display","none");
							// ��DOM�е�HTML�������������ݵ�ҳ����
							$("#content").empty().append(dom);
						} else if ("0" == res.status) {
							// ���صȴ�
							$("#content_scjl").css("display","none");
							JU.pageCommonUtil.tipsDialog("��ѯʧ�ܣ�ԭ��" + res.message);
						} else {
							// ���صȴ�
							$("#content_scjl").css("display","none");
						}
					} else {
						// ��ʾ��û�и��ࡱ 
						$(".ser-lists .ser.more p").removeClass("hide");
						// ���ء����ظ��ࡱ
						$(".ser-lists .ser.more h3").addClass("hide");
						// �����ٵ�� 
						$(".ser-lists .ser.more > a").attr("href","#");
					}
				},
				fail : function(res) {
					// ���صȴ�
					$("#content_scjl").css("display","none");
				},
			});
		},
		
		/**
		 * TODO ���ҵĵ������
		 * @param servPoint ��������
		 * @param addrInfo ��ϸ��ַ����ƴ����ɣ�
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
		 * TODO ��ø��������DOM
		 * @author sfit1108
		 * @date 2015��11��9��10:37:46
		 * @param logPath 	Logͼ���ַ
		 * @param storeName ��������� 
		 * @param address  	�������ϸ��ַ
		 * @param offerServ �ṩ�ķ��񣨷����б����飩, Ĭ��Ϊ ['�Լķ���','��ȡ����','�ռ�����']
		 * @param distance 	���� 
		 * @param storeId 	�µ�,�û�����ķ����id 
		 * @param tel 		�绰
		 * @param attentionFlag �Ƿ�Ϊ�ѹ�ע ��true:��ʾ'��', false����ʾ'��'��Ĭ��Ϊ false
		 */
		getNearStoreDom : function(logPath, storeName, address, offerServ, distance, storeId, tel, attentionFlag) {
			storeId = (storeId && "" != storeId) ? storeId : "�Լ��µ�";
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
				+ "<p class='flex-1'><a class='order' href=\"javascript:nearByService.sendOrderSelf(\'" + storeId + "\')\">�Լ��µ�</a><a class='tel' href='tel:" + tel + "'>�绰</a></p>"
				+ "</div>";
			if (attentionFlag) {
				dom += "<div class='flowed'><i class='ico'></i><span>�ѹ�ע</span></div>";
			}
			dom += "</li>";
			return dom;
		},
		
		
	};
});