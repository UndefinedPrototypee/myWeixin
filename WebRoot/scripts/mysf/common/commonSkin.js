$(document).ready(function(){

	if(!placeholderSupport()){   // �ж�������Ƿ�֧�� placeholder
		$('[placeholder]').focus(function() {
			var input = $(this);
			if (input.val() == input.attr('placeholder')) {
				input.val('');
				input.removeClass('placeholder');
			}
	}).blur(function() {
		var input = $(this);
		if (input.val() == '' || input.val() == input.attr('placeholder')) {
				input.addClass('placeholder');
				input.val(input.attr('placeholder'));
			}
		}).blur();
	};
});

function placeholderSupport() {
   return 'placeholder' in document.createElement('input');
}

//������ʾ
function dialog(content,htmlButton,type){		
		var html1 = "<div id='dialogmask'></div><div id='dialog' class='dialog-a'></div>";
		var html2 = "<div id='dialogmask'></div><div id='dialog' class='dialog-b'><h5>��ʾ��Ϣ</h5><div class='dialog-content'><div class='txt'></div><div class='action'></div></div></div>";
		var html = html1;
		if(type == 1){html = html2;}
		$("body").append(html);
		if(type != 1){
			$("#dialog").html(content);
		}else{
			$("#dialog").find(".txt").html(content);
			$("#dialog").find(".action").html(htmlButton);
		}
		
		var window_h = $(window).height();
		var window_w = $(window).width();
		var document_h = $(document).height();
		var h = (window_h - $("#dialog").height()) / 2;
		var w = (window_w - $("#dialog").width()) / 2;
		
		$(window).resize(function(){
			window_h = $(window).height();
			window_w = $(window).width();
			document_h = $(document).height();
			h = (window_h - $("#dialog").height()) / 2;
			w = (window_w - $("#dialog").width()) / 2;
			$("#dialog").css({"top":h,"left":w});
			$("#dialogmask").css({"width":window_w,"height":document_h});
			});
		var scrollTop = $(document).scrollTop();
		h = h + scrollTop;
		window_h = window_h + scrollTop;
		$("#dialog").css({"top":h,"left":w}).show();
		$("#dialogmask").css({"width":window_w,"height":document_h}).show();
		if(type != 1){
			$("#dialogmask").click(function() {
				closeDialog();
			});			
		}
		
	}
	
function closeDialog(){
	$("#dialog").remove();
	$("#dialogmask").remove();
}

function mem_confirm(_htmlTxt,_funcitonYes,_functionNo,_textYes,_textNo){
    var funcitonYes = _funcitonYes;
    var functionNo = _functionNo;
    window.mem_callback_yes = function(){
    	if(funcitonYes){
    		funcitonYes.call();
    	}
        closeDialog();
    };
    window.mem_callback_no = function(){
    	if(functionNo){
    		functionNo.call();
    	}
        closeDialog();
    };
    var htmlTxt = _htmlTxt;
    
    var textYes = "��";
    if(_textYes){
    	textYes = _textYes;
    }
    var textNo = "��";
    if(_textNo){
    	textNo = _textNo;
    }
    var htmlButton ="<a class='btn-action' onclick='mem_callback_yes();' href='javascript:void(0)'>"+textYes+"</a><a onclick='mem_callback_no();' class='btn-action ml20' href='javascript:void(0)'>"+textNo+"</a>";
    dialog(htmlTxt,htmlButton,1);
}

/**
 * �����˵���ʾ��
 * @param _htmlTxt
 * @param _funcitonYes
 * @param _textYes
 */
function mem_confirm2(_htmlTxt,_funcitonYes,_textYes){
    var funcitonYes = _funcitonYes;
    window.mem_callback_yes = function(){
    	if(funcitonYes){
    		funcitonYes.call();
    	}
        closeDialog();
    };
    var htmlTxt = _htmlTxt;
    
    var textYes = "ȷ��";
    if(_textYes){
    	textYes = _textYes;
    }
    var htmlButton ="<a class='btn-action' style='height:30px;' onclick='mem_callback_yes();' href='javascript:void(0)'>"+textYes+"</a>";
    dialog(htmlTxt,htmlButton,1);
}

/**
 * ����url�õ���Ӧ�Ĳ���
 */
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
   return p;
}

/**
 * ������
 */
var WX_INFOCODE = {
	200:"�ɹ�",
	201:"�������", 
	202:"�ֻ��Ÿ�ʽ����ȷ", 
	203:"�ֻ����Ѿ�����", 
	204:"�ύ���ֻ�����ͽ�����֤����ֻ����벻һ��",
	205:"��֤�벻��ȷ",
	206:"��֤�볬ʱ",
	207:"���ݿ����ʧ��",
	208:"΢���û��Ѱ�"
};

var WX_HKMINFOCODE = {
		200:"�ɹ�",
		201:"�����e�`", 
		202:"�֙C��ʽ�����_", 
		203:"�֙C̖�a�ѽ���", 
		204:"�ύ���֙C̖�a�c������C�a���֙C̖�a��һ��",
		205:"��C�a�����_",
		206:"��C�a���r",
		207:"��������ʧ��",
		208:"΢���Ñ��ѽ���"
};



/**
 * �����붨�� mousycoder
 */
var ErrorType = {
	OK:"�ɹ�",
	error500:"�������", 
	errorPhone:"�ֻ��Ÿ�ʽ����ȷ", 
	errorCode:"��֤�벻��ȷ",
	codeExpire:"��֤�볬ʱ"
};


/**
 * ΢����,��ֹ�����ظ��ύ.
 */
var wx_lock = {
		open:function(fname){
			if(wx_lock[fname+"_lock"] == "on"){
				return true;
			}else{
				wx_lock[fname+"_lock"] = "on";
				window.setTimeout(function(){
					wx_lock[fname+"_lock"] = "";
				},12000);
				return false;
			}
		},
		close:function(fname){
			wx_lock[fname+"_lock"] = "";
		}
};

/**
 * ��������չ
 * @param format
 * @returns
 */
Date.prototype.format = function (format) {
	var o = {
    	"M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S": this.getMilliseconds()
     };
     if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
     }
     for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
     }
     return format;
};

/**
 * String��չ��
 */
String.prototype.trim = function(){ 
	return this.replace(/(^\s*)|(\s*$)/g, ""); 
};



/**
 * ajaxͬ������
 * @param url
 * @param type
 * @param dataType
 * @param data
 * @param success
 * @param error
 */
function syncCallService(url, type, dataType, data, success, error) {
	$.ajax({
		url : url,
		type : type,
		dataType : dataType,
		data : data,
		async : false,
		cache : false,
		success : function(result) {
			success.call(this, result);
		},
		error : function(result) {
			if (error != null) {
				error.call(this, result);
			}
		}
	});
}

/**
 * String������
 */
var StringUtils = {};
StringUtils.tremNull =  function(str){
	if(str){
		return str;
	}else{
		return "";
	}
};
StringUtils.trim =  function(str){
};
StringUtils.len = function (s) {
	 var a = s.split("");
	 return a.length;
};
StringUtils.cutSting = function (s,len) {
	return s.substring(0,len);
};
/** ��֤�ֻ��� ---�� */   
function isMobel(value) {  
	if(/^13\d{9}$/g.test(value)||/^14\d{9}$/g.test(value)||(/^15\d{9}$/g.test(value))||  
		(/^18\d{9}$/g.test(value)) || (/^17\d{9}$/g.test(value))||(/^852[569]\d{7}$/g.test(value))||
		(/^8536\d{7}$/g.test(value))||(/^88609\d{8}$/g.test(value))||(/^852[238]\d{7}$/g.test(value))||
		(/^8532\d{7}$/g.test(value))||(/^886[0-9]{6,7}$/g.test(value))
		){
		return true;  
	}else{  
        return false;  
	}  
}

var car_common_data = {
		/***
		 * ��ʼ������
		 */
		init : function(){
			car_common_data.initCarBrand();
		},
		initCarBrand:function(){
			var deptName = $("#deptName").val();
			var url = "/service/weixin/getAreaList";
			if(null != deptName && deptName.length > 0){
				$.ajax({
					url : url + '?deptName='+encodeURI(encodeURI(deptName)),
					type : "POST",
					dataType : "json",
					async : false,
					success : car_common_data.getCarBrand,
					error : function(){
						alert('���ص����쳣');
					}
				});
			}else{
				$('#areaList').attr("class","error");
				$('#areaList').text("�����������������������!");
			}
		},
		/***
		 **���ؽ���ص�
		 */
		getCarBrand : function(data){
			var deptList = data.deptList;
			var option = "";
			var count =0;
			if(deptList){
				for ( var key in deptList) {
					count++;
					if(count % 4 == 0){
						option += "&nbsp;<input type='radio' name='deptCode' value='" + deptList[key].deptId + "'/>"+ deptList[key].deptName +"<br>";
					}else{
						option += "&nbsp;<input type='radio' name='deptCode' value='" + deptList[key].deptId + "'/>"+ deptList[key].deptName;
					}
				}
				$('#areaList').html(option);
				$('#areaList').attr("class","");
			}
		},
		initChannList:function(){
			var url = "/service/weixin/queryChannList";
			$.ajax({
				url : url,
				type : "POST",
				dataType : "json",
				async : true,
				success : car_common_data.getChannList,
				error : function(){
					alert('����������Ϣ�쳣');
				}
			});
		},
		/***
		 **���ؽ���ص�
		 */
		getChannList : function(data){
			var infoList = data.infoList;
			var option = "<option value='' >--��ѡ������--</option>";;
			if(infoList){
				for ( var key in infoList) {
					option += "<option value='" + infoList[key].code + "'>"+ infoList[key].chlName + "</option>";
				}
				$('#channelId').html(option).chosen();
				$('.chosen-results').height(200);
			}	
		}	
};
//��ȡ�ַ��� str���ַ���  ��changdu ��Ҫ��ȡ�ĳ���
function cutString(str,changdu){
		if(str.length > changdu){
			str=str.substring(0,changdu);
			return str;
		}else{
			return str;
		}
}

function tipsDialog(content){
	var $dialog = $('<div class="dialog-tips"></div>');
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
