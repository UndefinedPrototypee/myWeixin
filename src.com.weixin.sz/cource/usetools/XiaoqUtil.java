package cource.usetools;

import java.util.Date;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import cource.message.resp.TextMessage;
import cource.util.MessageUtil;

public class XiaoqUtil {

	/** 
	 * xiaoqrobot�����˵� 
	 *  
	 * @return 
	 */  
	public static String getMainMenu() {  
	    StringBuffer buffer = new StringBuffer();  
	    buffer.append("���ã�����Сq����ظ�����ѡ�����").append("\n\n");  
	    buffer.append("1  ����Ԥ��").append("\n");  
	    buffer.append("2  ������ѯ").append("\n");  
	    buffer.append("3  �ܱ�����").append("\n");  
	    buffer.append("4  �����㲥").append("\n");  
	    buffer.append("5  ������Ϸ").append("\n");  
	    buffer.append("6  ��Ů��̨").append("\n");  
	    buffer.append("7  ����ʶ��").append("\n");  
	    buffer.append("8  �������").append("\n\n");  
	    buffer.append("�ظ���?����ʾ�˰����˵�");  
	    return buffer.toString();  
	}  
	
	/** 
	 * �ж��Ƿ���QQ���� 
	 *  
	 * @param content 
	 * @return 
	 */  
	public static boolean isQqFace(String content) {  
	    boolean result = false;  
	  
	    // �ж�QQ�����������ʽ  
	    String qqfaceRegex = "/::\\)|/::~|/::B|/::\\||/:8-\\)|/::<|/::$|/::X|/::Z|/::'\\(|/::-\\||/::@|/::P|/::D|/::O|/::\\(|/::\\+|/:--b|/::Q|/::T|/:,@P|/:,@-D|/::d|/:,@o|/::g|/:\\|-\\)|/::!|/::L|/::>|/::,@|/:,@f|/::-S|/:\\?|/:,@x|/:,@@|/::8|/:,@!|/:!!!|/:xx|/:bye|/:wipe|/:dig|/:handclap|/:&-\\(|/:B-\\)|/:<@|/:@>|/::-O|/:>-\\||/:P-\\(|/::'\\||/:X-\\)|/::\\*|/:@x|/:8\\*|/:pd|/:<W>|/:beer|/:basketb|/:oo|/:coffee|/:eat|/:pig|/:rose|/:fade|/:showlove|/:heart|/:break|/:cake|/:li|/:bome|/:kn|/:footb|/:ladybug|/:shit|/:moon|/:sun|/:gift|/:hug|/:strong|/:weak|/:share|/:v|/:@\\)|/:jj|/:@@|/:bad|/:lvu|/:no|/:ok|/:love|/:<L>|/:jump|/:shake|/:<O>|/:circle|/:kotow|/:turn|/:skip|/:oY|/:#-0|/:hiphot|/:kiss|/:<&|/:&>";  
	    Pattern p = Pattern.compile(qqfaceRegex);  
	    Matcher m = p.matcher(content);  
	    if (m.matches()) {  
	        result = true;  
	    }  
	    return result;  
	}  
	
	public static boolean is() {
		// �ı���Ϣ  
		if (msgType.equals(MessageUtil.REQ_MESSAGE_TYPE_TEXT)) {  
		    // �ı���Ϣ����  
		    String content = requestMap.get("Content");  
		      
		    // �ж��û����͵��Ƿ��ǵ���QQ����  
		    if(XiaoqUtil.isQqFace(content)) {  
		        // �ظ��ı���Ϣ  
		        TextMessage textMessage = new TextMessage();  
		        textMessage.setToUserName(fromUserName);  
		        textMessage.setFromUserName(toUserName);  
		        textMessage.setCreateTime(new Date().getTime());  
		        textMessage.setMsgType(MessageUtil.RESP_MESSAGE_TYPE_TEXT);  
		        textMessage.setFuncFlag(0);  
		        // �û���ʲôQQ���飬�ͷ���ʲôQQ����  
		        textMessage.setContent(content);  
		          
		        // ���ı���Ϣ����ת����xml�ַ���  
		        respMessage = MessageUtil.textMessageToXml(textMessage);  
		    }  
		} 
	}
}
