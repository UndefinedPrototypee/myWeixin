// yishu@live.cn 2015.08.06

$(document).ready(function () {

	order_submit_height();//�ײ��ύ��߶�
	
	$(".close").click(function (){//�ر����ֲ�
		order_layer_iframe_hide();
		order_layer_iframe_height();
		order_layer_iframe1_hide();
		order_layer_iframe3_hide();
		order_layer_iframe0_hide();
	});
	$("#js_content_bj").click(function (){//����
		$(".content_bj").show();
		order_layer_iframe0_show();
		order_layer_iframe0_height();
	});
	$("#js_content_cplx").click(function (){//��Ʒ����
		$(".content_cplx").show();
		order_layer_iframe0_show();
		order_layer_iframe0_height();
	});
	$("#jd_content_sxcp").click(function (){//��Ʒ����-���
		order_layer_iframe0_hide();
		$(".content_sxcp").show();
		order_layer_iframe0_show();
		order_layer_iframe0_height();
	});
	$("#js_content_fkfs").click(function (){//���ʽ
		$(".content_fkfs").show();
		order_layer_iframe0_show();
		order_layer_iframe0_height();
		//alert($(".content_fkfs_card_li ul li").outerHeight());
		$(".content_fkfs_card_li ul").css("max-height",5 * $(".content_fkfs_card_li ul li").outerHeight());//���õ�����"�½Ῠ"��������߶�
	});
	$("#js_content_gspyly").click(function (){//������Ա����
		$(".content_gspyly").show();
		order_layer_iframe_show();
		order_layer_iframe_height();
	});
	$("#js_content_jjfs").click(function (){//�ļ���ʽ
		$(".content_jjfs").show();
		order_layer_iframe0_show();
		order_layer_iframe0_height();
	});
	$("#js_content_wpmc").click(function (){//��Ʒ����
		$(".content_wpmc").show();
		order_layer_iframe0_show();
		order_layer_iframe0_height();
	});
	$("#js_content_wpzl , #js_content_wpzl_1").click(function (){//��Ʒ����
		order_layer_iframe0_hide();
		$(".content_wpzl").show();
		order_layer_iframe0_show();
		order_layer_iframe0_height();
	});
	$("#js_content_wptj").click(function (){//��Ʒ���
		order_layer_iframe0_hide();
		$(".content_wptj").show();
		order_layer_iframe0_show();
		order_layer_iframe0_height();
	});
	$("#js_content_jjdz").click(function (){//�ļ���ַ
		$(".content_jjdz").show();
		order_layer_iframe0_show();
		order_layer_iframe0_height();
		//alert($(".content_jjdz .overflow-y dl").outerHeight());
		//alert($(".content_jjdz .loadingMore").outerHeight(true));
		$(".content_jjdz .overflow-y").css("max-height",4 * $(".content_jjdz .overflow-y dl").outerHeight() + $(".content_jjdz .loadingMore").outerHeight(true));//���õ�����"�ļ���ַ"��������߶�
	});

	$("#js_content_yysm").click(function (){//ԤԼ����
		$(".content_yysm").show();
		order_layer_iframe_show();
		order_layer_iframe_height();
	});
	$("#jd_content_sxdspy").click(function (){//����Ϥ������Ա
		$(".content_sxdspy").show();
		order_layer_iframe_show();
		order_layer_iframe_height();
	});
	$("#js_content_tk").click(function (){//��Լ����
		$(".content_qytk").show();
		order_layer_iframe1_show();
		order_layer_iframe1_calculatePosition();//�������ֵ�����2λ��
	});
	$("#js_content_gd").click(function (){//����
		$(".content_gd").show();
		order_layer_iframe3_show();
		order_layer_iframe3_calculatePosition();//�������ֵ�����4λ��
	});
	$("#js_content_tools").click(function (){//�������߲˵�
		$(".content_gjx").show();
		order_layer_iframe3_show();
		order_layer_iframe3_calculatePosition();//�������ֵ�����4λ��
		$(this).hide();
		$(".order_layer_shade").addClass("opacity8");
	});
	$("#js_content_dzcf").click(function (){//��ַ�ظ�
		$("#content_dzcf").show();
		order_layer_iframe1_show();
		order_layer_iframe1_calculatePosition();
	});
	$("#js_content_lxspy").click(function (){//��ϵ����Ա
		$("#content_lxspy").show();
		order_layer_iframe1_show();
		order_layer_iframe1_calculatePosition();
	});
	$("#js_content_scjl").click(function (){//ɾ��ĳһ��ݼ�¼
		$("#content_scjl").show();
		order_layer_iframe1_show();
		order_layer_iframe1_calculatePosition();
	});
	$("#js_content_scdz").click(function (){//ɾ�������ַ
		$("#content_scdz").show();
		order_layer_iframe1_show();
		order_layer_iframe1_calculatePosition();
	});
	$("#js_content_scyjk").click(function (){//ɾ���½Ῠ
		$("#content_scyjk").show();
		order_layer_iframe1_show();
		order_layer_iframe1_calculatePosition();
	});
	$("#js_content_jcbd").click(function (){//����󶨵��ֻ���
		$("#content_jcbd").show();
		order_layer_iframe1_show();
		order_layer_iframe1_calculatePosition();
	});
	$("#js_content_share").click(function (){//�����ַ����
		$("#content_share").show();
		order_layer_iframe3_show();
		order_layer_iframe3_calculatePosition();
	});
	$("#js_content_jfjs").click(function (){//���ֽ���
		$(".content_jfjs").show();
		order_layer_iframe1_show();
		order_layer_iframe1_calculatePosition();//�������ֵ�����2λ��
	});
	$("#js_content_hb-sygz").click(function (){//���-ʹ�ù���
		$("#content_hb-sygz").show();
		order_layer_iframe1_show();
		order_layer_iframe1_calculatePosition();
	});
	$("#js_content_yhq-sygz").click(function (){//�Ż�ȯ-ʹ�ù���
		$("#content_yhq-sygz").show();
		order_layer_iframe1_show();
		order_layer_iframe1_calculatePosition();
	});
	$("#js_content_pzyq").click(function (){//����Ҫ��
		$("#content_pzyq").show();
		order_layer_iframe1_show();
		order_layer_iframe1_calculatePosition();
	});
	$("#js_content_fqts").click(function (){//����Ͷ��
		$("#content_fqts").show();
		order_layer_iframe1_show();
		order_layer_iframe1_calculatePosition();
	});
	$("#js_content_tslx").click(function (){//ѡ��Ͷ������
		$("#content_tslx").show();
		order_layer_iframe_show();
		order_layer_iframe_height();
	});
	$("#js_content_gpsj").click(function (){//��ѡ����ʱ��
		$("#content_gpsj").show();
		order_layer_iframe_show();
		order_layer_iframe_height();
	});

	//alert($(".width1 ul li+li").outerWidth(true));
	$(".width1 ul").css("width",($(".width1").find("li").length - 1) * $(".width1 ul li+li").outerWidth(true) + $(".width1 ul li").outerWidth(true)+1);//���õ����㡰ѡ������Ա�����
	$(".width2 ul").css("width",($(".width2").find("li").length - 1) * ($(".width2 ul li+li").outerWidth(true)) + $(".width2 ul li").outerWidth(true)+1);
	
	$(".addressClipboard h4").click(function(){//�½�����-��ַճ����
		$(".addressClipboard div").slideToggle("100",addressClipboard);
	});
	
	order_layer_iframe1_calculatePosition();//�������ֵ�����2λ��
	order_layer_iframe2_calculatePosition();//�������ֵ�����3λ��
	order_layer_iframe3_calculatePosition();//�������ֵ�����4λ��

	// yishu@live.cn 2015.08.18
	$(".order_success_content_printPosition dt.arrow").click(function(){//�µ��ɹ�-��ӡ
		$(".order_success_content_printPosition_list").slideToggle("100",printPosition);
	});
	
	// yishu@live.cn 2015.09.06
	//�������-ɸѡ������
	$(".expressManage_tools>li>.Left>h4>p").click(function (e) {
		//e.stopPropagation();
		$('.filtrate_popup').addClass("hide");
		$(".expressManage_tools>li>.Left>h4>p").removeClass("current");
		$(this).addClass("current");
		$(this).siblings('.filtrate_popup').removeClass("hide");
		$(".order_layer_shade").show().addClass("z_index");
	});
	$('.filtrate_popup').click(function (e) {
		//e.stopPropagation();
	});
	$(document).click(function (e) {
		if(!e){  
          var e = window.event;  
        }  
        //��ȡ�¼����Ԫ��  
        var targ = e.target;  
        //��ȡԪ������  
        var tname = targ.tagName; 
        //alert(tname);  
		//debugger
		if($(targ).is($(".expressManage_tools>li>.Left>h4>p"))==false && $(targ).is($('.filtrate_popup'))==false && $(targ).is($('.filtrate_popup').find("*"))==false){
			if($('.filtrate_popup').not(".hide").length>0){
				$('.filtrate_popup').addClass("hide");
				$(".expressManage_tools>li>.Left>h4>p").removeClass("current");
				$(".order_layer_shade").hide().removeClass("z_index");
			}
		}
	});
	
	li_number();//���ֲ�4-��ť����
	index_url2_number();//index_url2-��ť����
	$(".index_url3 ul").css("width",$(".index_url3 ul").find("li").length * ($(".index_url3 ul li").width()+10) + 10);//������ҳ���ͼ���
	gradeIcon_width();//����gradeIcon���

	$(".userInfo_menu h4").click(function(){//��ҳ-�ҵ�˳��-userInfo_menu
		$(".userInfo_menu .switch").slideToggle("100",userInfo_menu_switch);
		$(this).find("p").text(($(this).find("p").text() == "����")?"չ��":"����");
	});
	waybillQuery_tools_height();//ռλ��-�˵���ѯ����������

	// yishu@live.cn 2015.10.21
	$("#c_radio").click(function(){
		var radio_class = $(".radio-slide").attr("class");
		if( radio_class == "radio-slide"){
			$(".radio-slide").find(".circle").animate({left:1.9+"rem"},300,function(){$(this).parent().addClass("checked");});
		}else{
			$(".radio-slide").find(".circle").animate({left:-0.1+"rem"},300,function(){$(this).parent().removeClass("checked");});
		}
		//$(this).find(".circle").animate({left:-1},300,function(){$(this).parent().removeClass("checked");});
		//$(this).find(".circle").animate({left:19},300,function(){$(this).parent().addClass("checked");});
	
	});

});

function order_submit_height(){//ռλ��-�ײ��ύ��߶�
	var order_submit_height = $(".order_submit").height()+10;
	$(".order_bottom_placeholder").css("min-height",order_submit_height);
};
function order_layer_iframe_height(){//ռλ��-�ײ�������߶�
	var order_bottom_height = $(".order_layer_iframe").height()+10;
	$(".order_bottom_placeholder").css("height",order_bottom_height);
};
function order_layer_iframe_show(){//�ײ���������ʾ
		$(".order_layer_shade").show();
		$(".order_layer_iframe").css("height","");
};
function order_layer_iframe_hide(){//�ײ�����������
		$(".order_layer_shade").hide();
		$(".order_layer_iframe").css("height",0);
		$(".order_layer_iframe .container>div").hide();
};
function order_layer_iframe1_show(){//�ײ���������ʾ2
		$(".order_layer_shade").show();
		$(".order_layer_iframe1").show();
};
function order_layer_iframe1_hide(){//�ײ�����������2
		$(".order_layer_shade").hide();
		$(".order_layer_iframe1").hide();
		$(".order_layer_iframe1 .container>div").hide();
};
function order_layer_iframe3_show(){//�ײ���������ʾ4
		$(".order_layer_shade").show();
		$(".order_layer_iframe3").show();
		$(".order").addClass("blur");
};
function order_layer_iframe3_hide(){//�ײ�����������4
		$(".order_layer_shade").hide();
		$(".order_layer_iframe3").hide();
		$(".order_layer_iframe3 .container>div").hide();
		$(".order").removeClass("blur");
		$("#js_content_tools").show();
		$(".order_layer_shade").removeClass("opacity8");
};

function addressClipboard(){//�½�����-��ַճ����
	var h4_class = $(".addressClipboard h4 i").attr("class");
	if(h4_class == "icon"){
		$(".addressClipboard h4 i").attr("class", "icon current"); 
		$(".addressClipboard").find("textarea").focus();
	}else{
		$(".addressClipboard h4 i").attr("class", "icon"); 
		$(".addressClipboard").find("textarea").blur();
	}
};

//�������ֵ�����2λ��
function order_layer_iframe1_calculatePosition(){
	var layer_iframe_height = ($(".order_layer_iframe1").height())/2;
	var layer_iframe_width = ($(".order_layer_iframe1").width())/2;
	//alert(layer_iframe_height);
	$(".order_layer_iframe1").css({"margin-top":-layer_iframe_height,"margin-left":-layer_iframe_width});
}
//�������ֵ�����3λ��
function order_layer_iframe2_calculatePosition(){
	var layer_iframe_width = ($(".order_layer_iframe2").width()+50)/2;
	var layer_iframe_height = ($(".order_layer_iframe2").height()+50)/2;
	//alert(layer_iframe_height);
	$(".order_layer_iframe2").css({"margin-left":-layer_iframe_width,"margin-top":-layer_iframe_height,"left":"50%","top":"50%"});
}
//�������ֵ�����4λ��
function order_layer_iframe3_calculatePosition(){
	var layer_iframe_width = ($(".order_layer_iframe3").width())/2;
	var layer_iframe_height = ($(".order_layer_iframe3").height()+50)/2;
	//alert(layer_iframe_height);
	$(".order_layer_iframe3").css({"margin-left":-layer_iframe_width,"margin-top":-layer_iframe_height,"left":"50%","top":"50%"});
}

// yishu@live.cn 2015.08.18
function printPosition(){//�µ��ɹ�-��ӡ
	var dt_class = $(".order_success_content_printPosition dt").attr("class");
	if(dt_class == "arrow"){
		$(".order_success_content_printPosition dt").attr("class", "arrow current"); 
	}else{
		$(".order_success_content_printPosition dt").attr("class", "arrow"); 
	}
};

// yishu@live.cn 2015.09.09
function li_number(){//���ֲ�4-��ť����
	var li_number = $(".order_layer_iframe3 .content_gd ul").find("li").length;
	$(".content_gd").addClass("li_number_"+li_number);
};
// yishu@live.cn 2015.09.12
function index_url2_number(){//index_url2-��ť����
	var index_url2_number = $(".index_url2 ul").find("li").length;
	$(".index_url2 ul").addClass("index_url2_"+index_url2_number);
};
// yishu@live.cn 2015.09.13
function gradeIcon_width(){//igradeIcon���
	var gradeIcon_width = $(".userInfo_menu").width() * 0.75;
	$(".gradeIcon.current").css("width",gradeIcon_width);
};
function userInfo_menu_switch(){//��ҳ-�ҵ�˳��-userInfo_menu
	var h4_class = $(".userInfo_menu h4 i").attr("class");
	if(h4_class == "icon"){
		$(".userInfo_menu h4 i").attr("class", "icon current"); 
		$(".order_layer_shade").addClass("z_index").show();
	}else{
		$(".userInfo_menu h4 i").attr("class", "icon"); 
		$(".order_layer_shade").removeClass("z_index").hide();
	}
};
// yishu@live.cn 2015.09.16
function waybillQuery_tools_height(){//ռλ��-�˵���ѯ����������
	var waybillQuery_tools_height = $(".waybillQuery_tools").height()+1;
	$(".waybillQuery_tools_placeholder").css("height",waybillQuery_tools_height);
};

// yishu@live.cn 2015.10.19 �µ��Ż�
function order_layer_iframe0_height(){//ռλ��-�ײ�������߶�
	var order_bottom_height = $(".order_layer_iframe0").height()+10;
	$(".order_bottom_placeholder").css("height",order_bottom_height);
};
function order_layer_iframe0_show(){//�ײ���������ʾ
		$(".order_layer_shade").show();
		$(".order_layer_iframe0").css("height","");
};
function order_layer_iframe0_hide(){//�ײ�����������
		$(".order_layer_shade").hide();
		$(".order_layer_iframe0").css("height",0);
		$(".order_layer_iframe0 .container>div").hide();
};
// yishu@live.cn 2015.10.21 ����
function addressClipboard11(){//�ҵ�˳��-����
	var h4_class = $("#c_radio").attr("class");
	if(h4_class == "checked"){
		$("#c_radio").removeClass("checked");
	}else{
		$("#c_radio").addClass("checked");
	}
};
