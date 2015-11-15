//#########################################地址定位代码 start #######################################

var address_data = {};

 address_data.hotcity = {};
 address_data.provice = {};
 address_data.city={};
 address_data.district={};

 address_data.tempprovice = {};
 address_data.tempcity={};
 address_data.tempdistrict={};


function getProviceAndHotCity(){
	var success = false;
	$.ajax({
		type : "GET",
		dataType : "json",
		url : "/service/address/data/province",
		success: function(json){
			//排序热点城市
			var temp = json.hotCityData;
			for(var i=0; i<temp.length-1; i++){
				for(var j=i+1; j<temp.length; j++){
					var n = "";
					if(temp[i].abb>temp[j].abb){
						n = temp[j];
						temp[j] = temp[i];
						temp[i] = n;
					}
				}
			}
		//	weixin_order_pram.hotCityData = temp;
			address_data.hotcity = temp;
			//排序
			var temp = json.provinceData;
			for(var i=0; i<temp.length-1; i++){
				for(var j=i+1; j<temp.length; j++){
					var n = "";
					if(temp[i].abb>temp[j].abb){
						n = temp[j];
						temp[j] = temp[i];
						temp[i] = n;
					}
				}
			}
		//	weixin_order_pram.provinceData = temp;
		    address_data.provice = temp;
		    
		    success = true;
			//设置热点城市和省
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			
			alert("服务器连接失败");
		}
	});	
	
	return success;
}
/**
 * 以下为html5代码,获取地理位置
 */
function getLocation() {
	
	//测试代码
	//showPosition("");
	//检查浏览器是否支持地理位置获取
	if (navigator.geolocation) {
		//若支持地理位置获取,成功调用showPosition(),失败调用showError
		tipsDialogOn("正在努力获取位置...");
		var config = {enableHighAccuracy:true,timeout:5000,maximumAge:30000};
		navigator.geolocation.getCurrentPosition(showPosition, showError,config);
	} else {
		//tipsDialog("Geolocation is not supported by this browser.");
		tipsDialog("定位失败,用户已禁用位置获取权限");
	}
}


/**
 * 获取地址位置失败[暂不处理]
 */
function showError(error) {
	switch (error.code) {
	case error.PERMISSION_DENIED:
		closeTipsDialogOn();
		tipsDialog("定位失败,用户拒绝请求地理定位");
		//x.innerHTML = "User denied the request for Geolocation.[用户拒绝请求地理定位]"
		break;
	case error.POSITION_UNAVAILABLE:
		closeTipsDialogOn();
		tipsDialog("定位失败,位置信息是不可用");
		//x.innerHTML = "Location information is unavailable.[位置信息是不可用]"
		break;
	case error.TIMEOUT:
		closeTipsDialogOn();
		tipsDialog("定位失败,请求获取用户位置超时");
		//x.innerHTML = "The request to get user location timed out.[请求获取用户位置超时]"
		break;
	case error.UNKNOWN_ERROR:
		closeTipsDialogOn();
		tipsDialog("定位失败,定位系统失效");
		//x.innerHTML = "An unknown error occurred.[未知错误]"
		break;
	}
}

/**
 * 获取地址位置成功
 */
function showPosition(position) {
	
	closeTipsDialogOn();
//	closeDialog();
	//获得经度纬度
	var x = position.coords.latitude;	//纬度
	var y = position.coords.longitude;	//经度
	
	translate(x,y);
	
//	getAddr(x,y);
	
	//测试
//	getAddr(31.21096,121.407942);
	
	
	
}

function translate(x,y){
	
	//http://apis.map.qq.com/ws/coord/v1/translate?locations=39.12,116.83;30.21,115.43&type=3&key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77
		
	var key=getKey();
	//http://apis.map.qq.com/ws/geocoder/v1/?location=31.21096,121.407942&key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&get_poi=0&coord_type=5
	var url = "http://apis.map.qq.com/ws/coord/v1/translate?locations="+x+","+y+
			"&type=1"+
			"&key="+key+
			"&output=jsonp";
	$.ajax({
		type : "GET",
		dataType : "jsonp",
		url : url,
		callback:"callback",
		success: function(json){
			if(json){
				if(json.status == "0"){
					var lng = json.locations[0].lng;//经度
					var lat = json.locations[0].lat;//纬度
					
					getAddr(lat,lng);
				}else{
					tipsDialog("[x:"+x+",y:"+y+"]转换坐标失败");
				}
			}else{
				tipsDialog("[x:"+x+",y:"+y+"]转换坐标失败");
			}
			
		
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			tipsDialog("[x:"+x+",y:"+y+"]转换坐标失败");
		}
	});
}


function getAddr(x,y){
	var key=getKey();
	//http://apis.map.qq.com/ws/geocoder/v1/?location=31.21096,121.407942&key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&get_poi=0&coord_type=5
	var url = "http://apis.map.qq.com/ws/geocoder/v1/?location="+x+","+y+
			"&key="+key+
			"&output=jsonp"+
			"&pois=0";
	//jsonp方式跨域调用
	/**
	 * 相应数据实例
		{"status":0,
		"result":{
			"location":{"lng":114.057868,"lat":22.543098999645},
			"formatted_address":"广东省深圳市福田区福华一路138",
			"business":"新洲,购物公园,香蜜湖",
			"addressComponent":{
				"city":"深圳市",
				"district":"福田区",
				"province":"广东省",
				"street":"福华一路",
				"street_number":"138"
			},
			"cityCode":340}
		}
	 */
	$.ajax({
		type : "GET",
		dataType : "jsonp",
		url : url,
		callback:"callback",
		success: function(json){
			if(json==null || typeof(json)=="undefined"){
				return;
			}
			if(json.status != "0"){
				return;
			}
			setAddress(json.result);
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			tipsDialog("[x:"+x+",y:"+y+"]地址位置获取失败,请手动选择地址");
		}
	});
}

/**
 * 设置地址
 */
function setAddress(jsonRes){
	


	
	var json = jsonRes.address_component;//地址部件，address不满足需求时可自行拼接
	//省
	var province = json.province;
	//市
	var city = json.city;
	//区
	var district = json.district;
	//详细地址
	
	var userAddress = "";//详细地址数据

//	var recommend = jsonRes.formatted_addresses.recommend;//经过腾讯地图优化过的描述方式，更具人性化特点
//	var landmark_l2 = ""; //二级地标，较一级地标更为精确，规模更小  精确到到具体的标志性建筑
	if(jsonRes.address_reference.landmark_l2){
		userAddress = jsonRes.address_reference.landmark_l2.title;//二级地标，较一级地标更为精确，规模更小  精确到到具体的标志性建筑
	}else{
		userAddress = json.street+json.street_number;//街道门牌号
	}
	


	//确定省
	var flag = "false";
	$(address_data.provice).each(function(){
		if(province.indexOf(this.name) != -1 || this.name.indexOf(province) != -1){
			//weixin_order_pram.temppr = {name:this.name,id:this.id};
			address_data.tempprovice = {name:this.name,id:this.id};
			flag = "true";
		}
	});
	$(address_data.hotcity).each(function(){
		if(province.indexOf(this.name) != -1 || this.name.indexOf(province) != -1){
		//	weixin_order_pram.temppr = {name:this.name,id:this.cityCode};
		 address_data.tempprovice = {name:this.name,id:this.cityCode};
			flag = "true";
		}
	});
	if(flag == "false"){
		tipsDialog("对不起该地址不在我们的配送范围,请手动选择地址");
		return;
	}
	//根据点击的省的id查询区,构造选择市页面
//	var parentId = weixin_order_pram.temppr.id+"/"+weixin_order_pram.temppr.name;
	var parentId = address_data.tempprovice.id+"/"+address_data.tempprovice.name;
	$.ajax({
		type : "GET",
		dataType : "json",
		data:{
			parentId: encodeURI(parentId)
		},
		url : "/service/address/data/city",
		contentType: 'application/x-www-form-urlencoded; charset=utf-8',
		success: function(json){
		//	weixin_order_pram.cityData = json.cityData;
			address_data.city = json.cityData;
			//确定市
			var flag = "false";
			$(address_data.city).each(function(){
				if(city.indexOf(this.name) != -1 || this.name.indexOf(city) != -1){
				//	weixin_order_pram.tempct = {name:this.name,id:this.id};
				address_data.tempcity = {name:this.name,id:this.id};
					flag = "true";
				}
			});
			if(flag == "false"){
				tipsDialog("对不起该地址不在我们的配送范围,请手动选择地址");
				return;
			}
			//根据点击的市的id查询区,构造选择区页面
	//		var parentId = weixin_order_pram.tempct.id+"/"+weixin_order_pram.tempct.name;
			var parentId = address_data.tempcity.id+"/"+address_data.tempcity.name;
			$.ajax({
				type : "GET",
				dataType : "json",
				data:{
					parentId: encodeURI(parentId)
				},
				url : "/service/address/data/area",
				contentType: 'application/x-www-form-urlencoded; charset=utf-8',
				success: function(json){
				//	weixin_order_pram.areaData = json.areaData;
					address_data.district = json.areaData;
					//确定区
					var flag = "false";
					$(address_data.district).each(function(){
						if(district.indexOf(this.name) != -1 || this.name.indexOf(district) != -1){
							//weixin_order_pram.temptw = {name:this.name,id:this.id};
							address_data.tempdistrict = {name:this.name,id:this.id};
							flag = "true";
						}
					});
					if(flag == "false"){
						tipsDialog("对不起该地址不在我们的配送范围,请手动选择地址");
						return;
					}
					
					//root页面地址显示改变
					var user_show = address_data.tempprovice.name + " " + address_data.tempcity.name + " " + address_data.tempdistrict.name;
					
					$("#user_show_all").text(user_show);
					$("#user_address").text(userAddress);
					
					weixin_order_temppr = address_data.tempprovice;//省 		
					weixin_order_tempct= address_data.tempcity;	//深圳市[必填]
					weixin_order_temptw = address_data.tempdistrict;//宝安区[必填]
					
					
					
				},
				error:function(XMLHttpRequest, textStatus, errorThrown){
				}
			});
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
		}
	});			
}
var keyArray = new Array();
keyArray[0]="U6CBZ-D322S-B6YOZ-6TJGB-QYJE7-AMBTV";
keyArray[1]="UXLBZ-ZROHU-ALPVO-4XPSP-EKGXK-3MFOD";
keyArray[2]="Y6SBZ-HHFAW-OXNR7-R4QTB-MZMW3-GKBQN";
keyArray[3]="PO7BZ-6ADAD-PEP4G-P4QRY-YAVV5-EKF2X";
keyArray[4]="42DBZ-H2Q2D-QM74R-PK7EE-ALFVE-2PFQN";
function getKey(){
	var a=Math.floor(Math.random()*5);
	try {
		var key = keyArray[a];
		if(key==""||key==null||key==undefined){
			key = keyArray[0];
		}
	}catch (e) {
		key = keyArray[0];
	}
	return key;
}

//####################################定位代码结束#######################

function getParameter(name){
    var paramStr=location.search; 
    if(paramStr.length==0)return null; 
    if(paramStr.charAt(0)!='?')return null; 
    paramStr=unescape(paramStr); 
    paramStr=paramStr.substring(1); 
    if(paramStr.length==0)return null; 
    var params=paramStr.split('&'); 
    var p = null;
    for(var i=0;i<params.length;i++){
       if(params[i].indexOf(name) >= 0){           
        p = params[i].split('=');
        p = p[1];         
       }
   }
   var groupName= decodeURI(p);
   return groupName;
}

function saveaddressInfo(){
	var user_name = $("#user_name").val(); //用户姓名
	if(!user_name || $.trim(user_name) == ""){
		remind();
		return;
    }
	if(containSpecial(user_name)){
		tips('姓名信息中不能包含特殊字符，请修改后再提交');
		return false;
	}
	if(user_name.length>10){
		tips('姓名长度不能超过10位');
		return false;
	}
    var user_pno = $("#user_pno").val(); //用户电话号码
    var lean = checkTel(user_pno);
    if(!lean){
    	return false;
    }
    var user_show_all = $("#user_show_all").text();
    if(!user_show_all || $.trim(user_show_all) == ""){
    	remind();
    	return false;
    }else{
    	var pr_name = weixin_order_temppr.name; //省名称
        if(!pr_name){
        	tips("请选择地址!");
        	return false;
        }
        var ct_name = weixin_order_tempct.name; //市名称
        if(!ct_name){
        	tips("请选择地址!");
        	return false;
        }
        var tw_name = weixin_order_temptw.name; //区名称
        if(!tw_name){
        	tips("请选择地址!");
        	return false;
        }
        var pr_id = weixin_order_temppr.id;	//省id
        if(!pr_id){
        	tips("请选择地址!");
        	return false;
        }
        var ct_id = weixin_order_tempct.id;	//市id
        if(!ct_id){
        	tips("请选择地址!");
        	return false;
        }
        var tw_id = weixin_order_temptw.id;	//区id
        if(!tw_id){
        	tips("请选择地址!");
        	return false;
        }
        var user_address = $("#user_address").text(); //用户详细地址
        if(!user_address || $.trim(user_address) == ""){
        	tips("请填写详细地址");
        	return false;
        }
        if(user_address.length>50){
        	tips("详细地址长度不能超过50位");
        	return false;
        }
        var mm = {};
    	mm.countryName ="中国";										//中国[写死]
    	mm.companyName="";
    	mm.postCode="";
    	mm.address = $("#user_address").text(); 					//西乡社区1234号[详细地址]
    	mm.addressType = $("#c_radio").attr("data-rdoval");  	//S寄件人地址,R收件人地址
    	mm.cityId = weixin_order_tempct.id;					//755[必填]
    	mm.cityName = weixin_order_tempct.name;				//深圳市[必填]
    	mm.countyId = weixin_order_temptw.id;					//宝安区[必填]
    	mm.countyName = weixin_order_temptw.name;				//宝安区[必填]
    	mm.phone  = "";										//[不知道是个啥反正没有填]	
    	mm.contractName = 	$("#user_name").val();					//孔为佳[必填]
    	if($.trim(weixin_order_temppr.addressId) == ""){
    		mm.addressId = "";
    	}else{
    		mm.addressId = weixin_order_temppr.addressId;
    	}
    	mm.isDefault = false;	//[必填,保持使用地址原样]
    	mm.mobile = $("#user_pno").val();						//15013553621[必填,手机号码]
    	mm.provinceId = weixin_order_temppr.id;				//440 [必填]
    	mm.provinceName = weixin_order_temppr.name;			//广东 [必填]
    	mm.groupName = $("#user_grouptemp").val();			//同学 同事
    	if(mm.groupName=="NULL"){
    		mm.groupId="NULL";
    	}
    	getAddrJson(mm);
    }
    
    function getAddrJson(mm){
    	$.ajax({
    		type : "POST",
    		data : mm,
    		dataType : "json",
    		url : "/service/addrbook/userAddress/saveNew",
    		success: function(date){
    			if(date.status == "0"){
    				var mess="";
    				if(date.message!=null){
    					mess=",原因："+date.message;
    				}
    				tips("保存地址薄信息失败"+mess);
    				return;
    			}else{
    				saveAddr("保存成功");
    			}
    		},
    		error:function(XMLHttpRequest, textStatus, errorThrown){
    		}
    	});
    }

}