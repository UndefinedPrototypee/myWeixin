package cource.usetools;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

public class ParseMsgCreateTime {

	/** 
	 * ��ʾJava�г��õĻ�ȡlong����ʱ������ַ�ʽ 
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
	 * ��ʾJava�г��õĻ�ȡlong����ʱ������ַ�ʽ 
	 */  
	/*public static void main(String[] args) {  
	    // ��ǰʱ�䣨����1970��1��1��0ʱ0��0��0����ĺ�������  
	    long longTime = 1373206143378L;  
	      
	    String stdFormatTime = formatTime(longTime);  
	    // �����2013-07-07 22:09:03  
	    System.out.println(stdFormatTime);  
	}  */
	  
	/** 
	 * ��long���͵�ʱ��ת���ɱ�׼��ʽ��yyyy-MM-dd HH:mm:ss�� 
	 *  
	 * @param longTime 
	 * @return 
	 */  
	public static String formatTime(long longTime) {  
	    DateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");  
	    return format.format(new Date(longTime));  
	}  

	/** 
	 * ��΢����Ϣ�е�CreateTimeת���ɱ�׼��ʽ��ʱ�䣨yyyy-MM-dd HH:mm:ss�� 
	 *  
	 * @param createTime ��Ϣ����ʱ�� 
	 * @return 
	 */  
	public static String formatTime(String createTime) {  
	    // ��΢�Ŵ����CreateTimeת����long���ͣ��ٳ���1000  
	    long msgCreateTime = Long.parseLong(createTime) * 1000L;  
	    DateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");  
	    return format.format(new Date(msgCreateTime));  
	}  
}
