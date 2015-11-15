/**TODO  服务点详情页面JS
 * @author sfit1108
 * @date 2015年11月9日*/
define(['zepto', 'jutil'], function($, JU) {
	
	/** TODO 百度SEO统计； */
	$(document).ready(function() {
		var _hmt = _hmt || [];
		(function() {
		  var hm = document.createElement("script");
		  hm.src = "//hm.baidu.com/hm.js?e3ee4754efe5ba2415c7db261415f45c";
		  var s = document.getElementsByTagName("script")[0]; 
		  s.parentNode.insertBefore(hm, s);
		})();
	});
	
	// 弹出遮罩层隐藏菜单
	$(".ser-menu .ico.control").click(function(){
		var popup = $(".ser-menu .popup");
		popup.removeClass("hide").find("i.closed").click(function(){
			popup.addClass("hide");
		});		
	});
	
	return {
		/***
		 * TODO 初始化加载附近服务点页面数据
		 */
		showServInfo : function() {
			var _this = this;
			var storeId = JU.pageCommonUtil.getReqUrlParameter("storeId");
			// debugger;
			if (storeId && "" != storeId) {
				var url = "/service/addrServ/servPointInfo";
				// 查询详细经纬度无义
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
									// 填充查询数据 
									_this.fillServPointDom(storeInfo);
									// 查询点赞数量与关注数量 
									_this.getCommAndServCount(storeId, url);
									// 隐藏等待
									$("#content_scjl").css("display","none");
								} else {
									JU.pageCommonUtil.tipsDialog("没有更多数据");
									// 隐藏等待
									$("#content_scjl").css("display","none");
								}
							} else if (res.status == 0){
								JU.pageCommonUtil.tipsDialog(res.message);
								// 隐藏等待
								$("#content_scjl").css("display","none");
							}
						} else {
							JU.pageCommonUtil.tipsDialog("请先登录 ");
							// 隐藏等待
							$("#content_scjl").css("display","none");
						}
					},
					fail : function(error) {
						console.log(error);
						// 隐藏等待
						$("#content_scjl").css("display","none");
					}
				});
			}
		},
		/**
		 * TODO 查询出集赞数与关注数
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
								// 赞（数量）
								$("#commendCount").html(commendCount);
								
								// 关注 （数量）
								var attenedCount = storeInfo.attentionCountTotal;
								attenedCount = attenedCount && "" != attenedCount ? attenedCount : "0";
								attenedCount = attenedCount > 999 ? "999+" : attenedCount;
								$("#attentionCount").html(attenedCount);
								
								// 隐藏等待
								$("#content_scjl").css("display","none");
							} else {
								JU.pageCommonUtil.tipsDialog("没有更多数据");
							}
						} else if (res.status == 0){
							JU.pageCommonUtil.tipsDialog("未查询出数据 ");
						}
					}
				},
				fail : function(error) {
					console.log(error);
					// 隐藏等待
					$("#content_scjl").css("display","none");
				}
			});
		},
		/**
		 * TODO 关注与点赞选择
		 */
		commondOrAttention : function() {
			var _this = this;
			$(".ser-digg figure").each(function(){
				var $this = $(this);
				var flag = true;
				$(this).find("i.ico").click(function(){
					// debugger;
					var total = parseInt($this.find("span").text());
					// 判断是为点赞操作还是关注/取消关注操作
					var praiseOperation = $this.find("p:contains('赞')").length > 0;
					var attendOperation = $this.find("p:contains('关注')").length > 0;
					debugger;
					if (praiseOperation) {
						// 判断用户是否已赞过
						var praisedFlag = $("#isCommend").text() == 1;
						if (praisedFlag) {
							// 用户已赞过,不再进行
							return;
						} else {
							// 用户点赞操作
							_this.dotCommend();
							flag = true;
						}
					} else if(attendOperation) {
						// 判断用户是否已关注过
						var attentionedFlag = $("#isAttention").text() == 1;
						if (attentionedFlag) {
							// 用户为已关注状态，操作为：取消关注 
							_this.cancelAttentionPoint();
							flag = false;
						} else {
							// 用户为未关注状态，操作为：关注
							_this.attentionServPoint();
							flag = true;
						}
					} else {
						
					}
					debugger;
					// 页面图标变化 
					if(flag){
						$this.addClass("clicked");
						$this.find("span").text(total + 1);
						flag = false;
					}else{
						$this.find("span").text(total - 1);
						$this.removeClass("clicked");
						flag = true;
					}
					
					// 重新加载页面
					// location.reload();
				});
			});
		},
		/**
		 * TODO 点赞操作
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
							JU.pageCommonUtil.tipsDialog("失败， 原因： " + res.message); 
						} else {
							// alert("成功。") ;
							var commendCount = res.result.commendTotal;
							var isCommend = res.result.CommendStatus;
							var msg = res.message && "" != res.message ? res.message : "点赞成功";
							$("#commendCount").text(commendCount);
							$("#isCommend").text(isCommend);
							JU.pageCommonUtil.tipsDialog(msg);
						}
					} else if (res && "" != res && res.status == "0") {
						JU.pageCommonUtil.tipsDialog("您未登录，请先登录"); 
					}
				},
				fail : function(err) {
					
				}
			});
		}, 
		/**
		 * TODO 关注服务点操作
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
							alert("失败， 原因： " + res.message); 
						} else {
							// alert("成功。") ;
							var isAttention = res.result.CommendStatus == 1;
							if (isAttention) {
								$("#isAttention").text(1);
								// $("#attentionCount").text();
							}
							var msg = res.message && "" != res.message ? res.message : "关注成功";
							JU.pageCommonUtil.tipsDialog(msg);
						}
					} else if (res && "" != res && res.status == "0") {
						JU.pageCommonUtil.tipsDialog("您未登录，请先登录"); 
					}
				},
				fail : function(err) {
					
				}
			});
		},
		/**
		 * TODO 取消关注服务点操作
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
							alert("失败， 原因： " + res.message); 
						} else {
							// alert("成功。") ;
							var cancelFlag = res.result.CancelAttentionAct == 1;
							if (cancelFlag) {
								$("#isAttention").text(0);
								// $("#attentionCount").text();
							}
							var msg = res.message && "" != res.message ? res.message : "成功取消关注";
							JU.pageCommonUtil.tipsDialog(msg);
						}
					} else if (res && "" != res && res.status == "0") {
						alert("失败， 原因： " + res.message); 
					} else {
						JU.pageCommonUtil.tipsDialog("您未登录，请先登录"); 
					}
				},
				fail : function(err) {
					
				}
			});
			
		},
		/**
		 * TODO 查询后组装服务点页面DOM,并填充之
		 * @param storeInfo 服务点对象Json数据
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
				// 填充服务点信息
				$("section.ser-info-box.d-flex").empty().html(servHead);
				
				// 赞过（1：已赞 ；0 ：未赞 ）
				var commendFlag = storeInfo.isCommend == 1;
				var commendCount = storeInfo.commendTotal;
				commendCount = commendCount && "" != commendCount ? commendCount : "0";
				// 关注状态（1 ：已关注　；　０　：未关注 ）
				var attenedFlag = storeInfo.isAttention == 1;
				var attenedCount = storeInfo.attentionCountTotal;
				attenedCount = attenedCount && "" != attenedCount ? attenedCount : "0";
				/*
				// 赞（数量）
				$("#commendCount").html(commendCount);
				*/
				$("#isCommend").text(storeInfo.isCommend).css("display", "none");
				/*
				// 关注 （数量）
				$("#attentionCount").html(attenedCount);
				*/
				$("#isAttention").text(storeInfo.isAttention).css("display", "none");
				// 隐藏其id
				$("#storeId").text(storeId);
				
				// 服务点联系方式 
				servFoot += "<div class=\"d-flex\"><span>联系电话</span><p class=\"flex-1\">" + storeInfo.tel + "</p></div>";
				servFoot += "<div class=\"d-flex\"><span>服务时间</span><p class=\"flex-1\">" + storeInfo.serviceTime + "</p></div>";
				servFoot += "<div class=\"d-flex\"><span>详细地址</span><p class=\"flex-1\">" + addrInfo + "</p></div>";
				$("section.ser-content").html(servFoot);
				// 判断赞（图标）
				var $praise = $("section.ser-digg.d-flex").find("p:contains('赞')").parent();
				debugger;
				if (commendFlag) {
					$praise.addClass("clicked");
				} else {
					$praise.removeClass("clicked");
				}
				// 判断关注 （图标）
				var $attend = $("section.ser-digg.d-flex").find("p:contains('关注')").parent();
				if (attenedFlag) {
					$attend.addClass("clicked");
				} else {
					$attend.removeClass("clicked");
				}
			}
		},
		/**
		 * TODO 查询后组装服务点页面DOM,并填充之
		 * @deleted 已弃用
		 * @param storeInfo 服务点对象Json数据
		 * @return Dom对象（Header标签下面的全部DOM对象）
		 */
		getServPointInfoDom : function(storeInfo) {
			var servDom = "", servHead = "", servBody = "", servFoot = "";
			if (storeInfo && "" != storeInfo) {
				var storeId = storeInfo.code;
				var addrInfo = storeInfo.province + storeInfo.city + storeInfo.district + storeInfo.address;
				var logoPath = servicePointUtil.getLogoPathByType(storeInfo.isHk);
				var servCont = servicePointUtil.getOfferServByContList(storeInfo.serviceContent, "span");
				// 赞过（1：已赞 ；0 ：未赞 ）
				var commendFlag = storeInfo.isCommend == 1;
				var commendCount = storeInfo.commendTotal;
				commendCount = commendCount && "" != commendCount ? commendCount : "0";
				// 关注状态（1 ：已关注　；　０　：未关注 ）
				var attenedFlag = storeInfo.isAttention == 1;
				var attenedCount = storeInfo.attentionCountTotal;
				attenedCount = attenedCount && "" != attenedCount ? attenedCount : "0";
				
				// 服务点信息
				servHead += "<img class=\"logo radius100 woh\" src=\"" + logoPath + "\">";
				servHead += "<figure class=\"flex-right flex-1\">";
				servHead += "<h1 class=\"h1 nowrap\">" + storeInfo.name + "</h1>";
				servHead += "<p class=\"nowrap\">" + addrInfo + "</p>";
				servHead += servCont;
				servHead += "</figure>";
				
				// 赞/关注 
				servBody += "<figure class=\"support flex-1\">";
				servBody += "<span id=\"storeId\"style=\"display:none;\">" + storeId + "</span>";
				servBody += "<span id=\"isCommend\"style=\"display:none;\">" + storeInfo.isCommend + "</span>";
				servBody += "<span id=\"isAttention\"style=\"display:none;\">" + storeInfo.isAttention + "</span>";
				servBody += "<i class=\"ico\"></i>";
				servBody += "<p>赞</p>";
				servBody += "<span>" + commendCount + "</span>";
				servBody += "</figure>";
				servBody += "<figure class=\"flow flex-1\">";
				servBody += "<i class=\"ico\"></i>";
				servBody += "<p>关注</p>";
				servBody += "<span>" + attenedCount + "</span>";
				servBody += "</figure>";
				// 服务点联系方式 
				servFoot += "<div class=\"d-flex\"><span>联系电话</span><p class=\"flex-1\">" + storeInfo.tel + "</p></div>";
				servFoot += "<div class=\"d-flex\"><span>服务时间</span><p class=\"flex-1\">" + storeInfo.serviceTime + "</p></div>";
				servFoot += "<div class=\"d-flex\"><span>详细地址</span><p class=\"flex-1\">" + addrInfo + "</p></div>";
				// 判断赞（图标）
				if (commendFlag) {
				} else {
				}
				// 判断关注 （图标）
				if (attenedFlag) {
				} else {
				}
				// 组合后的DOM对象 
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