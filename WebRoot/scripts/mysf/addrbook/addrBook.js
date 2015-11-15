//#########################################��ַ��λ���� start #######################################

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
			//�����ȵ����
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
			//����
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
			//�����ȵ���к�ʡ
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			
			alert("����������ʧ��");
		}
	});	
	
	return success;
}
/**
 * ����Ϊhtml5����,��ȡ����λ��
 */
function getLocation() {
	
	//���Դ���
	//showPosition("");
	//���������Ƿ�֧�ֵ���λ�û�ȡ
	if (navigator.geolocation) {
		//��֧�ֵ���λ�û�ȡ,�ɹ�����showPosition(),ʧ�ܵ���showError
		tipsDialogOn("����Ŭ����ȡλ��...");
		var config = {enableHighAccuracy:true,timeout:5000,maximumAge:30000};
		navigator.geolocation.getCurrentPosition(showPosition, showError,config);
	} else {
		//tipsDialog("Geolocation is not supported by this browser.");
		tipsDialog("��λʧ��,�û��ѽ���λ�û�ȡȨ��");
	}
}


/**
 * ��ȡ��ַλ��ʧ��[�ݲ�����]
 */
function showError(error) {
	switch (error.code) {
	case error.PERMISSION_DENIED:
		closeTipsDialogOn();
		tipsDialog("��λʧ��,�û��ܾ��������λ");
		//x.innerHTML = "User denied the request for Geolocation.[�û��ܾ��������λ]"
		break;
	case error.POSITION_UNAVAILABLE:
		closeTipsDialogOn();
		tipsDialog("��λʧ��,λ����Ϣ�ǲ�����");
		//x.innerHTML = "Location information is unavailable.[λ����Ϣ�ǲ�����]"
		break;
	case error.TIMEOUT:
		closeTipsDialogOn();
		tipsDialog("��λʧ��,�����ȡ�û�λ�ó�ʱ");
		//x.innerHTML = "The request to get user location timed out.[�����ȡ�û�λ�ó�ʱ]"
		break;
	case error.UNKNOWN_ERROR:
		closeTipsDialogOn();
		tipsDialog("��λʧ��,��λϵͳʧЧ");
		//x.innerHTML = "An unknown error occurred.[δ֪����]"
		break;
	}
}

/**
 * ��ȡ��ַλ�óɹ�
 */
function showPosition(position) {
	
	closeTipsDialogOn();
//	closeDialog();
	//��þ���γ��
	var x = position.coords.latitude;	//γ��
	var y = position.coords.longitude;	//����
	
	translate(x,y);
	
//	getAddr(x,y);
	
	//����
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
					var lng = json.locations[0].lng;//����
					var lat = json.locations[0].lat;//γ��
					
					getAddr(lat,lng);
				}else{
					tipsDialog("[x:"+x+",y:"+y+"]ת������ʧ��");
				}
			}else{
				tipsDialog("[x:"+x+",y:"+y+"]ת������ʧ��");
			}
			
		
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			tipsDialog("[x:"+x+",y:"+y+"]ת������ʧ��");
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
	//jsonp��ʽ�������
	/**
	 * ��Ӧ����ʵ��
		{"status":0,
		"result":{
			"location":{"lng":114.057868,"lat":22.543098999645},
			"formatted_address":"�㶫ʡ�����и���������һ·138",
			"business":"����,���﹫԰,���ۺ�",
			"addressComponent":{
				"city":"������",
				"district":"������",
				"province":"�㶫ʡ",
				"street":"����һ·",
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
			tipsDialog("[x:"+x+",y:"+y+"]��ַλ�û�ȡʧ��,���ֶ�ѡ���ַ");
		}
	});
}

/**
 * ���õ�ַ
 */
function setAddress(jsonRes){
	


	
	var json = jsonRes.address_component;//��ַ������address����������ʱ������ƴ��
	//ʡ
	var province = json.province;
	//��
	var city = json.city;
	//��
	var district = json.district;
	//��ϸ��ַ
	
	var userAddress = "";//��ϸ��ַ����

//	var recommend = jsonRes.formatted_addresses.recommend;//������Ѷ��ͼ�Ż�����������ʽ���������Ի��ص�
//	var landmark_l2 = ""; //�����ر꣬��һ���ر��Ϊ��ȷ����ģ��С  ��ȷ��������ı�־�Խ���
	if(jsonRes.address_reference.landmark_l2){
		userAddress = jsonRes.address_reference.landmark_l2.title;//�����ر꣬��һ���ر��Ϊ��ȷ����ģ��С  ��ȷ��������ı�־�Խ���
	}else{
		userAddress = json.street+json.street_number;//�ֵ����ƺ�
	}
	


	//ȷ��ʡ
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
		tipsDialog("�Բ���õ�ַ�������ǵ����ͷ�Χ,���ֶ�ѡ���ַ");
		return;
	}
	//���ݵ����ʡ��id��ѯ��,����ѡ����ҳ��
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
			//ȷ����
			var flag = "false";
			$(address_data.city).each(function(){
				if(city.indexOf(this.name) != -1 || this.name.indexOf(city) != -1){
				//	weixin_order_pram.tempct = {name:this.name,id:this.id};
				address_data.tempcity = {name:this.name,id:this.id};
					flag = "true";
				}
			});
			if(flag == "false"){
				tipsDialog("�Բ���õ�ַ�������ǵ����ͷ�Χ,���ֶ�ѡ���ַ");
				return;
			}
			//���ݵ�����е�id��ѯ��,����ѡ����ҳ��
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
					//ȷ����
					var flag = "false";
					$(address_data.district).each(function(){
						if(district.indexOf(this.name) != -1 || this.name.indexOf(district) != -1){
							//weixin_order_pram.temptw = {name:this.name,id:this.id};
							address_data.tempdistrict = {name:this.name,id:this.id};
							flag = "true";
						}
					});
					if(flag == "false"){
						tipsDialog("�Բ���õ�ַ�������ǵ����ͷ�Χ,���ֶ�ѡ���ַ");
						return;
					}
					
					//rootҳ���ַ��ʾ�ı�
					var user_show = address_data.tempprovice.name + " " + address_data.tempcity.name + " " + address_data.tempdistrict.name;
					
					$("#user_show_all").text(user_show);
					$("#user_address").text(userAddress);
					
					weixin_order_temppr = address_data.tempprovice;//ʡ 		
					weixin_order_tempct= address_data.tempcity;	//������[����]
					weixin_order_temptw = address_data.tempdistrict;//������[����]
					
					
					
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

//####################################��λ�������#######################

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
	var user_name = $("#user_name").val(); //�û�����
	if(!user_name || $.trim(user_name) == ""){
		remind();
		return;
    }
	if(containSpecial(user_name)){
		tips('������Ϣ�в��ܰ��������ַ������޸ĺ����ύ');
		return false;
	}
	if(user_name.length>10){
		tips('�������Ȳ��ܳ���10λ');
		return false;
	}
    var user_pno = $("#user_pno").val(); //�û��绰����
    var lean = checkTel(user_pno);
    if(!lean){
    	return false;
    }
    var user_show_all = $("#user_show_all").text();
    if(!user_show_all || $.trim(user_show_all) == ""){
    	remind();
    	return false;
    }else{
    	var pr_name = weixin_order_temppr.name; //ʡ����
        if(!pr_name){
        	tips("��ѡ���ַ!");
        	return false;
        }
        var ct_name = weixin_order_tempct.name; //������
        if(!ct_name){
        	tips("��ѡ���ַ!");
        	return false;
        }
        var tw_name = weixin_order_temptw.name; //������
        if(!tw_name){
        	tips("��ѡ���ַ!");
        	return false;
        }
        var pr_id = weixin_order_temppr.id;	//ʡid
        if(!pr_id){
        	tips("��ѡ���ַ!");
        	return false;
        }
        var ct_id = weixin_order_tempct.id;	//��id
        if(!ct_id){
        	tips("��ѡ���ַ!");
        	return false;
        }
        var tw_id = weixin_order_temptw.id;	//��id
        if(!tw_id){
        	tips("��ѡ���ַ!");
        	return false;
        }
        var user_address = $("#user_address").text(); //�û���ϸ��ַ
        if(!user_address || $.trim(user_address) == ""){
        	tips("����д��ϸ��ַ");
        	return false;
        }
        if(user_address.length>50){
        	tips("��ϸ��ַ���Ȳ��ܳ���50λ");
        	return false;
        }
        var mm = {};
    	mm.countryName ="�й�";										//�й�[д��]
    	mm.companyName="";
    	mm.postCode="";
    	mm.address = $("#user_address").text(); 					//��������1234��[��ϸ��ַ]
    	mm.addressType = $("#c_radio").attr("data-rdoval");  	//S�ļ��˵�ַ,R�ռ��˵�ַ
    	mm.cityId = weixin_order_tempct.id;					//755[����]
    	mm.cityName = weixin_order_tempct.name;				//������[����]
    	mm.countyId = weixin_order_temptw.id;					//������[����]
    	mm.countyName = weixin_order_temptw.name;				//������[����]
    	mm.phone  = "";										//[��֪���Ǹ�ɶ����û����]	
    	mm.contractName = 	$("#user_name").val();					//��Ϊ��[����]
    	if($.trim(weixin_order_temppr.addressId) == ""){
    		mm.addressId = "";
    	}else{
    		mm.addressId = weixin_order_temppr.addressId;
    	}
    	mm.isDefault = false;	//[����,����ʹ�õ�ַԭ��]
    	mm.mobile = $("#user_pno").val();						//15013553621[����,�ֻ�����]
    	mm.provinceId = weixin_order_temppr.id;				//440 [����]
    	mm.provinceName = weixin_order_temppr.name;			//�㶫 [����]
    	mm.groupName = $("#user_grouptemp").val();			//ͬѧ ͬ��
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
    					mess=",ԭ��"+date.message;
    				}
    				tips("�����ַ����Ϣʧ��"+mess);
    				return;
    			}else{
    				saveAddr("����ɹ�");
    			}
    		},
    		error:function(XMLHttpRequest, textStatus, errorThrown){
    		}
    	});
    }

}