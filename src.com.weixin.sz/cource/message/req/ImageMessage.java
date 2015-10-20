package cource.message.req;


/**
 * TODO ImageMessage 图片消息 
 * @author Administrator
 * @time 2015年10月19日 下午11:23:13
 *
 */
public class ImageMessage extends BaseMessage {  
    // 图片链接  
    private String PicUrl;  
  
    public String getPicUrl() {  
        return PicUrl;  
    }  
  
    public void setPicUrl(String picUrl) {  
        PicUrl = picUrl;  
    }  
}  
