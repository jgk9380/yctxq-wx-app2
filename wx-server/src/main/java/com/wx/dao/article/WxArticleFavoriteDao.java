package com.wx.dao.article;

import com.wx.entity.article.WxArticleFavorite;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface WxArticleFavoriteDao extends CrudRepository<WxArticleFavorite,Long> {
    List<WxArticleFavorite> findByFavoriteOpenId(String favoriteOpenId);
}
