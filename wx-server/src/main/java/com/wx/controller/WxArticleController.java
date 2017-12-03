package com.wx.controller;

import com.wx.dao.article.*;
import com.wx.entity.article.*;
import com.wx.mid.util.WxUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/public/article")
public class WxArticleController {
    @Autowired
    WxArticleDao wxArticleDao;

    @Autowired
    WxUtils wxUtils;
    //    @Autowired
    //    JdbcTemplate jdbcTemplate;

    @Autowired
    WxArticleReadHistoryDao wxArticleReadHistoryDao;

    @Autowired
    WxArticlePraiseDao wxArticlePraiseDao;

    @Autowired
    WxArticleShareHistoryDao wxArticleShareHistoryDao;

    @Autowired
    WxArticleFavoriteDao wxArticleFavoriteDao;

    @Autowired
    WxArticleDiscussDao wxArticleDiscussDao;

    //todo ?所有分享上一个分享痕迹。 shareId


    //新闻列表:参数:openId
    @GetMapping("/newsList/{openId}")
    ResultCode getNewList(@PathVariable("openId") String openId) {
        return new ResultCode(0, "ok", wxArticleDao.findAllNews().subList(0,10));
    }

    //通信知识列表：openId
    @GetMapping("/knowledgesList/{openId}")
    ResultCode getKnowledgeList(@PathVariable("openId") String openId) {
        return new ResultCode(0, "ok",wxArticleDao.findAllKnowledges());
    }

    //阅读历史：openId,articleId,shareOpenId
    @PostMapping("/readArticle/{articleId}/{openId}/{shareId}")
    @Transactional
    ResultCode setReadHistory(@PathVariable("openId") String openId, @PathVariable("articleId") Long articleId
            , @PathVariable("shareId") Long shareId) {
        //1、readCount+1
        WxArticle wxArticle = wxArticleDao.findById(articleId);
        wxArticle.setReadCount(wxArticle.getReadCount() + 1);
        wxArticleDao.save(wxArticle);

        //2、记录具体阅读信息.
        WxArticleReadHistory wxArticleReadHistory = new WxArticleReadHistory();
        wxArticleReadHistory.setId(wxUtils.getSeqencesValue().longValue());
        wxArticleReadHistory.setArticleId(articleId);
        wxArticleReadHistory.setReaderOpenId(openId);
        wxArticleReadHistory.setShareId(shareId);
        wxArticleReadHistory.setReadDate(new Date());
        WxArticleReadHistory result = wxArticleReadHistoryDao.save(wxArticleReadHistory);
        return new ResultCode(0, "success", result);
    }

    //点赞：参数 openId，articleId,shareOpenId;
    @PostMapping("/praiseArticle/{articleId}/{openId}/{shareId}")
    @Transactional
    ResultCode praiseArticle(@PathVariable("openId") String openId, @PathVariable("articleId") Long articleId
            , @PathVariable("shareId") Long shareId) {
        //1、PraiseCount+1
        WxArticle wxArticle = wxArticleDao.findById(articleId);
        wxArticle.setPraiseCount(wxArticle.getPraiseCount() + 1);
        wxArticleDao.save(wxArticle);
        //2、记录点赞信息.
        WxArticlePraise wxArticlePraise = new WxArticlePraise();
        wxArticlePraise.setId(wxUtils.getSeqencesValue().longValue());
        wxArticlePraise.setArticleId(articleId);
        wxArticlePraise.setPraiseOpenId(openId);
        //todo wxArticlePraise.setShareOpenId(sharerOpenId);
        wxArticlePraise.setShareId(shareId);
        wxArticlePraise.setPraiseDate(new Date());
        WxArticlePraise result = wxArticlePraiseDao.save(wxArticlePraise);
        return new ResultCode(0, "ok", result);
    }

    //分享转发：openId,articleId,shareType,shareOpenId
    @PostMapping("/shareArticle/{articleId}/{openId}/{shareType}/{shareId}")
    @Transactional
    ResultCode shareArticle(@PathVariable("openId") String openId, @PathVariable("articleId") Long articleId
            , @PathVariable("shareType") String shareType, @PathVariable("shareId") Long shareId) {
        //1、shareCount+1
        WxArticle wxArticle = wxArticleDao.findById(articleId);
        wxArticle.setShareCount(wxArticle.getShareCount() + 1);
        wxArticleDao.save(wxArticle);

        //2、记录share信息.
        WxArticleShareHistory wxArticleShareHistory = new WxArticleShareHistory();
        wxArticleShareHistory.setId(wxUtils.getSeqencesValue().longValue());
        wxArticleShareHistory.setArticleId(articleId);
        wxArticleShareHistory.setShareOpenId(openId);
        wxArticleShareHistory.setShareType(shareType);
        wxArticleShareHistory.setShareDate(new Date());
        //记录上一个分享人;
        wxArticleShareHistory.setShareId(shareId);
        WxArticleShareHistory result = wxArticleShareHistoryDao.save(wxArticleShareHistory);
        //返回本次shareId
        return new ResultCode(0, "ok", result);

    }


    //收藏FAVORITE:openId,articleId,shareOpenId,
    @PostMapping("/favoriteArticle/{articleId}/{openId}/{shareId}")
    @Transactional
    ResultCode favoriteArticle(@PathVariable("openId") String openId, @PathVariable("articleId") Long articleId
            , @PathVariable("shareId") long shareId) {

        //1、favoriteCount+1
        WxArticle wxArticle = wxArticleDao.findById(articleId);
        wxArticle.setFavoriteCount(wxArticle.getFavoriteCount() + 1);
        wxArticleDao.save(wxArticle);

        //2、记录favorite信息.
        WxArticleFavorite wxArticleFavorite = new WxArticleFavorite();
        wxArticleFavorite.setId(wxUtils.getSeqencesValue().longValue());
        wxArticleFavorite.setArticleId(articleId);
        wxArticleFavorite.setFavoriteOpenId(openId);
        wxArticleFavorite.setFavoriteDate(new Date());
        wxArticleFavorite.setShareId(shareId);
        WxArticleFavorite result = wxArticleFavoriteDao.save(wxArticleFavorite);
        return new ResultCode(0, "ok", result);
    }

    //回复列表:articleId,parentId
    @GetMapping("/articleDiscussList/{articleId}/{parentId}")
    ResultCode articleDiscussList(@PathVariable("articleId") Long articleId, @PathVariable("parentId") Long parentId) {
        if (parentId == 0)
            return new ResultCode(0, "ok", wxArticleDiscussDao.findRootDiscuss(articleId));
        else
            return new ResultCode(0, "ok", wxArticleDiscussDao.findByArticleIdAndAndParentId(articleId, parentId));

    }

    //回复：openId,articleId,parentId
    //requestBody:content
    @PostMapping("/discussArticle/{articleId}/{openId}/{parentId}/{shareId}")
    @Transactional
    ResultCode discussArticle(@PathVariable("openId") String openId, @PathVariable("articleId") Long articleId
            , @PathVariable("parentId") Long parentId, @PathVariable("shareId") Long shareId
            , @RequestBody Map map) {
        //1、记录回复信息.
        WxArticleDiscuss wxArticleDiscuss = new WxArticleDiscuss();
        wxArticleDiscuss.setId(wxUtils.getSeqencesValue().longValue());
        wxArticleDiscuss.setArticleId(articleId);
        wxArticleDiscuss.setParentId(parentId);
        wxArticleDiscuss.setDiscussOpenId(openId);
        wxArticleDiscuss.setDiscussContent((String) map.get("content"));
        wxArticleDiscuss.setDiscussDate(new Date());
        wxArticleDiscuss.setShareId(shareId);
        WxArticleDiscuss result = wxArticleDiscussDao.save(wxArticleDiscuss);
        return new ResultCode(0, "ok", result);
    }


    //我的收藏：openId,articleId,shareId
    @GetMapping("/myFavoriteList/{openId}")
    ResultCode myFavoriteList(@PathVariable("openId") String openId) {
        return new ResultCode(0, "ok", wxArticleFavoriteDao.findByFavoriteOpenId(openId));
    }

}

//
//    <option value="10">新闻--统筹</option>
//    <option value="11">新闻--行业</option>
//    <option value="12">新闻--本地</option>
//    <option value="13">新闻--突发</option>
//    <option value="14">新闻--公司(宣传)</option>
//    <option value="15">新闻--产品(宣传)</option>
//    <option value="16">新闻--视频</option>
//    <option value="20">知识--软文</option>
//    <option value="21">知识--段子</option>
//    <option value="22">知识--健康</option>
//    <option value="23">知识--生活</option>
//    <option value="24">知识--方言</option>
//    <option value="25">知识--视频</option>