package com.wx.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

@Entity
@Table(name="wx_article")
public class WxArticle {
    @Id
    @Column
    Long Id;
    @Column
    String title;
    @Column
    Integer creater;
    @Column
    Integer type;
    @Column
    Date createDate;
    @Column
//    PRAISE_COUNT	N	INTEGER	Y
    Integer praiseCount;
    @Column
//    READ_COUNT	N	INTEGER	Y
    Integer readCount;
    @Column
    //    EXPIRES_DATE	N	DATE	Y
    Date expiresDate;
    @Column
//    PICTURE_ID	N	NUMBER	Y
    long pictureId;
    @Column
//    CONTENT	N	CLOB	Y
    String content;
    @Column
//    CONTENT_URL	N	VARCHAR2(300)	Y
    String contentUrl;
    @Column
//    PICTURE_URL	N	VARCHAR2(200)	Y
    String pictureUrl;
    @Column
//    FAVORITE_COUNT	N	INTEGER	Y
    Integer favoriteCount;
    @Column
//    FORWARD_COUNT
    Integer forwardCount;


    public Long getId() {
        return Id;
    }

    public void setId(Long id) {
        Id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Integer getCreater() {
        return creater;
    }

    public void setCreater(Integer creater) {
        this.creater = creater;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public Integer getPraiseCount() {
        return praiseCount;
    }

    public void setPraiseCount(Integer praiseCount) {
        this.praiseCount = praiseCount;
    }

    public Integer getReadCount() {
        return readCount;
    }

    public void setReadCount(Integer readCount) {
        this.readCount = readCount;
    }

    public Date getExpiresDate() {
        return expiresDate;
    }

    public void setExpiresDate(Date expiresDate) {
        this.expiresDate = expiresDate;
    }

    public long getPictureId() {
        return pictureId;
    }

    public void setPictureId(long pictureId) {
        this.pictureId = pictureId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getContentUrl() {
        return contentUrl;
    }

    public void setContentUrl(String contentUrl) {
        this.contentUrl = contentUrl;
    }

    public String getPictureUrl() {
        return pictureUrl;
    }

    public void setPictureUrl(String pictureUrl) {
        this.pictureUrl = pictureUrl;
    }

    public Integer getFavoriteCount() {
        return favoriteCount;
    }

    public void setFavoriteCount(Integer favoriteCount) {
        this.favoriteCount = favoriteCount;
    }

    public Integer getForwardCount() {
        return forwardCount;
    }

    public void setForwardCount(Integer forwardCount) {
        this.forwardCount = forwardCount;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        WxArticle wxArticle = (WxArticle) o;

        return Id.equals(wxArticle.Id);
    }

    @Override
    public int hashCode() {
        return Id.hashCode();
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }
}
