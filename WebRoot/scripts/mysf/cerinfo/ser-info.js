/**TODO  ���������ҳ��JS
 * @author sfit1108
 * @date 2015��11��9��*/
define(['zepto', 'jutil'], function($, JU) {
	
	/** TODO �ٶ�SEOͳ�ƣ� */
	$(document).ready(function() {
		var _hmt = _hmt || [];
		(function() {
		  var hm = document.createElement("script");
		  hm.src = "//hm.baidu.com/hm.js?e3ee4754efe5ba2415c7db261415f45c";
		  var s = document.getElementsByTagName("script")[0]; 
		  s.parentNode.insertBefore(hm, s);
		})();
	});
	
	// �������ֲ����ز˵�
	$(".ser-menu .ico.control").click(function(){
		var popup = $(".ser-menu .popup");
		popup.removeClass("hide").find("i.closed").click(function(){
			popup.addClass("hide");
		});		
	});
	
	return {
		/***
		 * TODO ��ʼ�����ظ��������ҳ������
		 */
		showServInfo : function() {
			var _this = this;
			var storeId = JU.pageCommonUtil.getReqUrlParameter("storeId");
			// debugger;
			if (storeId && "" != storeId) {
				var url = "/service/addrServ/servPointInfo";
				// ��ѯ��ϸ��γ������
				var longitude = "114.050960";
				var latitude = "22.541009";
				$.ajax({
					type : "POST",
					dataType : "json",
					url : url,
					data : {'storeId' : storeId, 'longitude' : longitude, 'latitude' : latitude, 'calcCount' : 'NO'},
					success : function(res) {
						if (res && "" != res) {
							if (res.status == 1) {
								console.log(res);
								if (res.result && "" != res.result && res.result.storeResult && "" != res.result.storeResult) {
									var storeInfo = res.result.storeResult;
									// debugger;
									// ����ѯ���� 
									_this.fillServPointDom(storeInfo);
									// ��ѯ�����������ע���� 
									_this.getCommAndServCount(storeId, url);
									// ���صȴ�
									$("#content_scjl").css("display","none");
								} else {
									JU.pageCommonUtil.tipsDialog("û�и�������");
									// ���صȴ�
									$("#content_scjl").css("display","none");
								}
							} else if (res.status == 0){
								JU.pageCommonUtil.tipsDialog(res.message);
								// ���صȴ�
								$("#content_scjl").css("display","none");
							}
						} else {
							JU.pageCommonUtil.tipsDialog("���ȵ�¼ ");
							// ���صȴ�
							$("#content_scjl").css("display","none");
						}
					},
					fail : function(error) {
						console.log(error);
						// ���صȴ�
						$("#content_scjl").css("display","none");
					}
				});
			}
		},
		/**
		 * TODO ��ѯ�����������ע��
		 */
		getCommAndServCount : function(storeId, url) {
			var longitude = "114.050960";
			var latitude = "22.541009";
			$.ajax({
				type : "POST",
				dataType : "json",
				url : url,
				data : {'storeId' : storeId, 'longitude' : longitude, 'latitude' : latitude, 'calcCount' : 'YES'},
				success : function(res) {
					if (res && "" != res) {
						if (res.status == 1) {
							console.log(res);
							if (res.result && "" != res.result && res.result.storeResult && "" != res.result.storeResult) {
								var storeInfo = res.result.storeResult;
								// debugger;
								
								var commendCount = storeInfo.commendTotal;
								commendCount = commendCount && "" != commendCount ? commendCount : "0";
								commendCount = commendCount > 999 ? "999+" : commendCount;
								// �ޣ�������
								$("#commendCount").html(commendCount);
								
								// ��ע ��������
								var attenedCount = storeInfo.attentionCountTotal;
								attenedCount = attenedCount && "" != attenedCount ? attenedCount : "0";
								attenedCount = attenedCount > 999 ? "999+" : attenedCount;
								$("#attentionCount").html(attenedCount);
								
								// ���صȴ�
								$("#content_scjl").css("display","none");
							} else {
								JU.pageCommonUtil.tipsDialog("û�и�������");
							}
						} else if (res.status == 0){
							JU.pageCommonUtil.tipsDialog("δ��ѯ������ ");
						}
					}
				},
				fail : function(error) {
					console.log(error);
					// ���صȴ�
					$("#content_scjl").css("display","none");
				}
			});
		},
		/**
		 * TODO ��ע�����ѡ��
		 */
		commondOrAttention : function() {
			var _this = this;
			$(".ser-digg figure").each(function(){
				var $this = $(this);
				var flag = true;
				$(this).find("i.ico").click(function(){
					// debugger;
					var total = parseInt($this.find("span").text());
					// �ж���Ϊ���޲������ǹ�ע/ȡ����ע����
					var praiseOperation = $this.find("p:contains('��')").length > 0;
					var attendOperation = $this.find("p:contains('��ע')").length > 0;
					debugger;
					if (praiseOperation) {
						// �ж��û��Ƿ����޹�
						var praisedFlag = $("#isCommend").text() == 1;
						if (praisedFlag) {
							// �û����޹�,���ٽ���
							return;
						} else {
							// �û����޲���
							_this.dotCommend();
							flag = true;
						}
					} else if(attendOperation) {
						// �ж��û��Ƿ��ѹ�ע��
						var attentionedFlag = $("#isAttention").text() == 1;
						if (attentionedFlag) {
							// �û�Ϊ�ѹ�ע״̬������Ϊ��ȡ����ע 
							_this.cancelAttentionPoint();
							flag = false;
						} else {
							// �û�Ϊδ��ע״̬������Ϊ����ע
							_this.attentionServPoint();
							flag = true;
						}
					} else {
						
					}
					debugger;
					// ҳ��ͼ��仯 
					if(flag){
						$this.addClass("clicked");
						$this.find("span").text(total + 1);
						flag = false;
					}else{
						$this.find("span").text(total - 1);
						$this.removeClass("clicked");
						flag = true;
					}
					
					// ���¼���ҳ��
					// location.reload();
				});
			});
		},
		/**
		 * TODO ���޲���
		 */
		dotCommend : function() {
			var url = window.location.origin + "/service/addrServ/thumbsUpPoint";
			var storeId = $("#storeId").text();
			$.ajax({
				type : "POST",
				dataType : "json",
				async : false,
				data : {"storeId" : storeId},
				url : url,
				success : function(res) {
					if (res && "" != res && res.status == "1") {
						if (res.errorCode && "" != res.errorCode && res.message && "" != res.message) {
							JU.pageCommonUtil.tipsDialog("ʧ�ܣ� ԭ�� " + res.message); 
						} else {
							// alert("�ɹ���") ;
							var commendCount = res.result.commendTotal;
							var isCommend = res.result.CommendStatus;
							var msg = res.message && "" != res.message ? res.message : "���޳ɹ�";
							$("#commendCount").text(commendCount);
							$("#isCommend").text(isCommend);
							JU.pageCommonUtil.tipsDialog(msg);
						}
					} else if (res && "" != res && res.status == "0") {
						JU.pageCommonUtil.tipsDialog("��δ��¼�����ȵ�¼"); 
					}
				},
				fail : function(err) {
					
				}
			});
		}, 
		/**
		 * TODO ��ע��������
		 */
		attentionServPoint : function() {
			var url = window.location.origin + "/service/addrServ/attentionServPoint";
			var storeId = $("#storeId").text();
			$.ajax({
				type : "POST",
				dataType : "json",
				async : false,
				data : {"storeId" : storeId},
				url : url,
				success : function(res) {
					if (res && "" != res && res.status == "1") {
						if (res.errorCode && "" != res.errorCode && res.message && "" != res.message) {
							alert("ʧ�ܣ� ԭ�� " + res.message); 
						} else {
							// alert("�ɹ���") ;
							var isAttention = res.result.CommendStatus == 1;
							if (isAttention) {
								$("#isAttention").text(1);
								// $("#attentionCount").text();
							}
							var msg = res.message && "" != res.message ? res.message : "��ע�ɹ�";
							JU.pageCommonUtil.tipsDialog(msg);
						}
					} else if (res && "" != res && res.status == "0") {
						JU.pageCommonUtil.tipsDialog("��δ��¼�����ȵ�¼"); 
					}
				},
				fail : function(err) {
					
				}
			});
		},
		/**
		 * TODO ȡ����ע��������
		 */
		cancelAttentionPoint : function() {
			var url = window.location.origin + "/service/addrServ/cancelAttentionPoint";
			var storeId = $("#storeId").text();
			$.ajax({
				type : "POST",
				dataType : "json",
				async : false,
				data : {"storeId" : storeId},
				url : url,
				success : function(res) {
					if (res && "" != res && res.status == "1") {
						if (res.errorCode && "" != res.errorCode && res.message && "" != res.message) {
							alert("ʧ�ܣ� ԭ�� " + res.message); 
						} else {
							// alert("�ɹ���") ;
							var cancelFlag = res.result.CancelAttentionAct == 1;
							if (cancelFlag) {
								$("#isAttention").text(0);
								// $("#attentionCount").text();
							}
							var msg = res.message && "" != res.message ? res.message : "�ɹ�ȡ����ע";
							JU.pageCommonUtil.tipsDialog(msg);
						}
					} else if (res && "" != res && res.status == "0") {
						alert("ʧ�ܣ� ԭ�� " + res.message); 
					} else {
						JU.pageCommonUtil.tipsDialog("��δ��¼�����ȵ�¼"); 
					}
				},
				fail : function(err) {
					
				}
			});
			
		},
		/**
		 * TODO ��ѯ����װ�����ҳ��DOM,�����֮
		 * @param storeInfo ��������Json����
		 */
		fillServPointDom : function(storeInfo) {
			var servHead = "", servFoot = "";
			if (storeInfo && "" != storeInfo) {
				
				var storeId = storeInfo.code;
				var addrInfo = storeInfo.province + storeInfo.city + storeInfo.district + storeInfo.address;
				var logoPath = servicePointUtil.getLogoPathByType(storeInfo.isHk);
				var servCont = servicePointUtil.getOfferServByContList(storeInfo.serviceContent, "span");
				
				servHead += "<img class=\"logo radius100 woh\" src=\"" + logoPath + "\">";
				servHead += "<figure class=\"flex-right flex-1\">";
				servHead += "<h1 class=\"h1 nowrap\">" + storeInfo.name + "</h1>";
				servHead += "<p class=\"nowrap\">" + addrInfo + "</p>";
				servHead += servCont;
				servHead += "</figure>";
				// ���������Ϣ
				$("section.ser-info-box.d-flex").empty().html(servHead);
				
				// �޹���1������ ��0 ��δ�� ��
				var commendFlag = storeInfo.isCommend == 1;
				var commendCount = storeInfo.commendTotal;
				commendCount = commendCount && "" != commendCount ? commendCount : "0";
				// ��ע״̬��1 ���ѹ�ע������������δ��ע ��
				var attenedFlag = storeInfo.isAttention == 1;
				var attenedCount = storeInfo.attentionCountTotal;
				attenedCount = attenedCount && "" != attenedCount ? attenedCount : "0";
				/*
				// �ޣ�������
				$("#commendCount").html(commendCount);
				*/
				$("#isCommend").text(storeInfo.isCommend).css("display", "none");
				/*
				// ��ע ��������
				$("#attentionCount").html(attenedCount);
				*/
				$("#isAttention").text(storeInfo.isAttention).css("display", "none");
				// ������id
				$("#storeId").text(storeId);
				
				// �������ϵ��ʽ 
				servFoot += "<div class=\"d-flex\"><span>��ϵ�绰</span><p class=\"flex-1\">" + storeInfo.tel + "</p></div>";
				servFoot += "<div class=\"d-flex\"><span>����ʱ��</span><p class=\"flex-1\">" + storeInfo.serviceTime + "</p></div>";
				servFoot += "<div class=\"d-flex\"><span>��ϸ��ַ</span><p class=\"flex-1\">" + addrInfo + "</p></div>";
				$("section.ser-content").html(servFoot);
				// �ж��ޣ�ͼ�꣩
				var $praise = $("section.ser-digg.d-flex").find("p:contains('��')").parent();
				debugger;
				if (commendFlag) {
					$praise.addClass("clicked");
				} else {
					$praise.removeClass("clicked");
				}
				// �жϹ�ע ��ͼ�꣩
				var $attend = $("section.ser-digg.d-flex").find("p:contains('��ע')").parent();
				if (attenedFlag) {
					$attend.addClass("clicked");
				} else {
					$attend.removeClass("clicked");
				}
			}
		},
		/**
		 * TODO ��ѯ����װ�����ҳ��DOM,�����֮
		 * @deleted ������
		 * @param storeInfo ��������Json����
		 * @return Dom����Header��ǩ�����ȫ��DOM����
		 */
		getServPointInfoDom : function(storeInfo) {
			var servDom = "", servHead = "", servBody = "", servFoot = "";
			if (storeInfo && "" != storeInfo) {
				var storeId = storeInfo.code;
				var addrInfo = storeInfo.province + storeInfo.city + storeInfo.district + storeInfo.address;
				var logoPath = servicePointUtil.getLogoPathByType(storeInfo.isHk);
				var servCont = servicePointUtil.getOfferServByContList(storeInfo.serviceContent, "span");
				// �޹���1������ ��0 ��δ�� ��
				var commendFlag = storeInfo.isCommend == 1;
				var commendCount = storeInfo.commendTotal;
				commendCount = commendCount && "" != commendCount ? commendCount : "0";
				// ��ע״̬��1 ���ѹ�ע������������δ��ע ��
				var attenedFlag = storeInfo.isAttention == 1;
				var attenedCount = storeInfo.attentionCountTotal;
				attenedCount = attenedCount && "" != attenedCount ? attenedCount : "0";
				
				// �������Ϣ
				servHead += "<img class=\"logo radius100 woh\" src=\"" + logoPath + "\">";
				servHead += "<figure class=\"flex-right flex-1\">";
				servHead += "<h1 class=\"h1 nowrap\">" + storeInfo.name + "</h1>";
				servHead += "<p class=\"nowrap\">" + addrInfo + "</p>";
				servHead += servCont;
				servHead += "</figure>";
				
				// ��/��ע 
				servBody += "<figure class=\"support flex-1\">";
				servBody += "<span id=\"storeId\"style=\"display:none;\">" + storeId + "</span>";
				servBody += "<span id=\"isCommend\"style=\"display:none;\">" + storeInfo.isCommend + "</span>";
				servBody += "<span id=\"isAttention\"style=\"display:none;\">" + storeInfo.isAttention + "</span>";
				servBody += "<i class=\"ico\"></i>";
				servBody += "<p>��</p>";
				servBody += "<span>" + commendCount + "</span>";
				servBody += "</figure>";
				servBody += "<figure class=\"flow flex-1\">";
				servBody += "<i class=\"ico\"></i>";
				servBody += "<p>��ע</p>";
				servBody += "<span>" + attenedCount + "</span>";
				servBody += "</figure>";
				// �������ϵ��ʽ 
				servFoot += "<div class=\"d-flex\"><span>��ϵ�绰</span><p class=\"flex-1\">" + storeInfo.tel + "</p></div>";
				servFoot += "<div class=\"d-flex\"><span>����ʱ��</span><p class=\"flex-1\">" + storeInfo.serviceTime + "</p></div>";
				servFoot += "<div class=\"d-flex\"><span>��ϸ��ַ</span><p class=\"flex-1\">" + addrInfo + "</p></div>";
				// �ж��ޣ�ͼ�꣩
				if (commendFlag) {
				} else {
				}
				// �жϹ�ע ��ͼ�꣩
				if (attenedFlag) {
				} else {
				}
				// ��Ϻ��DOM���� 
				servDom += "<section class=\"ser-info-box d-flex\">";
				servDom += servHead;
				servDom += "</section>";
				servDom += "<section class=\"ser-digg d-flex\">";
				servDom += servBody;
				servDom += "</section>";
				servDom += "<section class=\"ser-content\">";
				servDom += servFoot;
				servDom += "</section>";
			}
			return servDom;
		}
	};
});