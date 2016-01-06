/**************************************************************************************
* *******************************||||||||||||||||||||||||*************************** *
* *********************>>>>>>>>>>> 以下JS为公有JS，改动须请细心 <<<<<<<<<<<<<************** *
* *******************************||||||||||||||||||||||||*************************** *
**************************************************************************************/
/**
* TODO 页面加载完成事件
* @author sfit1108
*/
$(document).ready(function() {
// 初始化AK
baiduMap.initBMapApi();
// 初始化省、市、区数据
addrEdit.getHotAddrData();
addrEdit.getProviceAndHotCity();
});

/**
* TODO 避免污染全局，使用局部变量，声明引用百度地图相关JS自定义的父类变量
* @author sfit1108
*/
var baiduMap = {
// 顺丰百度地图2.0以上使用的 ak（由于 ： 该套API免费对外开放，您需先申请密钥（ak） ，1个ak支持10万次/天。），故而需要分时间段取用
sfBmapAK : "u7wFbffxOnpq4grMkogSZ3RM", // silgionbzh~silgionbzh@bd
// 存储当前位置相关信息
currPoi : {
lng : null, // 经度信息
lat : null, // 纬度信息
locateSuccess : false, // 定位当前位置是否成功（boolean : 默认为false,未成功定位）
locateCurrFlag : false // 是否为用户点击自定位按钮进行页面地址填充（boolean : 默认为false, 如值得为true时则将自动填充地址所有信息； 否则只能填充省、市、区地址值）
}
};

/**
* TODO 根据浏览器定位当前【百度定位方法】
* @info （注：此方法为回调方法，如需要在定位成功后使用则需要自己从新定义并传入方法名，定位成功后此方法只为下一方法传入经纬度值,且传入参数位置为第一位，第二位）
* @author sfit1108
* @param locatedSuccessfulFN 待浏览器定位成功后用户需要自己使用定位的经纬度进行自定义功能的方法
*/
baiduMap.locatedByBrowser = function(locatedSuccessfulFN) {
// 去除用户录入关键字产生的下拉提示列表
$("#result1~.selectResult").remove();
// 执行定位
var geolocation = new BMap.Geolocation();
geolocation.getCurrentPosition(function(r){
if (this.getStatus() == BMAP_STATUS_SUCCESS) {
var lng = r.point.lng;
var lat = r.point.lat;
// 存入地图对象中
baiduMap.currPoi.lng = lng;
baiduMap.currPoi.lat = lat;
baiduMap.currPoi.locateSuccess = true;

console.info('通过浏览器定位到您的位置：'+ lng +','+ lat);

// 用户点击定位按钮，则执行填充
if (baiduMap.currPoi.locateCurrFlag) {
baiduMap.conversePoi2Address(lng, lat);
}

if (locatedSuccessfulFN && typeof locatedSuccessfulFN == "function") {
locatedSuccessfulFN(lng, lat);
}

} else if(this.getStatus() == BMAP_STATUS_CITY_LIST) {
tipsDialog('获取到城市列表');
} else if(this.getStatus() == BMAP_STATUS_UNKNOWN_LOCATION) {
tipsDialog("定位失败,位置信息不可用");
} else if(this.getStatus() == BMAP_STATUS_UNKNOWN_ROUTE) {
tipsDialog("定位失败,导航结果不可用");
} else if(this.getStatus() == BMAP_STATUS_INVALID_KEY) {
tipsDialog("定位失败,非法密钥");
} else if(this.getStatus() == BMAP_STATUS_INVALID_REQUEST) {
tipsDialog("定位失败,用户拒绝请求地理定位");
} else if(this.getStatus() == BMAP_STATUS_PERMISSION_DENIED) {
tipsDialog("定位失败,用户已禁用位置获取权限");
} else if(this.getStatus() == BMAP_STATUS_SERVICE_UNAVAILABLE) {
tipsDialog("定位失败,服务不可用");
} else if(this.getStatus() == BMAP_STATUS_TIMEOUT) {
tipsDialog("定位失败,请求获取用户位置超时");
} else {
tipsDialog("定位失败,定位系统失效");
}
},{enableHighAccuracy: true});
};

/**
* TODO 原始浏览器定位方法 （注：此定位的坐标非百度坐标，需要转换成百度坐标）
* @author sfit1108
* 以下为html5代码,获取地理位置
*/
baiduMap.locatedByOrign = function() {
// 去除用户录入关键字产生的下拉提示列表
$("#result1~.selectResult").remove();
// 检查浏览器是否支持地理位置获取
if (navigator.geolocation) {
// 若支持地理位置获取,成功调用showPosition(),失败调用showError
tipsDialogOn("正在努力获取位置...");
var config = {
enableHighAccuracy : true,
timeout : 5000,
maximumAge : 30000
};
navigator.geolocation.getCurrentPosition(showPosition, showError, config);
} else {
tipsDialog("定位失败,用户已禁用位置获取权限");
}

/**
* TODO 获取地址位置失败[暂不处理]
* @author sfit1108
*/
function showError(error) {
switch (error.code) {
case error.PERMISSION_DENIED:
closeTipsDialogOn();
tipsDialog("定位失败,用户拒绝请求地理定位");
// x.innerHTML = "User denied the request for Geolocation.[用户拒绝请求地理定位]"
break;
case error.POSITION_UNAVAILABLE:
closeTipsDialogOn();
tipsDialog("定位失败,位置信息是不可用");
// x.innerHTML = "Location information is unavailable.[位置信息是不可用]"
break;
case error.TIMEOUT:
closeTipsDialogOn();
tipsDialog("定位失败,请求获取用户位置超时");
// x.innerHTML = "The request to get user location timed out.[请求获取用户位置超时]"
break;
case error.UNKNOWN_ERROR:
closeTipsDialogOn();
tipsDialog("定位失败,定位系统失效");
// x.innerHTML = "An unknown error occurred.[未知错误]"
break;
}
}

/**
* TODO 获取地址位置成功
* @author sfit1108
*/
function showPosition(position) {

closeTipsDialogOn();
// 获得经度纬度
var lng = position.coords.longitude; // 经度
var lat = position.coords.latitude; // 纬度

translatePos(lng, lat);
};

/**
* TODO 地址转换
* @author sfit1108
* @time 2015年12月14日 下午2:47:52
* @param lng
* @param lat
*/
function translatePos(lng, lat){
// http://api.map.baidu.com/geoconv/v1/?
var url = "http://api.map.baidu.com/geoconv/v1/"
+ "?coords=" + lng + "," + lat
+ "&ak=" + baiduMap.sfBmapAK
+ "&from=1"
+ "&to=5"
+ "&output=jsonp";
$.ajax({
type : "GET",
dataType : "jsonp",
cache: false,
url : url,
callback:"callback",
success: function(json){
if(json){
if(json.status == "0"){
// 得到转化后的经纬度
lng = json.result[0].x;//经度
lat = json.result[0].y;//纬度
// 将新的经纬度存储
baiduMap.currPoi.lng = lng;
baiduMap.currPoi.lat = lat;
// 将经纬度信息转化成具体地址
baiduMap.conversePoi2Address(lng, lat);
}else{
tipsDialog("[x:"+lng+",y:"+lat+"]转换坐标失败");
}
}else{
tipsDialog("[x:"+lng+",y:"+lat+"]转换坐标失败");
}
},
error:function(XMLHttpRequest, textStatus, errorThrown){
tipsDialog("[x:"+lng+",y:"+lat+"]转换坐标失败");
}
});
}
};

/**
* TODO 根据经纬度逆地址解析（将经纬度信息解析成为具体地址）
* @author sfit1108
* @param longitude 经度
* @param latitude 纬度
*/
baiduMap.conversePoi2Address = function(longitude, latitude) {

// 默认为深圳软件产业基地
longitude = longitude && '' != longitude ? longitude : 113.946764;
latitude = latitude && '' != latitude ? latitude : 22.530366;

var point = new BMap.Point(longitude, latitude);
var geoc = new BMap.Geocoder(); 
geoc.getLocation(point, function(rs){
rs = rs || "";
// 地址信息
var addComp = rs.addressComponents;
// 周围建筑物
var addInfo = addComp.street + addComp.streetNumber;
var addSurr = rs.surroundingPois && rs.surroundingPois[0] ? rs.surroundingPois[0].title: "";
// 如周围有建筑物则详细到建筑物，否则展示原信息
addInfo = (addSurr && "" != addSurr) && (addInfo + " " + addSurr) || addInfo;
console.info("~百度点:(" + longitude + "," + latitude + ") 转化为地址：" + addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addInfo);
// 定位成功，执行填充函数
addrEdit.fillAddr2Dom(addComp.province, addComp.city, addComp.district, addInfo);
});
};

/**
* TODO 地址关键字输入提示（选择下拉地址功能）
* 
* @author sfit1108
* @date 2015年12月8日9:38:38
* @param inputId 关键字input输入框的id
* @param searchRegion 搜索范围
* @param searchResultPanelId 关键字搜索结果待展示下拉框的id（此区域为隐藏）
*/
baiduMap.searchByKeyWord = function(inputId, searchResultPanelId, searchRegion) {

// 动态加载的下拉列表
$(".clearfix.selectResult").remove();
document.getElementById(searchResultPanelId).tipArr = "";

// 设置主要参数值
inputId = inputId && '' != inputId ? inputId : 'suggestId';
searchResultPanel = searchResultPanelId && '' != searchResultPanelId ? searchResultPanelId : 'searchResultPanel'; 


// 搜寻范围~Place Suggestion APIWeb服务API URL （以下参数为必须参数）
searchRegion = $.trim(searchRegion && "" != searchRegion ? searchRegion : "全国"); 
// 输入的关键字
var keyWord = $.trim( $("#" + inputId).val() );
if (!keyWord || '' == keyWord) {
$(".clearfix.selectResult").remove();
return;
}

var placeApiUrl = null;
var _index = -1;

var $useSuggestApi = false, $hotcity = address_data.hotcity, $province = address_data.provice;
// 检测关键字是否为热门城市或者省、市
var endKeyword = keyWord.charAt(keyWord.length - 1);
$useSuggestApi = endKeyword && (endKeyword == "省" || endKeyword == "市" || endKeyword == "区");
for(var i = 0; !$useSuggestApi && $hotcity && i < $hotcity.length; i++) {
$useSuggestApi = keyWord == $hotcity[i].name; 
}
// 检测关键字是否为省名称
for(var j = 0; !$useSuggestApi && $province && j < $province.length; j++) {
$useSuggestApi = keyWord == $province[j].name; 
}
if ($useSuggestApi) {
// 如果关键字是为省市区则调用原地址联想API
quoteSuggestionApi();
} else {

if ("全国" != searchRegion && "中国" != searchRegion) {
// 调用城市区域API（非下拉提示API）
baiduMap.quoteSuggestionApi = false;
placeApiUrl = "http://api.map.baidu.com/place/v2/search"
+ "?ak=" + baiduMap.sfBmapAK 
+ "&output=json"
+ "&region=" + encodeURIComponent(searchRegion)
+ "&q=" + encodeURIComponent(keyWord);
} else {
baiduMap.quoteSuggestionApi = false;
// 获得当前城市
if (baiduMap.currPoi.locateSuccess) {
var point = new BMap.Point(baiduMap.currPoi.lng, baiduMap.currPoi.lat);
var geoc = new BMap.Geocoder(); 
geoc.getLocation(point, function(rs){
// 定位成功，执行填充函数
var city = (rs || "") && (rs.addressComponents || "") && (rs.addressComponents.city ||"");
placeApiUrl = "http://api.map.baidu.com/place/v2/search"
+ "?ak=" + baiduMap.sfBmapAK 
+ "&output=json"
+ "&region=" + encodeURIComponent(city)
+ "&q=" + encodeURIComponent(keyWord);
execSearch();
});
} else {
// 定位成功，执行填充函数
var myCity = new BMap.LocalCity();
myCity.get(function(result) {
searchRegion = result.name;
placeApiUrl = "http://api.map.baidu.com/place/v2/search"
+ "?ak=" + baiduMap.sfBmapAK 
+ "&output=json"
+ "&region=" + encodeURIComponent(searchRegion)
+ "&q=" + encodeURIComponent(keyWord);
execSearch();
});
}
return;

/********************************于2015年12月25日15:20:55修改***************************/
quoteSuggestionApi();
/********************************于2015年12月25日15:20:55修改***************************/
}
}

// 使用下拉联想Api
function quoteSuggestionApi() {
// 调用下拉提示API
baiduMap.quoteSuggestionApi = true;
placeApiUrl = "http://api.map.baidu.com/place/v2/suggestion"
+ "?ak=" + baiduMap.sfBmapAK
+ "&output=json"
+ "&region=" + encodeURIComponent(searchRegion)
+ "&q=" + encodeURIComponent(keyWord);
// 以下参数为非必须参数,如用户未输入省、市、区则采用默认当前
if ((!searchRegion || "" == searchRegion || "全国" == searchRegion || "中国" == searchRegion) 
&& baiduMap.currPoi && baiduMap.currPoi.lng && baiduMap.currPoi.lat) {
// 传入location（纬度,经度）参数后，返回结果将以距离进行排序
placeApiUrl += "&location=" + baiduMap.currPoi.lat + "," + baiduMap.currPoi.lng;
}
};


// 执行
execSearch();
// 声明
function execSearch() {
// 必须jsonp方式跨域请求
$.ajax({
type : "GET",
dataType : "jsonp",
url : placeApiUrl,
cache: false,
callback:"callback",
success: function(json){
if(json==null || typeof(json)=="undefined"){
return;
}
if(json.status != "0"){
return;
}
// 查询成功，组装展示列表
addrEdit.packageSuggestRes(inputId, searchResultPanelId, json);
},
error:function(XMLHttpRequest, textStatus, errorThrown){
// 可能因为AK失效原因，则再一次请求
if (_index < 1 && XMLHttpRequest.readyState == 4 && XMLHttpRequest.state() == "rejected" && XMLHttpRequest.statusText == "success" && textStatus == "parsererror") {
// 执行
execSearch();
} else {
tipsDialog("地址位置解析失败,请手动填写地址");
}
}
});
_index ++;
};
};

/**
* TODO 此方法信赖百度地图API-JS，调用前请先引入百度地图JS
* @author sfit1108
* @date 2015年12月22日18:20:04
* @params searchArea 搜索范围
* @params keyword 搜索关键字
* @deprecated 暂未用
*/
baiduMap.localSearchByKeyWord = function(searchArea, keyword, successExeFN) {
searchArea = searchArea && "全国" != searchArea && "中国" != searchArea ? searchArea : "";

var localSearchOptions = {
// 检索完成后的回调函数。
onSearchComplete : function(localResult) {
if (local.getStatus() == BMAP_STATUS_SUCCESS) {
// 判断状态是否正确
var s = [];
for (var i = 0; i < localResult.getCurrentNumPois(); i++) {
s.push(localResult.getPoi(i).title + ", " + localResult.getPoi(i).address);
}
// 查询成功，组装展示列表
localResult.wr;
if (successExeFN && typeof successExeFN == "function") {
successExeFN();
}
}
},
// 设置每页容量，取值范围：1 - 100
pageCapacity : 10
}; 
var local;
if (!searchArea) {
var myCity = new BMap.LocalCity();
myCity.get(function(result) {
searchArea = result.name;
local = new BMap.LocalSearch(searchArea, localSearchOptions); 
local.search(keyword);
});
} else {
// 构造函数
local = new BMap.LocalSearch(searchArea, localSearchOptions); 
local.search(keyword);
}
};

/**
* TODO 随机获取百度地图AK
*/
baiduMap.getBmapAK = function() {

var bmapAkArray = new Array();
// bmapAkArray.push("u7wFbffxOnpq4grMkogSZ3RM"); // silgionbzh
bmapAkArray.push("gepZP8KkYwiUZYfLtifZUtAC"); // kai wei
bmapAkArray.push("wVGOjb06xegHQGn2VxpSXsKg"); // xiong feng
bmapAkArray.push("wKHQrbsNgHHwWXB8YQjRVK1v"); // vw8137@163.com
bmapAkArray.push("Gc8AHVvGMXubzcvVESYChL3a"); // vw8137
bmapAkArray.push("qG9gU3wjGzsuqLA8UHcT6vtC"); // z935240081
bmapAkArray.push("VVYN43I3P2DwiNA5wnydUeTY"); // 1
bmapAkArray.push("GAKS4fRBk0pZxLNmd7a4ixFb"); // 2
bmapAkArray.push("1sX3ljLB3ajHIhqQvDfoh6mp"); // 3
bmapAkArray.push("mLbWn2tvdLqIBiK1KlPj5MTc"); // 4
bmapAkArray.push("Tu1g2bL7LuPxDZvY8uVXZXCc"); // 5
bmapAkArray.push("UflZfReXF9Wnd6G2kmKXKswW"); // 6
bmapAkArray.push("D0rWKdXFDIFSpyHzPI8N4qHN"); // 7

var index = Math.floor(Math.random() * bmapAkArray.length);
try {
var akey = bmapAkArray[index];
if (akey == "" || akey == null || akey == undefined) {
akey = getAkError();
}
} catch (e) {
akey = getAkError();
}
return akey;

// 如若获取错误
function getAkError() {
// 获取当前小时 
var visitDate = new Date();
var visitTime =visitDate.getHours(); 
var akIndex = visitTime < 8 && 0 || visitTime < 9 && 1 || visitTime < 10 && 2 || visitTime < 11 && 3 
|| visitTime < 12 && 4 || visitTime < 14 && 5 || visitTime < 15 && 6 || visitTime < 16 && 7 
|| visitTime < 17 && 8 || visitTime < 18 && 9 || visitTime < 20 && 10 || 11;
return bmapAkArray[akIndex];
}
};

/**
* TODO 初始化百度地图参数（引入此JS即执行）
* 
* @author sfit1108
*/
baiduMap.initBMapApi = function() {
try {
// 查询是否已引用百度地图JS
BMap;
} catch (ReferenceError) {
function loadScript() {
var script = document.createElement("script");
// 此为v2.0版本的引用方式
script.src = "http://api.map.baidu.com/api?v=2.0&ak=" + baiduMap.sfBmapAK + "&callback=initialize";
document.body.appendChild(script);
}
window.onload = loadScript;
} finally {
// 执行页面浏览器定位
baiduMap.locatedByBrowser();
}
};


/***
* TODO 地址公共工具类
* @author sfit1108
*/
var addrCommonUtil = {
// 用于判断当前JS是哪一个页面引用的，即使用场景（如地址簿修改/新增/下单页/附近服务点页）
currPage : "",
testCurrPage : (document.getElementById("address-book-change") && "address-book-change")||
(document.getElementsByClassName("ser-nearby-page") && document.getElementsByClassName("ser-nearby-page").length > 0) && "ser-nearby-page" ||
(document.getElementById("free-login-addr") && "free-login-addr") ||
((iframeSourcePage = window.parent.location.pathname) || "") && 
(iframeSourcePage == "/weiwap/orderPlus/order.html") && "orderPlus" ||
(iframeSourcePage == "/weiwap/orderPlusFC/order_FC.html") && "orderPlusFC" ||
(iframeSourcePage == "/weiwap/orderPlusFwdzj/order_fwdzj.html") && "orderPlusFwdzj" ||
(iframeSourcePage == "/weiwap/orderPlusHHT/order_smj_HHT.html") && "orderPlusHHT" ||
(iframeSourcePage == "/weiwap/orderPlusmsj/order_msj.html") && "orderPlusmsj" ||
(iframeSourcePage == "/weiwap/orderPlusZDDY/order_ZDDY.html") && "orderPlusZDDY" ||
(iframeSourcePage == "/weiwap/orderPlusCCS/order_CCS.html") && "orderPlusCCS" || "",
myCurrPage : (document.getElementById("address-book-change") && "address-book-change")||
(document.getElementsByClassName("ser-nearby-page") && document.getElementsByClassName("ser-nearby-page").length > 0) && "ser-nearby-page" ||
(document.getElementById("free-login-addr") && "free-login-addr") ||
{
"/weiwap/orderPlus/order.html":"orderPlus",
"/weiwap/orderPlusFC/order_FC.html":"orderPlusFC",
"/weiwap/orderPlusFwdzj/order_fwdzj.html":"orderPlusFwdzj",
"/weiwap/orderPlusHHT/order_smj_HHT.html":"orderPlusHHT",
"/weiwap/orderPlusmsj/order_msj.html":"orderPlusmsj",
"/weiwap/orderPlusZDDY/order_ZDDY.html":"orderPlusZDDY",
"/weiwap/orderPlusCCS/order_CCS.html":"orderPlusCCS"
}[window.parent.location.pathname],
// 如 currPage = "order-plus-addr" 为下单页时，用于判断具体是哪一种类型的下单页,引用页面即执行
orderPage : function() {
/*
* TODO 下单1:售派员上门 orderPlus / order.html （引用:/weiwap/orderAddressPlus/newAddress.html）
* TODO 下单2: orderPlusFC / order_FC.html （引用:/weiwap/orderAddressPlus/newAddress.html）
* TODO 下单3:服务点自寄 orderPlusFwdzj / order_fwdzj.html （引用:/weiwap/orderAddressPlus/newAddress.html）
* TODO 下单4: orderPlusHHT / order_smj_HHT.html（引用:/weiwap/orderAddressPlus/newAddress.html）
* TODO 下单5:码上寄 orderPlusmsj / order_msj.html （引用:/weiwap/orderAddressPlus/newAddress.html）
* TODO 下单6: orderPlusZDDY / order_ZDDY.html （引用:/weiwap/orderAddressPlus/newAddress.html）
* TODO 下单7: orderPlusCCS / order_CCS.html （引用:/weiwap/orderPlusCCS/newAddress.html）
*/
var iframeSourcePage = window.parent.location.pathname || "";
return {
orderPlus : iframeSourcePage == "/weiwap/orderPlus/order.html",
orderPlusFC : iframeSourcePage == "/weiwap/orderPlusFC/order_FC.html",
orderPlusFwdzj :iframeSourcePage == "/weiwap/orderPlusFwdzj/order_fwdzj.html",
orderPlusHHT : iframeSourcePage == "/weiwap/orderPlusHHT/order_smj_HHT.html",
orderPlusmsj : iframeSourcePage == "/weiwap/orderPlusmsj/order_msj.html",
orderPlusZDDY : iframeSourcePage == "/weiwap/orderPlusZDDY/order_ZDDY.html",
orderPlusCCS : iframeSourcePage == "/weiwap/orderPlusCCS/order_CCS.html"
};
}(), // 需要自运行
/**
* TODO （对关键字高亮显示）
* @author sfit1108
* @time 2015年12月12日 下午5:17:00
* @param suggestAddr 建议地址
* @param inputKeyWord 用户录入关键字
* @returns {String} 组装好的一个结果
*******************************************
*/
getAddrHtml : function(suggestAddr, inputKeyWord) {
var sp = suggestAddr.split("");
var sb = "";
var on = suggestAddr.indexOf(inputKeyWord);
var end = inputKeyWord.length;
for (var i = 0; i < sp.length; i++) {
if (on <= i && i < on + end - 1) {
continue;
}
if (i == on + end - 1) {
sp[i] = "<i class='blue'>" + inputKeyWord + "</i>";
}
sb += sp[i];
}
return sb;
}
};



/***************
* 页面功能JS代码块
***************/
var addrEdit = {};

/***
* TODO 声明：按输入关键字进行搜索
* @author sfit1108
*/
addrEdit.searchByKeyword = function() {
// 输入地址关键字提示下拉框
var searchRegion = $("#js_content_xzcs").text();
searchRegion = searchRegion.substring(searchRegion.indexOf(" "), searchRegion.lastIndexOf(" "));
searchRegion = $.trim(searchRegion);
baiduMap.searchByKeyWord('user_address', 'result1', searchRegion);
};

/**
* TODO 声明：定位当前位置后填充输入框详细地址
* @param prov 省（名称）
* @param city 市（名称）
* @param dist 区（名称）
* @param info 具体地址（名称，精确）
*/
addrEdit.fillAddr2Dom = function(prov, city, dist, info) {
// 填充地址
var currAddr = prov + " " + city + " " + dist;
$("#js_content_xzcs").text(currAddr);
if (baiduMap.currPoi.locateCurrFlag) {
$("#user_address").val(info);
}

if (prov.indexOf("省") != -1) {
prov = prov.substring(0, prov.indexOf("省"));
} else if (prov.indexOf("市") != -1) {
prov = prov.substring(0, prov.indexOf("市"));
}

//确定省
var flag = "false";
$(address_data.provice).each(function(){
if(prov.indexOf(this.name) != -1 || this.name.indexOf(prov) != -1){
address_data.tempprovice = {name:this.name,id:this.id};
flag = "true";
}
});
$(address_data.hotcity).each(function(){
if(prov.indexOf(this.name) != -1 || this.name.indexOf(prov) != -1){
address_data.tempprovice = {name:this.name,id:this.cityCode};
flag = "true";
}
});

if(flag == "false"){
// 如果用户有选择省、市、区
if ($("#js_content_xzcs").text()) {
$(address_data).each(function(index, ele) {
if (ele.label == prov) {
address_data.tempprovice = {name : ele.value.provinceName, id : ele.value.provinceId};
flag = "true";
}
});
} else {
tipsDialog("对不起该地址不在我们的配送范围,请手动选择地址");
return;
}
}

//根据点击的省的id查询区,构造选择市页面
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
address_data.city = json.cityData;
//确定市
var flag = "false";
$(address_data.city).each(function(){
if(city.indexOf(this.name) != -1 || this.name.indexOf(city) != -1){
address_data.tempcity = {name:this.name,id:this.id};
flag = "true";
}
});
if(flag == "false"){
tipsDialog("对不起该地址不在我们的配送范围,请手动选择地址");
return;
}

//根据点击的市的id查询区,构造选择区页面
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
address_data.district = json.areaData;
//确定区
var flag = "false";
$(address_data.district).each(function(){
if(dist.indexOf(this.name) != -1 || this.name.indexOf(dist) != -1){
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

$("#js_content_xzcs").text(user_show);
if (baiduMap.currPoi.locateCurrFlag) {
$("#user_address").val(info);
}
checkIsNull();
weixin_order_temppr = address_data.tempprovice;//省 
weixin_order_tempct= address_data.tempcity; //深圳市[必填]
weixin_order_temptw = address_data.tempdistrict;//宝安区[必填]
},
error:function(XMLHttpRequest, textStatus, errorThrown){
}
});
},
error:function(XMLHttpRequest, textStatus, errorThrown){
}
}); 
};

/**
* TODO 当关键字查询成功 后执行组装下拉结果集（UCMP样式）
* @param inputId 输入框的ID号
* @param resultDisplayId 提示下拉列表的ID
* @param callbackRes 查询回调成功后的结果
*/
addrEdit.packageSuggestRes = function(inputId, resultDisplayId, callbackRes) {
// 获得输入框的值,用于后续高亮显示
var inputKeyWord = document.getElementById(inputId).value;
inputKeyWord = inputKeyWord ? $.trim(inputKeyWord) : "";
var resultStr = "";
var resultStr2 = "";
var provCityDist = "";
var tipArr = null;
if (baiduMap && baiduMap.quoteSuggestionApi) {
tipArr = callbackRes ? callbackRes.result : "";
} else {
tipArr = callbackRes ? callbackRes.results : "";
provCityDist = $("#js_content_xzcs").text();
if (provCityDist && provCityDist.indexOf("区/镇") != -1) {
// 去掉“区/镇”字符
provCityDist = provCityDist.substring(0, provCityDist.indexOf("区/镇"));
}
}

if (tipArr && tipArr.length > 0) {
// 去掉某些结果集多余10条数据的
tipArr = tipArr.slice(0, 10);

if (baiduMap.quoteSuggestionApi) {
// 执行组装下拉列表 法一：无省提示信息
for (var i = 0; i < tipArr.length; i++) {
// 市区地址信息
var cityDist,
// 具体地址名称
addr = "";
if (baiduMap && baiduMap.quoteSuggestionApi) {
cityDist = (tipArr[i].city + tipArr[i].district) || "";
addr = tipArr[i].name || "";
} else {
cityDist = provCityDist || "";
if (tipArr[i].address) {
addr = tipArr[i].address || "";
if (cityDist.indexOf("区") < 0) {
// 返回的信息不含区
if (addr.indexOf("区") < 0 && addr.indexOf("市") > 0) {
cityDist += addr.substring(addr.indexOf("市") + 1, addr.indexOf("市") + 3) + "区";
} else {
cityDist += addr.substring(addr.indexOf("市") + 1, addr.indexOf("区") + 1);
}
}
}
addr += tipArr[i].name || "";
addr = addr.substring(addr.indexOf("省") + 1, addr.length);
}
if (addr && addr.indexOf(inputKeyWord) >= 0) {
// 刷选出高亮字符
var rs = addrCommonUtil.getAddrHtml(addr, inputKeyWord);
resultStr += "<li id='liId" + (i + 1) + "' class='clearfix selectResult' onclick='addrEdit.selectResult(" + i + ",\"" + inputId + "\",\"" + resultDisplayId + "\")'><dl class='associate'><dt>" + cityDist + "</dt><dd id='divid" + (i + 1) + "'>" + rs + "</dd></dl><span class='addr-name hide' style='display:none;'>" + tipArr[i].name + "</span><span class='addr-area hide' style='color:#C1C1C1; display:none;'>" + cityDist + "</span></li>";
} else {
resultStr2 += "<li id='liId" + (i + 1) + "' class='clearfix selectResult' onclick='addrEdit.selectResult(" + i + ",\"" + inputId + "\",\"" + resultDisplayId + "\")'><dl class='associate'><dt>" + cityDist + "</dt><dd id='divid" + (i + 1) + "'>" + tipArr[i].name + "</dd></dl><span class='addr-name hide' style='display:none;'>" + tipArr[i].name + "</span><span class='addr-area hide' style='color:#C1C1C1; display:none;'>" + cityDist + "</span></li>";
}
}
} else {
/** 同步迭代（递归循环）展示出省级,但影响效率
*/
var _times = 0;
convertSugPoi2Addr(inputId, resultDisplayId, tipArr);

function convertSugPoi2Addr(inputId, resultDisplayId, tipArr) {
// 具体地址名称
var addr = tipArr[_times].name || "", addrName = tipArr[_times].name || "", addrInfo = tipArr[_times].address || "";
// 市区地址信息
var cityDist = tipArr[_times].city + tipArr[_times].district;
// 由于缺少省名称，通过经纬度获得省信息
var lngX = tipArr[_times].location ? tipArr[_times].location.lng : "";
var latY = tipArr[_times].location ? tipArr[_times].location.lat : "";
var point = new BMap.Point(lngX, latY);
var geoc = new BMap.Geocoder(); 
geoc.getLocation(point, function(rs){
var addComp = rs.addressComponents || "";
// console.info("第:" + _times + " 次通过经纬度转化为地址：" + addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
// var provCityDist = (addComp.province || "") + " " + (addComp.city || "") + " " + (addComp.district || "");
var provCityDist = (addComp.province || "") + (addComp.city || "") + (addComp.district || "");
if (false && rs.surroundingPois[0] && rs.surroundingPois[0].title && rs.surroundingPois[0].title != "") {
addr = addComp.street + addComp.streetNumber + rs.surroundingPois[0].title;
} else {
// addr = addComp.street + addComp.streetNumber + addr;
if (!isNaN(addrInfo ? addrInfo.charAt(addrInfo.length - 1) : "notNum")) {
// 如果以数字结尾处理
// addrInfo += "铺";
}
addr = addrInfo/* + addr*/;
addr = addr.substring(addr.indexOf("区") + 1, addr.length);
}
if (addr.indexOf(inputKeyWord) >= 0) {
// 刷选出高亮字符
var rs = addrCommonUtil.getAddrHtml(addr, inputKeyWord);
resultStr += "<li id='liId" + (_times + 1) + "' class='clearfix selectResult' onclick='addrEdit.selectResult(" + _times + ",\"" + inputId + "\",\"" + resultDisplayId + "\")'><dl class='associate'><dt><b>" + addrName + "</b></dt><dd id='divid" + (_times + 1) + "'>" + provCityDist + rs + "</dd></dl></li>";
} else {
resultStr2 += "<li id='liId" + (_times + 1) + "' class='clearfix selectResult' onclick='addrEdit.selectResult(" + _times + ",\"" + inputId + "\",\"" + resultDisplayId + "\")'><dl class='associate'><dt><b>" + addrName + "</b></dt><dd id='divid" + (_times + 1) + "'>" + provCityDist + addr + "</dd></dl></li>";
}

_times++;
if (_times > tipArr.length - 1) {
// 动态加载的下拉列表,加载前先清除原有列表 
$(".clearfix.selectResult").remove();
document.getElementById(resultDisplayId).tipArr = tipArr;
$("#" + resultDisplayId).after(resultStr + resultStr2);
return;
}
convertSugPoi2Addr(inputId, resultDisplayId, tipArr);
});
}
}
} else {
resultStr = "";
resultStr2 = "";
}
// 如为SuggestionsApi须要执行
if (baiduMap.quoteSuggestionApi) {
document.getElementById(resultDisplayId).tipArr = tipArr;
$("#" + resultDisplayId).after(resultStr + resultStr2);
}
};

/**
* TODO 从输入提示框中选择关键字并查询
* @param index 下拉地址列表
* @param inputId 输入框ID号
* @param resultDisplayId 下拉结果展示ID号
*/
addrEdit.selectResult = function(index, inputId, resultDisplayId) {
if(index < 0){
return;
}
// 截取输入提示的关键字部分
var text = $("#divid" + (index + 1)).text().replace(/<[^>].*?>.*<\/[^>].*?>/g,"") || "";
// 去除显示的省市构
text = text.substring(text.indexOf("区", 0) + 1, text.length);
$("#" + inputId).val(text);
$("#cleanNum").show();
// 移除未选中的结果列表
$(".clearfix.selectResult").remove();

//根据经纬度进行逆地址查询
var tip = document.getElementById(resultDisplayId).tipArr[index];
var lng = tip.location.lng;
var lat = tip.location.lat;
document.getElementById(resultDisplayId).tipArr = "";
checkIsNull();

// 将选中的地址的经纬度信息追加到后面并且隐藏显示
if (addrCommonUtil.currPage == "ser-nearby-page") {
var dom = "<span style='display:none;'><span id='addrLng'>" + lng + "</span><span id='addrLat'>" + lat + "</span></span>";
$("#" + inputId).after(dom);
}

// 将选中的地址（经纬度）逆解析成详细地址,并执行填充
baiduMap.conversePoi2Address(lng, lat);
};





/**↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
* TODO 以下为拷贝代码（源:/web/src/main/webapp/js/weiwap/mysf/addrBook.js）
* 地址信息
*/
var address_data = {};

address_data.hotcity = {};
address_data.provice = {};
address_data.city={};
address_data.district={};

address_data.tempprovice = {};
address_data.tempcity={};
address_data.tempdistrict={};

/**
* 获取热门城市, 源:/web/src/main/webapp/js/weiwap/mysf/addrBook.js
*/
addrEdit.getHotAddrData = function (){
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

// 非附近服务点页面则进 
if ("ser-nearby-page" != addrCommonUtil.currPage) {
weixin_order_pram.hotCityData = temp;
}

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

// 非附近服务点页面则进 
if ("ser-nearby-page" != addrCommonUtil.currPage) {
weixin_order_pram.provinceData = temp;
//设置热点城市和省
div_display("hotCityData",weixin_order_pram.hotCityData);
div_display("provinceData",weixin_order_pram.provinceData);
}

$("li:contains(热门城市)").addClass("current");
}
}); 
};

/**
* 获取热门省与城市 , 源:/web/src/main/webapp/js/weiwap/mysf/addrBook.js
*/
addrEdit.getProviceAndHotCity = function (){
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
// weixin_order_pram.hotCityData = temp;
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
// weixin_order_pram.provinceData = temp;
address_data.provice = temp;

success = true;
//设置热点城市和省
},
error:function(XMLHttpRequest, textStatus, errorThrown){

tipsDialog("服务器连接失败");
}
}); 

return success;
};

function getAddrHtml(suggestAddr, inputKeyWord) {
var highlightAddr = addrCommonUtil.getAddrHtml(suggestAddr, inputKeyWord);
return highlightAddr;
}

/**
* TODO 源:/web/src/main/webapp/js/weiwap/mysf/addrBook.js
* @author sfit1108
* @time 2015年12月16日 下午10:03:27
*******************************************
*/
function checkIsNull(){
var name = $("#user_name").val();
var pno = $("#user_pno").val();
var city = $("#js_content_xzcs").text();
var address = $("#user_address").val();
if(name != "" && pno != "" && city != "请选择所在城市" && address != "请详细到门牌号"){
$("#submitId").removeClass().addClass("btn Right blue");
}else{
$("#submitId").removeClass().addClass("btn Right gray");
}
}

/**
* TODO 源:/web/src/main/webapp/js/weiwap/mysf/addrBook.js
* @author sfit1108
* @time 2015年12月16日 下午10:03:33
*******************************************
*/
function clearCityDiv(){
$("#areaData").empty();
$("#provinceData").empty();
$("#cityData").empty();
$("#cityData2").empty();
$("#hotCityData").empty();
$("#cityOpt").empty();
$("#prOpt").text("热门城市");
$("#cityOpt").text("北京");
getHotAddrData();
}

/**
* TODO 源：/weiwap/orderAddressPlus/addressVague.js
* @author sfit1108
* @time 2015年12月16日 下午10:02:26
* @param user_pno
* @returns {Boolean}
*******************************************
*/
function checkTel(user_pno){
if(!/^(86|0086|12593|17951|17900|17901|17908|17909|17911|10193)?1[0-9]{10}$/.test(user_pno)//|0086|12593|17951|17900|17901|17908|17909|17911|10193
&& !/^0[0-9]{2,3}-{1}[0-9]{7,8}$/.test(user_pno)
&& !/^0[0-9]{2,3}-{1}[0-9]{7,8}-[0-9]{1,5}$/.test(user_pno)
&& !/^400\d{7}$/.test(user_pno)
&& !/^852[569]\d{7}$/.test(user_pno) //验证香港手机号 (5、6、9开头，8个数字)
&& !/^8536\d{7}$/.test(user_pno) //验证澳门手机号 (6开头，8个数字)
&& !/^88609\d{8}$/.test(user_pno)//验证台湾手机号 (09开头，10个数字) 
&& !/^852[238]\d{7}$/.test(user_pno) //验证香港座机号 (2,3,8开头，8个数字) 
&& !/^8532\d{7}$/.test(user_pno)//验证澳门座机号 
&& !/^886[0-9]{6,7}$/.test(user_pno) //验证台湾座机号 (0-9的数字，6位或者7位)
){
$(".error")[0].style.display="block";
window.setTimeout(function(){
$(".error")[0].style.display="none";
},"2000");
return false;
}else{
return true;
}
}
/***↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑>>>>>>>> 拷贝结束 <<<<<<↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑**/




/***************************************************************************************************************************
* ********************************************~~~~~~~~~~~~~~~~~~~~~~~~*************************************************** *
* **********************************>>>>>>>>>>> 以上JS为公有JS，改动须请细心 <<<<<<<<<<<<<************************************** *
* ********************************************~~~~~~~~~~~~~~~~~~~~~~~~*************************************************** *
***************************************************************************************************************************/


















/***#############################################################
* TODO 地址簿页面--》编辑/新建地址簿 addrBook.html(addrBook-change.html)
* @author sfit1108
*############################################################**/
if (document.getElementById("address-book-change")) {
var currFramePage = addrCommonUtil.currPage;
// 当前页面为编辑/新建地址簿引用
addrCommonUtil.currPage = "address-book-change";
/**
* TODO 事件触发器1 ： 定位当前地址位置
*/
$("ul.newsAddress").on('click', '#locate-current', function() {
// 定位当前位置标识
baiduMap.currPoi.locateCurrFlag = true;
/**
* 测试专用
baiduMap.locatedByBrowser();
*/ 
baiduMap.locatedByOrign();
});

/**
* TODO 事件触发器3 ： 输入地址关键字（浮起）提示下拉框
*/
$("#result1").delegate('#user_address', 'keyup', function() {
// 定位当前位置标识
baiduMap.currPoi.locateCurrFlag = false;
addrEdit.searchByKeyword();
});
}




/*****########################################
* TODO 附近服务点页面
* @author sfit1108
*########################################****/
if (document.getElementsByClassName("ser-nearby-page") && document.getElementsByClassName("ser-nearby-page").length > 0) {
var currFramePage = addrCommonUtil.currPage;
// 当前页面为编辑/新建地址簿引用
addrCommonUtil.currPage = "ser-nearby-page";

/**
* TODO 事件触发器2 ： 输入地址关键字（按下）提示下拉框
*/
$("body").delegate('#addrInput', 'keydown', function() {
// 定位当前位置标识
baiduMap.currPoi.locateCurrFlag = false;
baiduMap.searchByKeyWord('addrInput', 'result1', '全国');
});
/**
* TODO 事件触发器3 ： 输入地址关键字（浮起）提示下拉框
*/
$("body").delegate('#addrInput', 'keyup', function() {
// 定位当前位置标识
baiduMap.currPoi.locateCurrFlag = false;
baiduMap.searchByKeyWord('addrInput', 'result1', '全国');
});
};




/*****########################################
* TODO 免登录下单:OrderPlusFreeLogin.html
* @author sfit1108
*########################################****/
if (document.getElementById("free-login-addr")) {
var currFramePage = addrCommonUtil.currPage;
// 当前页面为编辑/新建地址簿引用
addrCommonUtil.currPage = "free-login-addr";

// 定位
$("#autoLocation").click(function() {
baiduMap.currPoi.locateCurrFlag = true;
baiduMap.locatedByOrign();
});

// 输入提示
$("body").delegate("#user_address", "keyup", function() {
// 定位当前位置标识
baiduMap.currPoi.locateCurrFlag = false;
addrEdit.searchByKeyword();
});
}



/*****################################################################################################
* TODO 下单1:售派员上门 orderPlus / order.html （引用:/weiwap/orderAddressPlus/newAddress.html）
* TODO 下单2: orderPlusFC / order_FC.html （引用:/weiwap/orderAddressPlus/newAddress.html）
* TODO 下单3:服务点自寄 orderPlusFwdzj / order_fwdzj.html （引用:/weiwap/orderAddressPlus/newAddress.html）
* TODO 下单4: orderPlusHHT / order_smj_HHT.html（引用:/weiwap/orderAddressPlus/newAddress.html）
* TODO 下单5:码上寄 orderPlusmsj / order_msj.html （引用:/weiwap/orderAddressPlus/newAddress.html）
* TODO 下单6: orderPlusZDDY / order_ZDDY.html （引用:/weiwap/orderAddressPlus/newAddress.html）
* TODO 下单7:特殊（未使用） orderPlusCCS / order_CCS.html （引用:/weiwap/orderPlusCCS/newAddress.html） 
* @author sfit1108 （该页面的bodyId = order-plus-addr）
**################################################################################################**/
if (document.getElementById("order-plus-addr")) {

var currFramePage = addrCommonUtil.currPage;
// 当前页面为订单页面
addrCommonUtil.currPage = "order-plus-addr";
// 具体到哪一个下单页面
if (addrCommonUtil.orderPage.orderPlus) {
addrCommonUtil.currPage = "orderPlus";
} else if(addrCommonUtil.orderPage.orderPlusFC) {
addrCommonUtil.currPage = "orderPlusFC";
} else if(addrCommonUtil.orderPage.orderPlusFwdzj) {
addrCommonUtil.currPage = "orderPlusFwdzj";
} else if(addrCommonUtil.orderPage.orderPlusHHT) {
addrCommonUtil.currPage = "orderPlusHHT";
} else if(addrCommonUtil.orderPage.orderPlusmsj) {
addrCommonUtil.currPage = "orderPlusmsj";
} else if(addrCommonUtil.orderPage.orderPlusZDDY) {
addrCommonUtil.currPage = "orderPlusZDDY";
} else if(addrCommonUtil.orderPage.orderPlusCCS) {
// 这一个页面逻辑特殊，暂未使用此JS
addrCommonUtil.currPage = "orderPlusCCS";
} 

$("#autoLocation").click(function() {
// 自定位标识
baiduMap.currPoi.locateCurrFlag = true;

// 执行定位操作
baiduMap.locatedByOrign();
});

// 输入提示
$("body").delegate("#user_address", "keyup", function() {
// 定位当前位置标识
baiduMap.currPoi.locateCurrFlag = false;

// 执行关键字搜索操作
addrEdit.searchByKeyword();
});

}
