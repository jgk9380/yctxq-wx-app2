import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ResultCode} from "../result-code";
import "rxjs/add/operator/map"
import {WxCodeService} from "../wx-code.service";
import {Router} from '@angular/router';

@Injectable()
export class WxArticleService {
  articleList: any[];

  constructor(public wxCodeService: WxCodeService, private  httpClient: HttpClient, private  router: Router) {
  }

  getNewsArticle(wxUser: any) {
    this.httpClient.get<ResultCode>(this.wxCodeService.baseUrl + "/public/article/newsList/" + wxUser.openId).subscribe(data1 => {
      console.log("artcleList=" + JSON.stringify(data1));
      this.articleList = data1.data;
      //console.log("artcleList="+JSON.stringify(this.articleList));
    });
  }
}
