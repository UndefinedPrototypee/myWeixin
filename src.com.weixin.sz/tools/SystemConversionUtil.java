package tools;

/**
 * TODO SystemConversionUtil 进制转换工具
 *
 * @author Administrator
 * @time 2015年10月28日 下午10:15:25
 *
 */
public class SystemConversionUtil {
	
	/**
	 * TODO 二进制转换为八进制 
	 * 
	 * @author Administrator
	 * @time 2015年10月28日 下午10:30:25
	 * @param origBinary
	 * @return
	 */
	public static int binary2octonary(int origBinary) {
		int destOctonary = 0;
		return destOctonary;
	}
	
	/**
	 * TODO 八进制转换为二进制  
	 * 
	 * @author Administrator
	 * @time 2015年10月28日 下午10:37:39
	 * @param origoctonary
	 * @return
	 */
	public static int octonary2binary(int origoctonary) {
		int destBinary = 0;
		return destBinary;
	}

	/**
	 * TODO 二进制转换为十进制  
	 * 
	 * @author Administrator
	 * @time 2015年10月28日 下午10:30:41
	 * @param origBinary
	 * @return
	 */
	public static int binary2decimal(int origBinary) {
		int destDecimal = 0;
		return destDecimal;
	}

	/**
	 * TODO 十进制转换为二进制 
	 * 
	 * @author Administrator
	 * @time 2015年10月28日 下午10:38:00
	 * @param origDecimal
	 * @return
	 */
	public static int decimal2binary(int origDecimal) {
		int destBinary = 0;
		return destBinary;
	}
	
	/**
	 * TODO 十进制转换为十六进制 
	 * 
	 * @author Administrator
	 * @time 2015年10月28日 下午10:31:03
	 * @param origDecimal
	 * @return
	 */
	public static String decimal2hexadecimal(int origDecimal) {
		String destHexadecimal = "";
		destHexadecimal = Integer.toHexString(origDecimal);
		return destHexadecimal;
	}
	
	/**
	 * TODO 十六进制转换为十进制  
	 * 
	 * @author Administrator
	 * @time 2015年10月28日 下午10:31:24
	 * @param origHexadecimal
	 * @return
	 */
	public static int hexadeciaml2decimal(String origHexadecimal) {
		int destDecimal = Integer.valueOf(origHexadecimal, 16);
		return destDecimal;
	}
	
	/**
	 * TODO 十进制转换为36进制（自定义进制） 
	 * 
	 * @author Administrator
	 * @time 2015年10月28日 下午10:35:46
	 * @param origDecimal
	 * @return
	 */
	public static String decimalTo36System(int origDecimal) {
		String dest36System = "";
		return dest36System;
	}
	
	/**
	 * TODO 从36进制转换为十进制 
	 * 
	 * @author Administrator
	 * @time 2015年10月28日 下午10:36:08
	 * @param orig36System
	 * @return
	 */
	public static int decimalTo36SysInversion(String orig36System) {
		int destDecimal = 0;
		return destDecimal;
	}
	
	/**
	 * TODO 十进制转换为62进制（自定义进制） 
	 * 
	 * @author Administrator
	 * @time 2015年10月28日 下午10:35:46
	 * @param origDecimal
	 * @return
	 */
	public static String decimalTo62System(int origDecimal) {
		String dest62System = "";
		return dest62System;
	}
	
	/**
	 * TODO 从62进制转换为十进制 
	 * 
	 * @author Administrator
	 * @time 2015年10月28日 下午10:36:08
	 * @param orig36System
	 * @return
	 */
	public static int decimalTo62SysInversion(String orig62System) {
		int destDecimal = 0;
		return destDecimal;
	}
	
	
}
