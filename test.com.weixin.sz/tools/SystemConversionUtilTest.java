/**TODO SystemConversionUtilTest.java
 * 
 * @author Administrator
 * @time 2015年10月28日 下午10:51:02
 */
package tools;

import static org.junit.Assert.*;

import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

/**TODO SystemConversionUtilTest
 *
 * @author Administrator
 * @time 2015年10月28日 下午10:51:02
 *
 */
public class SystemConversionUtilTest {
	
	private static SystemConversionUtil systemConversionUtil = new SystemConversionUtil();

	/**TODO 
	 * 
	 * @author Administrator
	 * @time 2015年10月28日 下午10:51:03
	 * @throws java.lang.Exception
	 */
	@BeforeClass
	public static void setUpBeforeClass() throws Exception {
		System.out.println("setUpBeforeClass()");
	}

	/**TODO 
	 * 
	 * @author Administrator
	 * @time 2015年10月28日 下午10:51:03
	 * @throws java.lang.Exception
	 */
	@AfterClass
	public static void tearDownAfterClass() throws Exception {
		System.out.println("tearDownAfterClass()");
	}

	/**TODO 
	 * 
	 * @author Administrator
	 * @time 2015年10月28日 下午10:51:03
	 * @throws java.lang.Exception
	 */
	@Before
	public void setUp() throws Exception {
		System.out.println("setUp()");
	}

	/**TODO 
	 * 
	 * @author Administrator
	 * @time 2015年10月28日 下午10:51:03
	 * @throws java.lang.Exception
	 */
	@After
	public void tearDown() throws Exception {
		System.out.println("tearDown()");
	}

	/**
	 * Test method for {@link tools.SystemConversionUtil#binary2octonary(int)}.
	 */
	@Test
	public void testBinary2octonary() {
		// fail("Not yet implemented");
		System.out.println("testBinary2octonary()");
	}

	/**
	 * Test method for {@link tools.SystemConversionUtil#octonary2binary(int)}.
	 */
	@Test
	public void testOctonary2binary() {
		// fail("Not yet implemented");
		System.out.println("testOctonary2binary()");
	}

	/**
	 * Test method for {@link tools.SystemConversionUtil#binary2decimal(int)}.
	 */
	@Test
	public void testBinary2decimal() {
		// fail("Not yet implemented");
		System.out.println("testBinary2decimal()");
	}

	/**
	 * Test method for {@link tools.SystemConversionUtil#decimal2binary(int)}.
	 */
	@Test
	public void testDecimal2binary() {
		// fail("Not yet implemented");
		System.out.println("testDecimal2binary()");
	}

	/**
	 * Test method for {@link tools.SystemConversionUtil#decimal2hexadecimal(int)}.
	 */
	@Test
	public void testDecimal2hexadecimal() {
		// fail("Not yet implemented");
		System.out.println("testDecimal2hexadecimal()");
		int decimal = 12580;
		String actual = SystemConversionUtil.decimal2hexadecimal(decimal);
		System.out.println(actual);
		assertEquals("3124", actual);
	}

	/**
	 * Test method for {@link tools.SystemConversionUtil#hexadeciaml2decimal(java.lang.String)}.
	 */
	@Test
	public void testHexadeciaml2decimal() {
		// fail("Not yet implemented");
		System.out.println("testHexadeciaml2decimal()");
		assertEquals(12580, SystemConversionUtil.hexadeciaml2decimal("3124"));
	}

	/**
	 * Test method for {@link tools.SystemConversionUtil#decimalTo36System(int)}.
	 */
	@Test
	public void testDecimalTo36System() {
		// fail("Not yet implemented");
		System.out.println("testDecimalTo36System()");
	}

	/**
	 * Test method for {@link tools.SystemConversionUtil#decimalTo36SysInversion(java.lang.String)}.
	 */
	@Test
	public void testDecimalTo36SysInversion() {
		// fail("Not yet implemented");
		System.out.println("testDecimalTo36SysInversion()");
	}

	/**
	 * Test method for {@link tools.SystemConversionUtil#decimalTo62System(int)}.
	 */
	@Test
	public void testDecimalTo62System() {
		// fail("Not yet implemented");
		System.out.println("testDecimalTo62System()");
	}

	/**
	 * Test method for {@link tools.SystemConversionUtil#decimalTo62SysInversion(java.lang.String)}.
	 */
	@Test
	public void testDecimalTo62SysInversion() {
		// fail("Not yet implemented");
		System.out.println("testDecimalTo62SysInversion()");
	}

}
