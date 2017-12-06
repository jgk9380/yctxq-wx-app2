import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
// import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import {HttpClient} from "@angular/common/http";
import {WxCodeService} from "../../wx-code.service";
import {ResultCode} from "../../result-code";
import {ToasterConfig, ToasterService} from 'angular2-toaster';

// import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})

export class ArticleComponent implements OnInit {
  wxArticle: any;
  qrCodeUrl: string;
  wxQrCodeUrl: string;
  articleOperate: ArticleOperate = new ArticleOperate();
  inputDialogShowed: boolean = false;

  toasterConfig: ToasterConfig = new ToasterConfig({
    showCloseButton: true,
    tapToDismiss: true,
    timeout: 1000,
    positionClass: "toast-center"
  });

  constructor(private route: ActivatedRoute, private  httpClient: HttpClient, private  wxCodeService: WxCodeService, private  toasterService: ToasterService) {

  }

  ngOnInit() {
    // this.route.paramMap
    //   .switchMap((params: ParamMap) => this.heroService.getHero(+params.get('id')))
    //   .subscribe(hero => this.hero = hero);

    //根据articleId初始化wxArticle数据。
    this.route.paramMap.map((params: ParamMap) => {
      return "" + params.get("id")
    })//return 不能少；
      .subscribe(x => {
        let articleUrl = this.wxCodeService.baseUrl + "/public/article/" + x;
        console.log("articleUrl=" + articleUrl);
        this.httpClient.get<ResultCode>(articleUrl).subscribe(data => {
            this.wxArticle = data.data;
            //todo 保存阅读次数及阅读记录数据
            ///readArticle/{articleId}/{openId}/{shareId}
            let articleReadHistoryUrl: string = this.wxCodeService.baseUrl + "/public/article/readArticle/" + this.wxArticle.id + "/" + this.wxCodeService.wxUser.openId + "/" + this.wxCodeService.getShareId();
            console.log("articleReadHistoryUrl=" + articleReadHistoryUrl);
            this.httpClient.post<ResultCode>(articleReadHistoryUrl, {})
              .toPromise()
              .then(x => console.log("readHistory returns:" + JSON.stringify(x)));
            //todo 初始化数据
            let initialStatusUrl: string = this.wxCodeService.baseUrl + "/public/article/initialStatus/" + this.wxArticle.id + "/" + this.wxCodeService.wxUser.openId;
            this.httpClient.get<ResultCode>(initialStatusUrl, {})
              .toPromise()
              .then(x => {
                this.articleOperate = x.data;
                console.log("x.data=" + JSON.stringify(x.data))
              });
          }
        )
      });

    //取传播二维码
    this.getQrCodeUrl().then(x => {
      this.qrCodeUrl = this.wxCodeService.baseUrl + "/public/show_pict/" + x;
      console.log("qrCodeUrl=" + this.qrCodeUrl);
    });

    //取微信二维码
    this.getWxQrCodeUrl().then(y => {
      this.wxQrCodeUrl = "https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=" + y.ticket;
      alert(this.wxQrCodeUrl)
    });


  }

  getQrCodeUrl(): Promise<string> {
    let imgUrl = this.wxCodeService.baseUrl + "/public/article/qrCodeIdByShareId/" + this.wxCodeService.getShareId();
    console.log("imgUrl=" + imgUrl);
    return this.httpClient.get<ResultCode>(imgUrl).map(x => x.data).toPromise();
  }

// /public/userPermQrCode/{openId}
  getWxQrCodeUrl(): Promise<any> {
    let imgUrl: any; //this.wxCodeService.baseUrl + "/public/userPermQrCode/" + ;
    console.log("imgUrl=" + imgUrl);
    return this.wxCodeService.getWxUser()
      .then(x => imgUrl = this.wxCodeService.baseUrl + "/public/userPermQrCode/" + x.openId)
      .then(y => this.httpClient.get<ResultCode>(y).map(z => z.data).toPromise())

    // return this.httpClient.get<ResultCode>(imgUrl).map(x=> x.data).toPromise();
  }

  getDate(): Date {
    return (new Date());
  }

  favriteArticle() {
    this.articleOperate.favorite = !this.articleOperate.favorite;
    if (this.articleOperate.favorite) {
      //favoriteArticle/{articleId}/{openId}/{shareId}
      let favoriteArticleUrl = this.wxCodeService.baseUrl + "/public/article/favoriteArticle/"
        + this.wxArticle.id + "/" + this.wxCodeService.wxUser.openId + "/" + this.wxCodeService.getShareId();
      console.log("favoriteArticleUrl=" + favoriteArticleUrl);
      this.httpClient.post<ResultCode>(favoriteArticleUrl, {})
        .toPromise()
        .then(x => {
            console.log("x=" + JSON.stringify(x));
            this.toasterService.pop({type: 'success', title: "ok", body: x.msg, showCloseButton: true,});
          }
        );
      this.wxArticle.favoriteCount = (this.wxArticle.favoriteCount || 0) + 1;
    }
    else {
      let cancelFavoriteArticleUrl = this.wxCodeService.baseUrl + "/public/article/cancelfavoriteArticle/"
        + this.wxArticle.id + "/" + this.wxCodeService.wxUser.openId;
      console.log("favoriteArticleUrl=" + cancelFavoriteArticleUrl);
      this.httpClient.post<ResultCode>(cancelFavoriteArticleUrl, {})
        .toPromise()
        .then(x => this.toasterService.pop({type: 'success', title: "ok", body: x.msg, showCloseButton: true,})
        );
      this.wxArticle.favoriteCount = this.wxArticle.favoriteCount - 1;
    }
  }

  likeArticle() {
    this.articleOperate.like = !this.articleOperate.like;

    if (this.articleOperate.like) {
      this.backLikeArticle();
      this.wxArticle.likeCount = (this.wxArticle.likeCount || 0) + 1;
    }
    else {
      this.backCancelLikeArticle();
      this.wxArticle.likeCount = this.wxArticle.likeCount - 1;
    }

    if (this.articleOperate.like) {
      if (this.articleOperate.hate) {
        this.articleOperate.hate = false;
        this.wxArticle.hateCount = (this.wxArticle.hateCount || 0) - 1;
        this.backCancelHateArticle();
      }
    }
    console.log("like=" + this.articleOperate.like + "  likeCoutnt=" + this.wxArticle.likeCount);

    // this.toasterService.pop({
    //   type: 'success',
    //   title: "ok",
    //   body: this.articleOperate.like ? "赞了一下" : "不赞了",
    //   showCloseButton: true,
    // });

  }

  backLikeArticle() {
    let likeArticleUrl = this.wxCodeService.baseUrl + "/public/article/likeArticle/"
      + this.wxArticle.id + "/" + this.wxCodeService.wxUser.openId + "/" + this.wxCodeService.getShareId();
    this.httpClient.post<ResultCode>(likeArticleUrl, {}).toPromise().then(x => this.toasterService.pop({
      type: 'success',
      title: "ok",
      body: x.msg,
      showCloseButton: true,
    }));
  }

  backCancelLikeArticle() {
    let cancelLikeArticleUrl = this.wxCodeService.baseUrl + "/public/article/cancelLikeArticle/"
      + this.wxArticle.id + "/" + this.wxCodeService.wxUser.openId;
    this.httpClient.post<ResultCode>(cancelLikeArticleUrl, {}).toPromise().then(x => this.toasterService.pop({
      type: 'success',
      title: "ok",
      body: x.msg,
      showCloseButton: true,
    }));
  }

  backHateArticle() {
    let hateArticleUrl = this.wxCodeService.baseUrl + "/public/article/hateArticle/"
      + this.wxArticle.id + "/" + this.wxCodeService.wxUser.openId + "/" + this.wxCodeService.getShareId();
    this.httpClient.post<ResultCode>(hateArticleUrl, {}).toPromise().then(x => this.toasterService.pop({
      type: 'success',
      title: "ok",
      body: x.msg,
      showCloseButton: true,
    }));
  }

  backCancelHateArticle() {
    let cancelHateArticleUrl = this.wxCodeService.baseUrl + "/public/article/cancelHateArticle/"
      + this.wxArticle.id + "/" + this.wxCodeService.wxUser.openId;
    this.httpClient.post<ResultCode>(cancelHateArticleUrl, {}).toPromise().then(x => this.toasterService.pop({
      type: 'success',
      title: "success",
      body: x.msg,
      showCloseButton: true,
    }));
  }


  hateArticle() {
    console.log("hate it ");
    this.articleOperate.hate = !this.articleOperate.hate
    if (this.articleOperate.hate) {
      this.wxArticle.hateCount = (this.wxArticle.hateCount || 0) + 1;
      this.backHateArticle();
      if (this.articleOperate.like) {
        this.articleOperate.like = false;
        this.wxArticle.likeCount = this.wxArticle.likeCount - 1;
        this.backCancelLikeArticle();
      }
    }
    else {
      this.backCancelHateArticle()
      this.wxArticle.hateCount = this.wxArticle.hateCount - 1;
    }


    // this.toasterService.pop({
    //   type: 'success',
    //   title: "ok",
    //   body: this.articleOperate.hate ? "踩了一下" : "不踩了",
    //   showCloseButton: true,
    // });
  }

  showReplyDialog() {
    this.inputDialogShowed = true;
  }

}


class ArticleOperate {
  favorite: boolean;
  like: boolean;
  hate: boolean;
}

