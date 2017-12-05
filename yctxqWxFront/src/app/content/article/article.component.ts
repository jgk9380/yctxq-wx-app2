import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
// import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import {HttpClient} from "@angular/common/http";
import {WxCodeService} from "../../wx-code.service";
import {ResultCode} from "../../result-code";
import {ToasterService,ToasterConfig} from 'angular2-toaster';

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
  articleOperate: ArticleOperate=new ArticleOperate();

  toasterConfig: ToasterConfig =    new ToasterConfig({
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
    this.route.paramMap
      .map((params: ParamMap) => {
        console.log("id=" + params.get("id"));
        return "" + params.get("id");
      }).subscribe(x => {
      //console.log("x in subscribe="+x);
      let articleUrl = this.wxCodeService.baseUrl + "/public/article/" + x;
      console.log("articleUrl=" + articleUrl);
      this.httpClient.get<ResultCode>(articleUrl).subscribe(
        data => {
          this.wxArticle = data.data;
        }
      )
    });

    this.getQrCodeUrl().then(x => {
      this.qrCodeUrl = this.wxCodeService.baseUrl + "/public/show_pict/" + x;
      console.log("qrCodeUrl=" + this.qrCodeUrl);
    });
    this.getWxQrCodeUrl().then(x => this.wxQrCodeUrl = "https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=" + x.ticket)

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
    if (this.articleOperate.favorite)
      this.wxArticle.favoriteCount = (this.wxArticle.favoriteCount||0)+1;
    else
      this.wxArticle.favoriteCount = this.wxArticle.favoriteCount - 1;
    this.toasterService.pop({
      type: 'success',
      title: "ok",
      body: this.articleOperate.favorite ?"收藏成功":"不收藏了",
      showCloseButton: true,
    });
  }

  likeArticle() {
    this.articleOperate.like = !this.articleOperate.like;

    if (this.articleOperate.like)
      this.wxArticle.likeCount = (this.wxArticle.likeCount||0)+ 1;
    else
      this.wxArticle.likeCount = this.wxArticle.likeCount - 1;

    if (this.articleOperate.like) {
      if (this.articleOperate.hate){
        this.articleOperate.hate=false;
        this.wxArticle.hateCount = (this.wxArticle.hateCount||0) -1;
      }
    }
    console.log("like="+this.articleOperate.like+"  likeCoutnt="+this.wxArticle.likeCount);
    this.toasterService.pop({
      type: 'success',
      title: "ok",
      body: this.articleOperate.like ?"赞了一下":"不赞了",
      showCloseButton: true,
    });
  }

  hateArticle() {
    console.log("hate it ");
    this.articleOperate.hate = !this.articleOperate.hate
    if (this.articleOperate.hate)
      this.wxArticle.hateCount = (this.wxArticle.hateCount||0)+1;
    else
      this.wxArticle.hateCount = this.wxArticle.hateCount - 1;

    if (this.articleOperate.hate) {
      if (this.articleOperate.like) {
        this.articleOperate.like=false;
        this.wxArticle.likeCount = this.wxArticle.likeCount - 1;
      }
    }
    this.toasterService.pop({
      type: 'success',
      title: "ok",
      body: this.articleOperate.hate ?"踩了一下":"不踩了",
      showCloseButton: true,
    });
  }


}


class ArticleOperate {
  favorite: boolean;
  like: boolean;
  hate: boolean;
}

