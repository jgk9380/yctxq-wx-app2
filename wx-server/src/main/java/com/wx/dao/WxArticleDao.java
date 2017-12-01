package com.wx.dao;

import com.wx.entity.WxArticle;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
public interface WxArticleDao extends CrudRepository<WxArticle ,Long> {
    WxArticle findById(long id);
//    @Query(nativeQuery = true,value = "")
    List<Long> findAllByType(Integer type);
}
