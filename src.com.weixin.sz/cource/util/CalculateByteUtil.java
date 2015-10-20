package cource.util;

import java.io.UnsupportedEncodingException;

/**
 * TODO CalculateByteUtil Java��utf-8���뷽ʽʱ��ռ�ֽ����ļ��㷽����װ
 *
 * @author Administrator
 * @time 2015��10��21�� ����12:00:27
 *
 */
public class CalculateByteUtil {

	/** 
	 * �������utf-8���뷽ʽʱ�ַ�����ռ�ֽ��� 
	 *  
	 * @param content 
	 * @return 
	 */  
	public static int getByteSize(String content) {  
	    int size = 0;  
	    if (null != content) {  
	        try {  
	            // ���ֲ���utf-8����ʱռ3���ֽ�  
	            size = content.getBytes("utf-8").length;  
	        } catch (UnsupportedEncodingException e) {  
	            e.printStackTrace();  
	        }  
	    }  
	    return size;  
	}  
	
	private static String getMsgContent() {  
	    StringBuffer buffer = new StringBuffer();  
	    // ÿ��70�����֣���682�����ּ�1��Ӣ�ĵĸ�̾��  
	    buffer.append("��֪��ʲôʱ��ʼϲ������ÿ��ҹ�ﶼ�������￴���㳤�ö�ô�������Ҳ��ܲ����㿴�������Ҿ���ʧ���Լ�����ǣ������߹����������ʲô�����Ҷ�����");  
	    buffer.append("��֪��ʲôʱ��ʼϲ������ÿ��ҹ�ﶼ�������￴���㳤�ö�ô�������Ҳ��ܲ����㿴�������Ҿ���ʧ���Լ�����ǣ������߹����������ʲô�����Ҷ�����");  
	    buffer.append("��֪��ʲôʱ��ʼϲ������ÿ��ҹ�ﶼ�������￴���㳤�ö�ô�������Ҳ��ܲ����㿴�������Ҿ���ʧ���Լ�����ǣ������߹����������ʲô�����Ҷ�����");  
	    buffer.append("��֪��ʲôʱ��ʼϲ������ÿ��ҹ�ﶼ�������￴���㳤�ö�ô�������Ҳ��ܲ����㿴�������Ҿ���ʧ���Լ�����ǣ������߹����������ʲô�����Ҷ�����");  
	    buffer.append("��֪��ʲôʱ��ʼϲ������ÿ��ҹ�ﶼ�������￴���㳤�ö�ô�������Ҳ��ܲ����㿴�������Ҿ���ʧ���Լ�����ǣ������߹����������ʲô�����Ҷ�����");  
	    buffer.append("��֪��ʲôʱ��ʼϲ������ÿ��ҹ�ﶼ�������￴���㳤�ö�ô�������Ҳ��ܲ����㿴�������Ҿ���ʧ���Լ�����ǣ������߹����������ʲô�����Ҷ�����");  
	    buffer.append("��֪��ʲôʱ��ʼϲ������ÿ��ҹ�ﶼ�������￴���㳤�ö�ô�������Ҳ��ܲ����㿴�������Ҿ���ʧ���Լ�����ǣ������߹����������ʲô�����Ҷ�����");  
	    buffer.append("��֪��ʲôʱ��ʼϲ������ÿ��ҹ�ﶼ�������￴���㳤�ö�ô�������Ҳ��ܲ����㿴�������Ҿ���ʧ���Լ�����ǣ������߹����������ʲô�����Ҷ�����");  
	    buffer.append("��֪��ʲôʱ��ʼϲ������ÿ��ҹ�ﶼ�������￴���㳤�ö�ô�������Ҳ��ܲ����㿴�������Ҿ���ʧ���Լ�����ǣ������߹����������ʲô�����Ҷ�����");  
	    buffer.append("��֪��ʲôʱ��ʼϲ������ÿ��ҹ�ﶼ�������￴���㳤�ö�ô�������Ҳ��ܲ����㿴�������Ҿ���ʧ���Լ�����ǣ!");  
	    return buffer.toString();  
	}  
	  
	public static void main(String []args) throws Exception  {  
	    // ����gb2312���뷽ʽʱռ1365���ֽ�  
	    System.out.println(getMsgContent().getBytes("gb2312").length);  
	    // ����utf-8���뷽ʽʱռ2047���ֽ�  
	    System.out.println(getMsgContent().getBytes("utf-8").length);  
	} 
	/*
	public static void main(String []args) throws UnsupportedEncodingException  {  
	    // ���н����2  
	    System.out.println("����".getBytes("ISO8859-1").length);  
	    // ���н����4  
	    System.out.println("����".getBytes("GB2312").length);  
	    // ���н����4  
	    System.out.println("����".getBytes("GBK").length);  
	    // ���н����6  
	    System.out.println("����".getBytes("UTF-8").length);  
	} 
	*/
}
