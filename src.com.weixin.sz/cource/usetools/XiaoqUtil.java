package cource.usetools;

import java.util.Date;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import cource.message.resp.TextMessage;
import cource.util.MessageUtil;

public class XiaoqUtil {

	/** 
	 * xiaoqrobot的主菜单 
	 *  
	 * @return 
	 */  
	public static String getMainMenu() {  
	    StringBuffer buffer = new StringBuffer();  
	    buffer.append("您好，我是小q，请回复数字选择服务：").append("\n\n");  
	    buffer.append("1  天气预报").append("\n");  
	    buffer.append("2  公交查询").append("\n");  
	    buffer.append("3  周边搜索").append("\n");  
	    buffer.append("4  歌曲点播").append("\n");  
	    buffer.append("5  经典游戏").append("\n");  
	    buffer.append("6  美女电台").append("\n");  
	    buffer.append("7  人脸识别").append("\n");  
	    buffer.append("8  聊天唠嗑").append("\n\n");  
	    buffer.append("回复“?”显示此帮助菜单");  
	    return buffer.toString();  
	}  
	
	/** 
	 * 判断是否是QQ表情 
	 *  
	 * @param content 
	 * @return 
	 */  
	public static boolean isQqFace(String content) {  
	    boolean result = false;  
	  
	    // 判断QQ表情的正则表达式  
	    String qqfaceRegex = "/::\\)|/::~|/::B|/::\\||/:8-\\)|/::<|/::$|/::X|/::Z|/::'\\(|/::-\\||/::@|/::P|/::D|/::O|/::\\(|/::\\+|/:--b|/::Q|/::T|/:,@P|/:,@-D|/::d|/:,@o|/::g|/:\\|-\\)|/::!|/::L|/::>|/::,@|/:,@f|/::-S|/:\\?|/:,@x|/:,@@|/::8|/:,@!|/:!!!|/:xx|/:bye|/:wipe|/:dig|/:handclap|/:&-\\(|/:B-\\)|/:<@|/:@>|/::-O|/:>-\\||/:P-\\(|/::'\\||/:X-\\)|/::\\*|/:@x|/:8\\*|/:pd|/:<W>|/:beer|/:basketb|/:oo|/:coffee|/:eat|/:pig|/:rose|/:fade|/:showlove|/:heart|/:break|/:cake|/:li|/:bome|/:kn|/:footb|/:ladybug|/:shit|/:moon|/:sun|/:gift|/:hug|/:strong|/:weak|/:share|/:v|/:@\\)|/:jj|/:@@|/:bad|/:lvu|/:no|/:ok|/:love|/:<L>|/:jump|/:shake|/:<O>|/:circle|/:kotow|/:turn|/:skip|/:oY|/:#-0|/:hiphot|/:kiss|/:<&|/:&>";  
	    Pattern p = Pattern.compile(qqfaceRegex);  
	    Matcher m = p.matcher(content);  
	    if (m.matches()) {  
	        result = true;  
	    }  
	    return result;  
	}  
	
	public static boolean is() {
		// 文本消息  
		if (msgType.equals(MessageUtil.REQ_MESSAGE_TYPE_TEXT)) {  
		    // 文本消息内容  
		    String content = requestMap.get("Content");  
		      
		    // 判断用户发送的是否是单个QQ表情  
		    if(XiaoqUtil.isQqFace(content)) {  
		        // 回复文本消息  
		        TextMessage textMessage = new TextMessage();  
		        textMessage.setToUserName(fromUserName);  
		        textMessage.setFromUserName(toUserName);  
		        textMessage.setCreateTime(new Date().getTime());  
		        textMessage.setMsgType(MessageUtil.RESP_MESSAGE_TYPE_TEXT);  
		        textMessage.setFuncFlag(0);  
		        // 用户发什么QQ表情，就返回什么QQ表情  
		        textMessage.setContent(content);  
		          
		        // 将文本消息对象转换成xml字符串  
		        respMessage = MessageUtil.textMessageToXml(textMessage);  
		    }  
		} 
	}
}
