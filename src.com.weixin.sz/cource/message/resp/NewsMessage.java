package cource.message.resp;

import java.util.List;

/**
 * TODO NewsMessage �ı���Ϣ 
 *
 * @author Administrator
 * @time 2015��10��19�� ����11:34:07
 *
 */
public class NewsMessage extends BaseMessage {  
    // ͼ����Ϣ����������Ϊ10������  
    private int ArticleCount;  
    // ����ͼ����Ϣ��Ϣ��Ĭ�ϵ�һ��itemΪ��ͼ  
    private List<Article> Articles;  
  
    public int getArticleCount() {  
        return ArticleCount;  
    }  
  
    public void setArticleCount(int articleCount) {  
        ArticleCount = articleCount;  
    }  
  
    public List<Article> getArticles() {  
        return Articles;  
    }  
  
    public void setArticles(List<Article> articles) {  
        Articles = articles;  
    }  
}  
