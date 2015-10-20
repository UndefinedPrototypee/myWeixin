package core;

import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.w3c.dom.Document;
import org.w3c.dom.Element;

/**
 * TODO Weixin核心处理类 
 * @author Administrator
 * @date 2015年10月6日12:42:35
 */
public class CoreServlet extends HttpServlet {  
    private static final long serialVersionUID = 4440739483644821986L;  
  
    /** 
     * TODO 确认请求来自微信服务器 
     * @date 2015年10月6日12:42:52
     */  
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {  
        // 微信加密签名  
        String signature = request.getParameter("signature");  
        // 时间戳  
        String timestamp = request.getParameter("timestamp");  
        // 随机数  
        String nonce = request.getParameter("nonce");  
        // 随机字符串  
        String echostr = request.getParameter("echostr");  
  
        PrintWriter out = response.getWriter();  
        // 通过检验signature对请求进行校验，若校验成功则原样返回echostr，表示接入成功，否则接入失败  
        if (SignUtil.checkSignature(signature, timestamp, nonce)) {  
            out.print(echostr);  
        }  
        out.close();  
        out = null;  
    }  
  
    /*
     * TODO 处理微信服务器发来的消息  
     * (non-Javadoc)
     * @see javax.servlet.http.HttpServlet#doPost(javax.servlet.http.HttpServletRequest, javax.servlet.http.HttpServletResponse)
     */
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {  
        // TODO 消息的接收、处理、响应  
    }  
  
    /** 
	 * TODO 解析微信发来的请求（XML） 
	 *  
	 * @param request 
	 * @return 
	 * @throws Exception 
	 */  
	@SuppressWarnings("unchecked")  
	public static Map<String, String> parseXml(HttpServletRequest request) throws Exception {  
		// 将解析结果存储在HashMap中  
		Map<String, String> map = new HashMap<String, String>();  
		
		// 从request中取得输入流  
		InputStream inputStream = request.getInputStream();  
		// 读取输入流  
		SAXReader reader = new SAXReader();  
		Document document = reader.read(inputStream);  
		// 得到xml根元素  
		Element root = document.getRootElement();  
		// 得到根元素的所有子节点  
		List<Element> elementList = root.elements();  
		
		// 遍历所有子节点  
		for (Element e : elementList)  
			map.put(e.getName(), e.getText());  
		
		// 释放资源  
		inputStream.close();  
		inputStream = null;  
		
		return map;  
	} 
}  