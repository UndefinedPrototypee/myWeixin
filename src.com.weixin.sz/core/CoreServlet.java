package core;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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
  
    /** 
     * ����΢�ŷ�������������Ϣ 
     */  
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {  
        // TODO ��Ϣ�Ľ��ա�������Ӧ  
    }  
  
}  