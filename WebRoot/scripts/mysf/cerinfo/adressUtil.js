var windowsArr = [];
var marker = [];
var mapObj = new AMap.Map("mapContainer", {
	resizeEnable : true,
	view : new AMap.View2D({
		resizeEnable : true,
		center : new AMap.LngLat(116.397428, 39.90923),// 地图中心点
		zoom : 13
	// 地图显示的缩放级别
	}),
	keyboardEnable : false
});
$("#addrInput").onkeyup = addrInputKeydown;

// 输入提示
function autoSearch() {
	var city = $("#addrInput").val();
	var str = "";
	str = city.substring(city.indexOf(" "), city.lastIndexOf(" "));
	str = $.trim(str);
	var user_addresss = $("#addrInput").val();
	var auto;
	// 加载输入提示插件
	AMap.service([ "AMap.Autocomplete" ], function() {
		var autoOptions = {
			city : str
		// 城市，默认全国
		};
		auto = new AMap.Autocomplete(autoOptions);
		// 查询成功时返回查询结果
		if (user_addresss.length > 0) {
			auto.search(user_addresss, function(status, result) {
				autocomplete_CallBack(result);
			});
		} else {
			document.getElementById("result1").innerHTML = "";
			document.getElementById("result1").style.display = "none";
		}
	});
}

// 输出输入提示结果的回调函数
function autocomplete_CallBack(data) {
	var resultStr = "";
	var tipArr = data.tips;
	if (tipArr && tipArr.length > 0) {
		for (var i = 0; i < tipArr.length; i++) {
			// alert(JSON.stringify(tipArr));
			resultStr += "<li id='divid" + (i + 1) + "' onmouseover='openMarkerTipById(" + (i + 1) + ",this)' onclick='selectResult(" + i + ")' onmouseout='onmouseout_MarkerStyle(" + (i + 1) + ",this)' style=\"font-size: 13px;cursor:pointer;padding:5px 5px 5px 5px;\"" + "data=" + tipArr[i].adcode + "," + tipArr[i].location.lng + "," + tipArr[i].location.lat + ">" + tipArr[i].name + "<span style='color:#C1C1C1;'>" + tipArr[i].district + "</span></li>";
		}
	} else {
		resultStr = "";
	}
	document.getElementById("result1").curSelect = -1;
	document.getElementById("result1").tipArr = tipArr;
	document.getElementById("result1").innerHTML = resultStr;
	document.getElementById("result1").style.display = "block";
}

// 输入提示框鼠标滑过时的样式
function openMarkerTipById(pointid, thiss) { // 根据id打开搜索结果点tip
	thiss.style.background = '#CAE1FF';
}

// 输入提示框鼠标移出时的样式
function onmouseout_MarkerStyle(pointid, thiss) { // 鼠标移开后点样式恢复
	thiss.style.background = "";
}

// 从输入提示框中选择关键字并查询
function selectResult(index) {
	if (index < 0) {
		return;
	}
	if (navigator.userAgent.indexOf("MSIE") > 0) {
		document.getElementById("addrInput").onpropertychange = null;
		document.getElementById("addrInput").onfocus = focus_callback;
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
	$("#addrInput").text(text);
	/*$("#addrLng").text(lng).css("display", "none");
	$("#addrLat").text(lat).css("display", "none");*/
	var dom = "<span style='display:none;'><span id='addrLng'>" + lng + "</span><span id='addrLat'>" + lat + "</span></span>";
	$("#addrInput").after(dom);
	document.getElementById("result1").style.display = "none";
	$("#cleanNum").show();
	// 根据选择的输入提示关键字查询
	mapObj.plugin([ "AMap.PlaceSearch" ], function() {
		var msearch = new AMap.PlaceSearch(); // 构造地点查询类
		AMap.event.addListener(msearch, "complete", placeSearch_CallBack); // 查询成功时的回调函数
		msearch.setCity(cityCode);
		msearch.search(text); // 关键字查询查询
	});
	// $("#li")[0].style.display = "none";
}

// 定位选择输入提示关键字
function focus_callback() {
	if (navigator.userAgent.indexOf("MSIE") > 0) {
		document.getElementById("addrInput").onpropertychange = autoSearch;
	}
}

// 输出关键字查询结果的回调函数
function placeSearch_CallBack(data) {
	// 清空地图上的InfoWindow和Marker
	windowsArr = [];
	marker = [];
	mapObj.clearMap();
	var resultStr1 = "";
	var poiArr = data.poiList.pois;
	var resultCount = poiArr.length;
	for (var i = 0; i < resultCount; i++) {
		resultStr1 += "<li id='divid" + (i + 1) + "' onmouseover='openMarkerTipById1(" + i + ",this)' onmouseout='onmouseout_MarkerStyle(" + (i + 1) + ",this)' style=\"font-size: 12px;cursor:pointer;padding:0px 0 4px 2px; border-bottom:1px solid #C1FFC1;\"><table><tr><td><img src=\"http://webapi.amap.com/images/" + (i + 1) + ".png\"></td>" + "<td><h3><font color=\"#00a6ac\">名称: " + poiArr[i].name + "</font></h3>";
		resultStr1 += TipContents(poiArr[i].type, poiArr[i].address, poiArr[i].tel) + "</td></tr></table></li>";
		addmarker(i, poiArr[i]);
	}
	mapObj.setFitView();
}

// 鼠标滑过查询结果改变背景样式，根据id打开信息窗体
function openMarkerTipById1(pointid, thiss) {
	thiss.style.background = '#CAE1FF';
	windowsArr[pointid].open(mapObj, marker[pointid]);
}

// 添加查询结果的marker&infowindow
function addmarker(i, d) {
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

// infowindow显示内容
function TipContents(type, address, tel) { // 窗体内容
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

function addrInputKeyup() {
	// debugger;
	/*
	var addr = $("#addrInput").val();
	
	if (!addr || $.trim(addr) == "") {
		$("#li")[0].style.display = "none";
	} else {
		$("#li")[0].style.display = "block";
	}
	*/
	autoSearch();
}

function addrInputKeydown(event) {
	// debugger;
	autoSearch();
	var addr = $("#addrInput").val();
	/*
	if (!addr || $.trim(addr) == "") {
		$("#li")[0].style.display = "none";
	} else {
		$("#li")[0].style.display = "block";
	}
	*/
	var key = (event || window.event).keyCode;
	var result = document.getElementById("result1");
	var cur = result.curSelect;
	if (key === 40) {// down
		if (cur + 1 < result.childNodes.length) {
			if (result.childNodes[cur]) {
				result.childNodes[cur].style.background = '';
			}
			result.curSelect = cur + 1;
			result.childNodes[cur + 1].style.background = '#CAE1FF';
			$("#addrInput").text(result.tipArr[cur + 1].name);
		}
	} else if (key === 38) {// up
		if (cur - 1 >= 0) {
			if (result.childNodes[cur]) {
				result.childNodes[cur].style.background = '';
			}
			result.curSelect = cur - 1;
			result.childNodes[cur - 1].style.background = '#CAE1FF';
			$("#addrInput").text(result.tipArr[cur - 1].name);
		}
	} else if (key === 13) {
		var res = document.getElementById("result1");
		if (res && res['curSelect'] !== -1) {
			selectResult(document.getElementById("result1").curSelect);
		}
	} else {
		autoSearch();
	}
	$("#cleanNum").show();
	cleanFlag = "Y";
}

function checkTel(user_pno) {
	if (!/^(86|0086|12593|17951|17900|17901|17908|17909|17911|10193)?1[0-9]{10}$/.test(user_pno)// |0086|12593|17951|17900|17901|17908|17909|17911|10193
			&& !/^0[0-9]{2,3}-{1}[0-9]{7,8}$/.test(user_pno) && !/^0[0-9]{2,3}-{1}[0-9]{7,8}-[0-9]{1,5}$/.test(user_pno) && !/^400\d{7}$/.test(user_pno) && !/^852[569]\d{7}$/.test(user_pno) // 验证香港手机号
			&& !/^8536\d{7}$/.test(user_pno) 		// 验证澳门手机号 (6开头，8个数字)
			&& !/^88609\d{8}$/.test(user_pno)		// 验证台湾手机号 (09开头，10个数字)
			&& !/^852[238]\d{7}$/.test(user_pno) 	// 验证香港座机号 (2,3,8开头，8个数字)
			&& !/^8532\d{7}$/.test(user_pno)		// 验证澳门座机号
			&& !/^886[0-9]{6,7}$/.test(user_pno) 	// 验证台湾座机号 (0-9的数字，6位或者7位)
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
