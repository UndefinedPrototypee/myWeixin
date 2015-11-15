		var windowsArr = [];
		var marker = [];
        $("#project").onkeyup = keydown;
		function autoSearch() {
		    var projects = $("#project").val();
		    if ( projects.length > 0) {
			    //加载输入提示插件
			    $.ajax({
		      	  type : "POST",
		            url: "/service/address/data/getAddressDataByKey",
		            dataType: "json",
		            data: {
		              "keyword": projects  
		            },
		            success: function( data ) {
		            	autocomplete_CallBack(data);
		            },
		            error:function(XMLHttpRequest, textStatus, errorThrown){
		            	document.getElementById("result1").style.display = "none";
		    			alert("服务器连接失败");
		    		}
		          });
		    }else{
		    	document.getElementById("result1").innerHTML = "";
		    }
		}
		 
		//输出输入提示结果的回调函数
		function autocomplete_CallBack(data) {
			address_data = data;
		    var resultStr = "";
		    if (data&&data.length>0) {                 
		        for (var i = 0; i < data.length; i++) {
		            resultStr += "<div id='divid" + (i + 1) + "' onmouseover='openMarkerTipById(" + (i + 1)
		                        + ",this)' onclick='selectResult(" + i +")' onmouseout='onmouseout_MarkerStyle(" + (i + 1)
		                        + ",this)' style=\"font-size: 13px;cursor:pointer;padding:5px 5px 5px 5px;\"" + ">" + data[i].label + "<span style='color:#C1C1C1;'>"+"</span></div>";
		        }
		    }
		    else  {
		        resultStr = "";
		    }
		    document.getElementById("result1").curSelect = -1;
		    document.getElementById("result1").data = data;
		    document.getElementById("result1").innerHTML = resultStr;
		    document.getElementById("result1").style.display = "block";
		}
		
		//输入提示框鼠标滑过时的样式
		function openMarkerTipById(pointid, thiss) {  //根据id打开搜索结果点tip 
		    thiss.style.background = '#CAE1FF';
		}
		
		//输入提示框鼠标移出时的样式
		function onmouseout_MarkerStyle(pointid, thiss) {  //鼠标移开后点样式恢复 
		    thiss.style.background = "";
		}
		
		function keyUp(){
			autoSearch();
		}
		
		function keydown(event){
		    var key = (event||window.event).keyCode;
		    var result = document.getElementById("result1")
		    var cur = result.curSelect;
		    if(key===40){//down
		        if(cur + 1 < result.childNodes.length){
		            if(result.childNodes[cur]){
		                result.childNodes[cur].style.background='';
		            }
		            result.curSelect=cur+1;
		            result.childNodes[cur+1].style.background='#CAE1FF';
		            document.getElementById("project").value = result.data[cur+1].name;
		        }
		    }else if(key===38){//up
		        if(cur-1>=0){
		            if(result.childNodes[cur]){
		                result.childNodes[cur].style.background='';
		            }
		            result.curSelect=cur-1;
		            result.childNodes[cur-1].style.background='#CAE1FF';
		            document.getElementById("project").value = result.data[cur-1].name;
		        }
		    }else if(key === 13){
		        var res = document.getElementById("result1");
				if(res && res['curSelect'] !== -1){
					selectResult(document.getElementById("result1").curSelect);
				}
		    }else{
		        autoSearch();
		    }
		    $("#cleanNum").show();
		    cleanFlag="Y";
		}
