package cource.servlet;

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

import org.dom4j.Document;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;

import cource.service.CoreService;
import cource.util.SignUtil;

/**
 * TODO Weixin���Ĵ����� 
 * @author Administrator
 * @date 2015��10��6��12:42:35
 */
public class CoreServlet extends HttpServlet {  
    private static final long serialVersionUID = 4440739483644821986L;  
  
    /** 
     * TODO ȷ����������΢�ŷ����� 
     * @date 2015��10��6��12:42:52
     */  
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {  
        // ΢�ż���ǩ��  
        String signature = request.getParameter("signature");  
        // ʱ���  
        String timestamp = request.getParameter("timestamp");  
        // �����  
        String nonce = request.getParameter("nonce");  
        // ����ַ���  
        String echostr = request.getParameter("echostr");  
  
        PrintWriter out = response.getWriter();  
        // ͨ������signature���������У�飬��У��ɹ���ԭ������echostr����ʾ����ɹ����������ʧ��  
        if (SignUtil.checkSignature(signature, timestamp, nonce)) {  
            out.print(echostr);  
        }  
        out.close();  
        out = null;  
    }  
  
    /*
     * TODO ����΢�ŷ�������������Ϣ  
     * (non-Javadoc)
     * @see javax.servlet.http.HttpServlet#doPost(javax.servlet.http.HttpServletRequest, javax.servlet.http.HttpServletResponse)
     */
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {  
        // ��Ϣ�Ľ��ա�������Ӧ   ��������Ӧ�ı��������ΪUTF-8����ֹ�������룩  
        request.setCharacterEncoding("UTF-8");  
        // ΢�ŷ�����POST��Ϣʱ�õ���UTF-8���룬�ڽ���ʱҲҪ��ͬ���ı��룬�������Ļ����룻����Ӧ��Ϣ���ظ���Ϣ���û���ʱ��Ҳ�����뷽ʽ����ΪUTF-8��ԭ��ͬ�ϣ�
        response.setCharacterEncoding("UTF-8");  
  
        // ���ú���ҵ���������Ϣ��������Ϣ  ,����CoreService���processRequest�������ա�������Ϣ�����õ���������
        String respMessage = CoreService.processRequest(request);  
          
        // ��Ӧ��Ϣ  ,����response.getWriter().write()��������Ϣ�Ĵ��������ظ��û�
        PrintWriter out = response.getWriter();  
        out.print(respMessage);  
        out.close();  
    }  
    
    /** 
	 * TODO ����΢�ŷ���������XML�� 
	 *  
	 * @param request 
	 * @return 
	 * @throws Exception 
	 */  
	@SuppressWarnings("unchecked")  
	public static Map<String, String> parseXml(HttpServletRequest request) throws Exception {  
		// ����������洢��HashMap��  
		Map<String, String> map = new HashMap<String, String>();  
		
		// ��request��ȡ��������  
		InputStream inputStream = request.getInputStream();  
		// ��ȡ������  
		SAXReader reader = new SAXReader();  
		Document document = reader.read(inputStream);  
		// �õ�xml��Ԫ��  
		Element root = document.getRootElement();  
		// �õ���Ԫ�ص������ӽڵ�  
		List<Element> elementList = root.elements();  
		
		// ���������ӽڵ�  
		for (Element e : elementList)  
			map.put(e.getName(), e.getText());  
		
		// �ͷ���Դ  
		inputStream.close();  
		inputStream = null;  
		
		return map;  
	} 
}  