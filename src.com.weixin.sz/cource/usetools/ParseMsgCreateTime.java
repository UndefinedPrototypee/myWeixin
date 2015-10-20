package cource.usetools;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

public class ParseMsgCreateTime {

	/** 
	 * 演示Java中常用的获取long类型时间的两种方式 
	 */  
	public static void main(String[] args) {  
	    long longTime1 = System.currentTimeMillis();  
	    // 1373206143378  
	    System.out.println(longTime1);  
	  
	    long longTime2 = new java.util.Date().getTime();  
	    // 1373206143381  
	    System.out.println(longTime2);  
	}  

	/** 
	 * 演示Java中常用的获取long类型时间的两种方式 
	 */  
	/*public static void main(String[] args) {  
	    // 当前时间（距离1970年1月1日0时0分0秒0毫秒的毫秒数）  
	    long longTime = 1373206143378L;  
	      
	    String stdFormatTime = formatTime(longTime);  
	    // 输出：2013-07-07 22:09:03  
	    System.out.println(stdFormatTime);  
	}  */
	  
	/** 
	 * 将long类型的时间转换成标准格式（yyyy-MM-dd HH:mm:ss） 
	 *  
	 * @param longTime 
	 * @return 
	 */  
	public static String formatTime(long longTime) {  
	    DateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");  
	    return format.format(new Date(longTime));  
	}  

	/** 
	 * 将微信消息中的CreateTime转换成标准格式的时间（yyyy-MM-dd HH:mm:ss） 
	 *  
	 * @param createTime 消息创建时间 
	 * @return 
	 */  
	public static String formatTime(String createTime) {  
	    // 将微信传入的CreateTime转换成long类型，再乘以1000  
	    long msgCreateTime = Long.parseLong(createTime) * 1000L;  
	    DateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");  
	    return format.format(new Date(msgCreateTime));  
	}  
}
