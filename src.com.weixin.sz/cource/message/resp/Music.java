package cource.message.resp;

/**
 * TODO Music ����model 
 *
 * @author Administrator
 * @time 2015��10��19�� ����11:33:31
 *
 */
public class Music {  
    // ��������  
    private String Title;  
    // ��������  
    private String Description;  
    // ��������  
    private String MusicUrl;  
    // �������������ӣ�WIFI��������ʹ�ø����Ӳ�������  
    private String HQMusicUrl;  
  
    public String getTitle() {  
        return Title;  
    }  
  
    public void setTitle(String title) {  
        Title = title;  
    }  
  
    public String getDescription() {  
        return Description;  
    }  
  
    public void setDescription(String description) {  
        Description = description;  
    }  
  
    public String getMusicUrl() {  
        return MusicUrl;  
    }  
  
    public void setMusicUrl(String musicUrl) {  
        MusicUrl = musicUrl;  
    }  
  
    public String getHQMusicUrl() {  
        return HQMusicUrl;  
    }  
  
    public void setHQMusicUrl(String musicUrl) {  
        HQMusicUrl = musicUrl;  
    }  
  
}  
