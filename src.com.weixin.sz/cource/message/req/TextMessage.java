package cource.message.req;


/**
 * TODO TextMessage 文本消息 
 * @author Administrator
 * @time 2015年10月19日 下午11:22:27
 *
 */
public class TextMessage extends BaseMessage {  
    // 消息内容  
    private String Content;  
  
    public String getContent() {  
        return Content;  
    }  
  
    public void setContent(String content) {  
        Content = content;  
    }  
}  
