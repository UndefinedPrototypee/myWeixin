package org.dfli.custom.service;

import java.util.List;

import org.dfli.custom.pojo.ResultPair;

/** 
 * ���ðٶȷ���api��ѯ��� 
 *  
 * @author liufeng 
 * @date 2013-10-21 
 */  
public class TranslateResult {  
    // ʵ�ʲ��õ�Դ����  
    private String from;  
    // ʵ�ʲ��õ�Ŀ������  
    private String to;  
    // �����  
    private List<ResultPair> trans_result;  
  
    public String getFrom() {  
        return from;  
    }  
  
    public void setFrom(String from) {  
        this.from = from;  
    }  
  
    public String getTo() {  
        return to;  
    }  
  
    public void setTo(String to) {  
        this.to = to;  
    }  
  
    public List<ResultPair> getTrans_result() {  
        return trans_result;  
    }  
  
    public void setTrans_result(List<ResultPair> trans_result) {  
        this.trans_result = trans_result;  
    }  
}  
