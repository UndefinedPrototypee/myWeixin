package cource.message.req;


/**
 * TODO VoiceMessage ��Ƶ��Ϣ 
 *
 * @author Administrator
 * @time 2015��10��19�� ����11:27:44
 *
 */
public class VoiceMessage extends BaseMessage {  
    // ý��ID  
    private String MediaId;  
    // ������ʽ  
    private String Format;  
  
    public String getMediaId() {  
        return MediaId;  
    }  
  
    public void setMediaId(String mediaId) {  
        MediaId = mediaId;  
    }  
  
    public String getFormat() {  
        return Format;  
    }  
  
    public void setFormat(String format) {  
        Format = format;  
    }  
}  
