/** ****我的地址库JS***** */
define([ 'jquery', 'amaps' ], function($, MAP) {

	return {
		
		// 页面加载后执行的方法
		running : function() {

			// 鼠标按下
			$("#addrInput").keydown(function(event) {
				debugger;
				// 调用鼠标按下方法
				keydown(event);
			});

			// 鼠标浮起
			$("#addrInput").keyup(function(event) {
				debugger;
				// 调用鼠标浮起动作
				keyup(event);
			});
		}
	};

	$("#addrInput").onkeyup = keydown;

	// 地址输入框标签ID
	var Element_Id = "";
	
	/**
	 * TODO 鼠标按下事件
	 * 
	 * @author Administrator
	 * @time 2015年11月14日23:13:44
	 * @param event
	 *            浏览器事件
	 */
	function keydown(event) {
		debugger;
		// 获得当前输入框的id
		event = event || window.event;
		var tar = event.srcElement || event.target;
		var elementId = tar ? tar.id : undefined;
		if (!elementId) {
			alert("请为该地址输入框赋预唯一ID");
			return;
		}
		Element_Id = elementId;
		// 键盘事件
		if (event.originalEvent) {
			event = event.originalEvent;
		}
		// 执行方法
		autoSearch(elementId);
		var key = (event || window.event).keyCode;
		var result = document.getElementById("result_list");
		var cur = result.curSelect;
		if (key === 40) {
			// down
			if (cur + 1 < result.childNodes.length) {
				if (result.childNodes[cur]) {
					result.childNodes[cur].style.background = '';
				}
				result.curSelect = cur + 1;
				result.childNodes[cur + 1].style.background = '#CAE1FF';
				// $(elementId).text(result.tipArr[cur + 1].name);
				document.getElementById(elementId).innerHTML = result.tipArr[cur + 1].name;
			}
		} else if (key === 38) {
			// up
			if (cur - 1 >= 0) {
				if (result.childNodes[cur]) {
					result.childNodes[cur].style.background = '';
				}
				result.curSelect = cur - 1;
				result.childNodes[cur - 1].style.background = '#CAE1FF';
				// $(elementId).text(result.tipArr[cur - 1].name);
				document.getElementById(elementId).innerHTML = result.tipArr[cur - 1].name;
			}
		} else if (key === 13) {
			var res = document.getElementById("result_list");
			if (res && res['curSelect'] !== -1) {
				selectResult(document.getElementById("result_list").curSelect);
			}
		} else {
			autoSearch();
		}
		$("#cleanNum").show();
		cleanFlag = "Y";
	}
	;

	/**
	 * TODO 鼠标浮起事件
	 * 
	 * @author Administrator
	 * @time 2015年11月14日23:14:26
	 */
	function keyup(even) {
		debugger;
		// 获得当前输入框的id
		event = event || window.event;
		var tar = event.srcElement || event.target;
		var elementId = tar ? tar.id : undefined;
		if (!elementId) {
			alert("请为该地址输入框赋预唯一ID");
			return;
		}
		Element_Id = elementId;
		// 键盘事件
		if (event.originalEvent) {
			event = event.originalEvent;
		}
		// 调用方法
		autoSearch(elementId);
	}
	;

	// 查询成功后包装DOM对象时的标签,如<span>/<list>
	var resLabel = "list";

	var windowsArr = [];
	var marker = [];
	var mapObj = new AMap.Map("mapContainer", {
		resizeEnable : true,
		view : new AMap.View2D({
			resizeEnable : true,
			// 地图中心点
			center : new AMap.LngLat(116.397428, 39.90923),
			// 地图显示的缩放级别
			zoom : 13
		}),
		keyboardEnable : false
	});

	/**
	 * TODO 输入提示
	 * 
	 * @author Admin
	 * @time 2015年11月14日13:01:52
	 * @param elementId 元素ID
	 * @param inputCity
	 *            用户输入的城市名称
	 * @param inputAddrInfo elementId
	 *            用户输入的具体（街道）地址
	 */
	function autoSearch(elementId, inputCity, inputAddrInfo) {
		debugger;
		// 城市参数
		var cityParam = document.getElementById("城市输入框ID");
		if (!cityParam) {
			cityParam = (inputCity && "" != inputCity) ? inputCity.substring(inputCity.indexOf(" "), inputCity.lastIndexOf(" ")) : "";
		} else {
			cityParam = cityParam.innerHTML;;
			cityParam = cityParam.substring(cityParam.indexOf(" "), cityParam.lastIndexOf(" "));
		}
		cityParam = $.trim(cityParam);
		// 具体地址参数
		var addrParam = document.getElementById(elementId ? elementId : Element_Id);
		if (!addrParam) {
			addrParam = (inputAddrInfo && "" != inputAddrInfo) ? inputAddrInfo : "";
		} else {
			addrParam = addrParam.value;;
		}
		// 加载输入提示插件
		var auto;
		AMap.service([ "AMap.Autocomplete" ], function() {
			var autoOptions = {
				// 城市，如为空，默认全国
				city : cityParam
			};
			auto = new AMap.Autocomplete(autoOptions);
			// 查询成功时返回查询结果
			if (addrParam && addrParam.length > 0) {
				debugger;
				auto.search(addrParam, function(status, result) {
					// 查询成功函数回调
					autocomplete_CallBack(result);
				});
			} else {
				debugger;
				document.getElementById("result_list").innerHTML = "";
				document.getElementById("result_list").style.display = "none";
			}
		});
	}
	;

	/**
	 * TODO 成功：输出输入提示结果的回调函数
	 * 
	 * @author Administrator
	 * @date 2015年11月14日13:08:17
	 * @param data
	 *            查询成功时返回的结果
	 */
	function autocomplete_CallBack(data) {
		debugger;
		var resultStr = "";
		var tipArr = data.tips;
		if (tipArr && tipArr.length > 0) {
			var mapAddr;
			for ( var i = 0; i < tipArr.length; i++) {
				mapAddr = tipArr[i];
				// alert(JSON.stringify(tipArr));
				// resultStr += "<li id='divid" + (i + 1) + "'
				// onmouseover='openMarkerTipById(" + (i + 1) + ",this)'
				// onclick='selectResult(" + i + ")'
				// onmouseout='onmouseout_MarkerStyle(" + (i + 1) + ",this)'
				// style=\"font-size: 13px;cursor:pointer;padding:5px 5px 5px
				// 5px;\"" + "data=" + tipArr[i].adcode + "," +
				// tipArr[i].location.lng + "," + tipArr[i].location.lat + ">" +
				// tipArr[i].name + "<span style='color:#C1C1C1;'>" +
				// tipArr[i].district + "</span></li>";
				resultStr += "<div ";
				resultStr += "id='divid" + (i + 1) + "' ";
				resultStr += "onmouseover='openMarkerTipById(" + (i + 1) + ",this)' ";
				resultStr += "onclick='selectResult(" + i + ")' ";
				resultStr += "onmouseout='onmouseout_MarkerStyle(" + (i + 1) + ",this)' ";
				resultStr += "style='font-size: 13px;cursor:pointer;padding:5px 5px 5px 5px;' ";
				// 待选择地址数据拼接（不显示）
				resultStr += "data=";
				resultStr += mapAddr.adcode + ",";
				resultStr += mapAddr.location.lng + ",";
				resultStr += mapAddr.location.lat;
				resultStr += ">";
				// 显示名称
				resultStr += mapAddr.name;
				// 暗色显示名称
				resultStr += "<span style='color:#C1C1C1;'>" + mapAddr.district + "</span>";
				resultStr += "</div>";
			}
		} else {
			resultStr = "";
		}
		document.getElementById("result_list").curSelect = -1;
		document.getElementById("result_list").tipArr = tipArr;
		document.getElementById("result_list").innerHTML = resultStr;
		document.getElementById("result_list").style.display = "block";
	}
	;

	// 输入提示框鼠标滑过时的样式
	function openMarkerTipById(pointid, thiss) {
		// 根据id打开搜索结果点tip
		thiss.style.background = '#CAE1FF';
	}
	;

	// 输入提示框鼠标移出时的样式
	function onmouseout_MarkerStyle(pointid, thiss) {
		// 鼠标移开后点样式恢复
		thiss.style.background = "";
	}
	;

	// 从输入提示框中选择关键字并查询
	function selectResult(index) {
		debugger;
		if (index < 0) {
			return;
		}
		if (navigator.userAgent.indexOf("MSIE") > 0) {
			document.getElementById(Element_Id).onpropertychange = null;
			document.getElementById(Element_Id).onfocus = focus_callback;
		}
		// 截取输入提示的关键字部分
		var selected = document.getElementById("divid" + (index + 1));
		var text = selected.innerHTML.replace(/<[^>].*?>.*<\/[^>].*?>/g, "");
		var dataParams = selected.getAttribute('data');
		dataParams = dataParams && "" != dataParams ? dataParams.split(",") : "";
		// var cityCode = selected.getAttribute('data');
		var cityCode = dataParams[0];
		var lng = dataParams[1];
		var lat = dataParams[2];
		// $(Element_Id).text(text);
		document.getElementById(Element_Id).innerHTML = text;
		/*
		 * $("#addrLng").text(lng).css("display", "none");
		 * $("#addrLat").text(lat).css("display", "none");
		 */
		var dom = "<span style='display:none;'><span id='addrLng'>" + lng + "</span><span id='addrLat'>" + lat + "</span></span>";
		$(Element_Id).after(dom);
		document.getElementById("result_list").style.display = "none";
		$("#cleanNum").show();
		// 根据选择的输入提示关键字查询
		mapObj.plugin([ "AMap.PlaceSearch" ], function() {
			var msearch = new AMap.PlaceSearch(); // 构造地点查询类
			// 查询成功时的回调函数
			AMap.event.addListener(msearch, "complete", placeSearch_CallBack); 
			msearch.setCity(cityCode);
			// 关键字查询查询
			msearch.search(text); 
		});
	}
	;

	// 定位选择输入提示关键字
	function focus_callback() {
		debugger;
		if (navigator.userAgent.indexOf("MSIE") > 0) {
			document.getElementById(Element_Id).onpropertychange = autoSearch;
		}
	}
	;

	// 输出关键字查询结果的回调函数
	function placeSearch_CallBack(data) {
		debugger;
		// 清空地图上的InfoWindow和Marker
		windowsArr = [];
		marker = [];
		mapObj.clearMap();
		var resultStr1 = "";
		var poiArr = data.poiList.pois;
		var resultCount = poiArr.length;
		for ( var i = 0; i < resultCount; i++) {
			// resultStr1 += "<li id='divid" + (i + 1) + "'
			// onmouseover='openMarkerTipById1(" + i + ",this)'
			// onmouseout='onmouseout_MarkerStyle(" + (i + 1) + ",this)'
			// style=\"font-size: 12px;cursor:pointer;padding:0px 0 4px 2px;
			// border-bottom:1px solid #C1FFC1;\"><table><tr><td><img
			// src=\"http://webapi.amap.com/images/" + (i + 1) + ".png\"></td>"
			// + "<td><h3><font color=\"#00a6ac\">名称: " + poiArr[i].name +
			// "</font></h3>";
			resultStr1 += "<li id='divid" + (i + 1) + "' ";
			resultStr1 += "onmouseover='openMarkerTipById1(" + i + ",this)' ";
			resultStr1 += "onmouseout='onmouseout_MarkerStyle(" + (i + 1) + ",this)' ";
			resultStr1 += "style=\"font-size: 12px;cursor:pointer;padding:0px 0 4px 2px; border-bottom:1px solid #C1FFC1;\">";
			resultStr1 += "<table><tr>";
			resultStr1 += "<td><img src=\"http://webapi.amap.com/images/" + (i + 1) + ".png\"></td>";
			resultStr1 += "<td>";
			resultStr1 += "<h3><font color=\"#00a6ac\">名称: " + poiArr[i].name + "</font></h3>";
			// ...infowindow显示内容
			resultStr1 += TipContents(poiArr[i].type, poiArr[i].address, poiArr[i].tel)
			resultStr1 += "</td>";
			resultStr1 += "</tr></table></li>";
			addmarker(i, poiArr[i]);
		}
		mapObj.setFitView();
	}
	;

	// 鼠标滑过查询结果改变背景样式，根据id打开信息窗体
	function openMarkerTipById1(pointid, thiss) {
		thiss.style.background = '#CAE1FF';
		windowsArr[pointid].open(mapObj, marker[pointid]);
	}
	;

	// 添加查询结果的marker&infowindow
	function addmarker(i, d) {
		debugger;
		var lngX = d.location.getLng();
		var latY = d.location.getLat();
		var markerOption = {
			map : mapObj,
			icon : "http://webapi.amap.com/images/" + (i + 1) + ".png",
			position : new AMap.LngLat(lngX, latY)
		};
		var mar = new AMap.Marker(markerOption);
		marker.push(new AMap.LngLat(lngX, latY));

		var infoWindow = new AMap.InfoWindow({
			content : "<h3><font color=\"#00a6ac\">  " + (i + 1) + ". " + d.name + "</font></h3>" + TipContents(d.type, d.address, d.tel),
			size : new AMap.Size(300, 0),
			autoMove : true,
			offset : new AMap.Pixel(0, -30)
		});
		windowsArr.push(infoWindow);
		var aa = function(e) {
			infoWindow.open(mapObj, mar.getPosition());
		};
		AMap.event.addListener(mar, "mouseover", aa);
	}
	;

	// infowindow显示内容
	function TipContents(type, address, tel) {
		debugger;
		// 窗体内容
		if (type == "" || type == "undefined" || type == null || type == " undefined" || typeof type == "undefined") {
			type = "暂无";
		}
		if (address == "" || address == "undefined" || address == null || address == " undefined" || typeof address == "undefined") {
			address = "暂无";
		}
		if (tel == "" || tel == "undefined" || tel == null || tel == " undefined" || typeof address == "tel") {
			tel = "暂无";
		}
		var str = "  地址：" + address + "<br />  电话：" + tel + " <br />  类型：" + type;
		return str;
	}
	;

	function checkTel(user_pno) {
		debugger;
		if (!/^(86|0086|12593|17951|17900|17901|17908|17909|17911|10193)?1[0-9]{10}$/.test(user_pno)// |0086|12593|17951|17900|17901|17908|17909|17911|10193
				&& !/^0[0-9]{2,3}-{1}[0-9]{7,8}$/.test(user_pno) && !/^0[0-9]{2,3}-{1}[0-9]{7,8}-[0-9]{1,5}$/.test(user_pno) && !/^400\d{7}$/.test(user_pno) && !/^852[569]\d{7}$/.test(user_pno) // 验证香港手机号
				&& !/^8536\d{7}$/.test(user_pno) // 验证澳门手机号 (6开头，8个数字)
				&& !/^88609\d{8}$/.test(user_pno) // 验证台湾手机号 (09开头，10个数字)
				&& !/^852[238]\d{7}$/.test(user_pno) // 验证香港座机号
				// (2,3,8开头，8个数字)
				&& !/^8532\d{7}$/.test(user_pno) // 验证澳门座机号
				&& !/^886[0-9]{6,7}$/.test(user_pno) // 验证台湾座机号
		// (0-9的数字，6位或者7位)
		) {
			$(".error")[0].style.display = "block";
			window.setTimeout(function() {
				$(".error")[0].style.display = "none";
			}, "2000");
			return false;
		} else {
			return true;
		}
	}
	;

});