package com.wx.entity.article;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.Date;

@Entity
public class WxArticleFavorite {
    @Id
    @Column
    Long id;

    @Column
    Long articleId;

    @Column
    String favoriteOpenId;

    @Column
    Date favoriteDate;

    @Column
    String shareOpenId;

    @Column
    Long shareId;


    public Long getShareId() {
        return shareId;
    }

    public void setShareId(Long shareId) {
        this.shareId = shareId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getArticleId() {
        return articleId;
    }

    public void setArticleId(Long articleId) {
        this.articleId = articleId;
    }

    public String getFavoriteOpenId() {
        return favoriteOpenId;
    }

    public void setFavoriteOpenId(String favoriteOpenId) {
        this.favoriteOpenId = favoriteOpenId;
    }

    public Date getFavoriteDate() {
        return favoriteDate;
    }

    public void setFavoriteDate(Date favoriteDate) {
        this.favoriteDate = favoriteDate;
    }

    public String getShareOpenId() {
        return shareOpenId;
    }

    public void setShareOpenId(String shareOpenId) {
        this.shareOpenId = shareOpenId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        WxArticleFavorite that = (WxArticleFavorite) o;

        return id != null ? id.equals(that.id) : that.id == null;
    }

    @Override
    public int hashCode() {
        return id != null ? id.hashCode() : 0;
    }
}
