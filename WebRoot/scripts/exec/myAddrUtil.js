/** ****�ҵĵ�ַ��JS***** */
define([ 'jquery', 'amaps' ], function($, MAP) {

	return {
		
		// ҳ����غ�ִ�еķ���
		running : function() {

			// ��갴��
			$("#addrInput").keydown(function(event) {
				debugger;
				// ������갴�·���
				keydown(event);
			});

			// ��긡��
			$("#addrInput").keyup(function(event) {
				debugger;
				// ������긡����
				keyup(event);
			});
		}
	};

	$("#addrInput").onkeyup = keydown;

	// ��ַ������ǩID
	var Element_Id = "";
	
	/**
	 * TODO ��갴���¼�
	 * 
	 * @author Administrator
	 * @time 2015��11��14��23:13:44
	 * @param event
	 *            ������¼�
	 */
	function keydown(event) {
		debugger;
		// ��õ�ǰ������id
		event = event || window.event;
		var tar = event.srcElement || event.target;
		var elementId = tar ? tar.id : undefined;
		if (!elementId) {
			alert("��Ϊ�õ�ַ�����ԤΨһID");
			return;
		}
		Element_Id = elementId;
		// �����¼�
		if (event.originalEvent) {
			event = event.originalEvent;
		}
		// ִ�з���
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
	 * TODO ��긡���¼�
	 * 
	 * @author Administrator
	 * @time 2015��11��14��23:14:26
	 */
	function keyup(even) {
		debugger;
		// ��õ�ǰ������id
		event = event || window.event;
		var tar = event.srcElement || event.target;
		var elementId = tar ? tar.id : undefined;
		if (!elementId) {
			alert("��Ϊ�õ�ַ�����ԤΨһID");
			return;
		}
		Element_Id = elementId;
		// �����¼�
		if (event.originalEvent) {
			event = event.originalEvent;
		}
		// ���÷���
		autoSearch(elementId);
	}
	;

	// ��ѯ�ɹ����װDOM����ʱ�ı�ǩ,��<span>/<list>
	var resLabel = "list";

	var windowsArr = [];
	var marker = [];
	var mapObj = new AMap.Map("mapContainer", {
		resizeEnable : true,
		view : new AMap.View2D({
			resizeEnable : true,
			// ��ͼ���ĵ�
			center : new AMap.LngLat(116.397428, 39.90923),
			// ��ͼ��ʾ�����ż���
			zoom : 13
		}),
		keyboardEnable : false
	});

	/**
	 * TODO ������ʾ
	 * 
	 * @author Admin
	 * @time 2015��11��14��13:01:52
	 * @param elementId Ԫ��ID
	 * @param inputCity
	 *            �û�����ĳ�������
	 * @param inputAddrInfo elementId
	 *            �û�����ľ��壨�ֵ�����ַ
	 */
	function autoSearch(elementId, inputCity, inputAddrInfo) {
		debugger;
		// ���в���
		var cityParam = document.getElementById("���������ID");
		if (!cityParam) {
			cityParam = (inputCity && "" != inputCity) ? inputCity.substring(inputCity.indexOf(" "), inputCity.lastIndexOf(" ")) : "";
		} else {
			cityParam = cityParam.innerHTML;;
			cityParam = cityParam.substring(cityParam.indexOf(" "), cityParam.lastIndexOf(" "));
		}
		cityParam = $.trim(cityParam);
		// �����ַ����
		var addrParam = document.getElementById(elementId ? elementId : Element_Id);
		if (!addrParam) {
			addrParam = (inputAddrInfo && "" != inputAddrInfo) ? inputAddrInfo : "";
		} else {
			addrParam = addrParam.value;;
		}
		// ����������ʾ���
		var auto;
		AMap.service([ "AMap.Autocomplete" ], function() {
			var autoOptions = {
				// ���У���Ϊ�գ�Ĭ��ȫ��
				city : cityParam
			};
			auto = new AMap.Autocomplete(autoOptions);
			// ��ѯ�ɹ�ʱ���ز�ѯ���
			if (addrParam && addrParam.length > 0) {
				debugger;
				auto.search(addrParam, function(status, result) {
					// ��ѯ�ɹ������ص�
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
	 * TODO �ɹ������������ʾ����Ļص�����
	 * 
	 * @author Administrator
	 * @date 2015��11��14��13:08:17
	 * @param data
	 *            ��ѯ�ɹ�ʱ���صĽ��
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
				// ��ѡ���ַ����ƴ�ӣ�����ʾ��
				resultStr += "data=";
				resultStr += mapAddr.adcode + ",";
				resultStr += mapAddr.location.lng + ",";
				resultStr += mapAddr.location.lat;
				resultStr += ">";
				// ��ʾ����
				resultStr += mapAddr.name;
				// ��ɫ��ʾ����
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

	// ������ʾ����껬��ʱ����ʽ
	function openMarkerTipById(pointid, thiss) {
		// ����id�����������tip
		thiss.style.background = '#CAE1FF';
	}
	;

	// ������ʾ������Ƴ�ʱ����ʽ
	function onmouseout_MarkerStyle(pointid, thiss) {
		// ����ƿ������ʽ�ָ�
		thiss.style.background = "";
	}
	;

	// ��������ʾ����ѡ��ؼ��ֲ���ѯ
	function selectResult(index) {
		debugger;
		if (index < 0) {
			return;
		}
		if (navigator.userAgent.indexOf("MSIE") > 0) {
			document.getElementById(Element_Id).onpropertychange = null;
			document.getElementById(Element_Id).onfocus = focus_callback;
		}
		// ��ȡ������ʾ�Ĺؼ��ֲ���
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
		// ����ѡ���������ʾ�ؼ��ֲ�ѯ
		mapObj.plugin([ "AMap.PlaceSearch" ], function() {
			var msearch = new AMap.PlaceSearch(); // ����ص��ѯ��
			// ��ѯ�ɹ�ʱ�Ļص�����
			AMap.event.addListener(msearch, "complete", placeSearch_CallBack); 
			msearch.setCity(cityCode);
			// �ؼ��ֲ�ѯ��ѯ
			msearch.search(text); 
		});
	}
	;

	// ��λѡ��������ʾ�ؼ���
	function focus_callback() {
		debugger;
		if (navigator.userAgent.indexOf("MSIE") > 0) {
			document.getElementById(Element_Id).onpropertychange = autoSearch;
		}
	}
	;

	// ����ؼ��ֲ�ѯ����Ļص�����
	function placeSearch_CallBack(data) {
		debugger;
		// ��յ�ͼ�ϵ�InfoWindow��Marker
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
			// + "<td><h3><font color=\"#00a6ac\">����: " + poiArr[i].name +
			// "</font></h3>";
			resultStr1 += "<li id='divid" + (i + 1) + "' ";
			resultStr1 += "onmouseover='openMarkerTipById1(" + i + ",this)' ";
			resultStr1 += "onmouseout='onmouseout_MarkerStyle(" + (i + 1) + ",this)' ";
			resultStr1 += "style=\"font-size: 12px;cursor:pointer;padding:0px 0 4px 2px; border-bottom:1px solid #C1FFC1;\">";
			resultStr1 += "<table><tr>";
			resultStr1 += "<td><img src=\"http://webapi.amap.com/images/" + (i + 1) + ".png\"></td>";
			resultStr1 += "<td>";
			resultStr1 += "<h3><font color=\"#00a6ac\">����: " + poiArr[i].name + "</font></h3>";
			// ...infowindow��ʾ����
			resultStr1 += TipContents(poiArr[i].type, poiArr[i].address, poiArr[i].tel)
			resultStr1 += "</td>";
			resultStr1 += "</tr></table></li>";
			addmarker(i, poiArr[i]);
		}
		mapObj.setFitView();
	}
	;

	// ��껬����ѯ����ı䱳����ʽ������id����Ϣ����
	function openMarkerTipById1(pointid, thiss) {
		thiss.style.background = '#CAE1FF';
		windowsArr[pointid].open(mapObj, marker[pointid]);
	}
	;

	// ��Ӳ�ѯ�����marker&infowindow
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

	// infowindow��ʾ����
	function TipContents(type, address, tel) {
		debugger;
		// ��������
		if (type == "" || type == "undefined" || type == null || type == " undefined" || typeof type == "undefined") {
			type = "����";
		}
		if (address == "" || address == "undefined" || address == null || address == " undefined" || typeof address == "undefined") {
			address = "����";
		}
		if (tel == "" || tel == "undefined" || tel == null || tel == " undefined" || typeof address == "tel") {
			tel = "����";
		}
		var str = "  ��ַ��" + address + "<br />  �绰��" + tel + " <br />  ���ͣ�" + type;
		return str;
	}
	;

	function checkTel(user_pno) {
		debugger;
		if (!/^(86|0086|12593|17951|17900|17901|17908|17909|17911|10193)?1[0-9]{10}$/.test(user_pno)// |0086|12593|17951|17900|17901|17908|17909|17911|10193
				&& !/^0[0-9]{2,3}-{1}[0-9]{7,8}$/.test(user_pno) && !/^0[0-9]{2,3}-{1}[0-9]{7,8}-[0-9]{1,5}$/.test(user_pno) && !/^400\d{7}$/.test(user_pno) && !/^852[569]\d{7}$/.test(user_pno) // ��֤����ֻ���
				&& !/^8536\d{7}$/.test(user_pno) // ��֤�����ֻ��� (6��ͷ��8������)
				&& !/^88609\d{8}$/.test(user_pno) // ��̨֤���ֻ��� (09��ͷ��10������)
				&& !/^852[238]\d{7}$/.test(user_pno) // ��֤���������
				// (2,3,8��ͷ��8������)
				&& !/^8532\d{7}$/.test(user_pno) // ��֤����������
				&& !/^886[0-9]{6,7}$/.test(user_pno) // ��̨֤��������
		// (0-9�����֣�6λ����7λ)
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