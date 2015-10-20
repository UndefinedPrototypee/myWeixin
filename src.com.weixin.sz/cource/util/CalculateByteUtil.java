package cource.util;

import java.io.UnsupportedEncodingException;

/**
 * TODO CalculateByteUtil Java中utf-8编码方式时所占字节数的计算方法封装
 *
 * @author Administrator
 * @time 2015年10月21日 上午12:00:27
 *
 */
public class CalculateByteUtil {

	/** 
	 * 计算采用utf-8编码方式时字符串所占字节数 
	 *  
	 * @param content 
	 * @return 
	 */  
	public static int getByteSize(String content) {  
	    int size = 0;  
	    if (null != content) {  
	        try {  
	            // 汉字采用utf-8编码时占3个字节  
	            size = content.getBytes("utf-8").length;  
	        } catch (UnsupportedEncodingException e) {  
	            e.printStackTrace();  
	        }  
	    }  
	    return size;  
	}  
	
	private static String getMsgContent() {  
	    StringBuffer buffer = new StringBuffer();  
	    // 每行70个汉字，共682个汉字加1个英文的感叹号  
	    buffer.append("不知道什么时候开始喜欢这里每个夜里都会来这里看你你长得多么美丽叫我不能不看你看不到你我就迷失了自己好想牵你的手走过风风雨雨有什么困难我都陪你");  
	    buffer.append("不知道什么时候开始喜欢这里每个夜里都会来这里看你你长得多么美丽叫我不能不看你看不到你我就迷失了自己好想牵你的手走过风风雨雨有什么困难我都陪你");  
	    buffer.append("不知道什么时候开始喜欢这里每个夜里都会来这里看你你长得多么美丽叫我不能不看你看不到你我就迷失了自己好想牵你的手走过风风雨雨有什么困难我都陪你");  
	    buffer.append("不知道什么时候开始喜欢这里每个夜里都会来这里看你你长得多么美丽叫我不能不看你看不到你我就迷失了自己好想牵你的手走过风风雨雨有什么困难我都陪你");  
	    buffer.append("不知道什么时候开始喜欢这里每个夜里都会来这里看你你长得多么美丽叫我不能不看你看不到你我就迷失了自己好想牵你的手走过风风雨雨有什么困难我都陪你");  
	    buffer.append("不知道什么时候开始喜欢这里每个夜里都会来这里看你你长得多么美丽叫我不能不看你看不到你我就迷失了自己好想牵你的手走过风风雨雨有什么困难我都陪你");  
	    buffer.append("不知道什么时候开始喜欢这里每个夜里都会来这里看你你长得多么美丽叫我不能不看你看不到你我就迷失了自己好想牵你的手走过风风雨雨有什么困难我都陪你");  
	    buffer.append("不知道什么时候开始喜欢这里每个夜里都会来这里看你你长得多么美丽叫我不能不看你看不到你我就迷失了自己好想牵你的手走过风风雨雨有什么困难我都陪你");  
	    buffer.append("不知道什么时候开始喜欢这里每个夜里都会来这里看你你长得多么美丽叫我不能不看你看不到你我就迷失了自己好想牵你的手走过风风雨雨有什么困难我都陪你");  
	    buffer.append("不知道什么时候开始喜欢这里每个夜里都会来这里看你你长得多么美丽叫我不能不看你看不到你我就迷失了自己好想牵!");  
	    return buffer.toString();  
	}  
	  
	public static void main(String []args) throws Exception  {  
	    // 采用gb2312编码方式时占1365个字节  
	    System.out.println(getMsgContent().getBytes("gb2312").length);  
	    // 采用utf-8编码方式时占2047个字节  
	    System.out.println(getMsgContent().getBytes("utf-8").length);  
	} 
	/*
	public static void main(String []args) throws UnsupportedEncodingException  {  
	    // 运行结果：2  
	    System.out.println("柳峰".getBytes("ISO8859-1").length);  
	    // 运行结果：4  
	    System.out.println("柳峰".getBytes("GB2312").length);  
	    // 运行结果：4  
	    System.out.println("柳峰".getBytes("GBK").length);  
	    // 运行结果：6  
	    System.out.println("柳峰".getBytes("UTF-8").length);  
	} 
	*/
}
