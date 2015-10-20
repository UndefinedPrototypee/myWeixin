package cource.usetools;

import java.util.Date;
import java.util.regex.Matcher;

import org.dom4j.rule.Pattern;

import cource.message.resp.TextMessage;
import cource.util.MessageUtil;

public class Emotion {

	/** 
	 * emoji±íÇé×ª»»(hex -> utf-16) 
	 *  
	 * @param hexEmoji 
	 * @return 
	 */  
	public static String emoji(int hexEmoji) {  
	    return String.valueOf(Character.toChars(hexEmoji));  
	}  
}
