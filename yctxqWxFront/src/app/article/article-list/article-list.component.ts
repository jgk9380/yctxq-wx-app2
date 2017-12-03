import {Component, OnInit} from '@angular/core';
import {WxCodeService} from "../../wx-code.service";
import {HttpClient} from "@angular/common/http";
import {ResultCode} from "../../result-code";

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {
  wxUser: any;
  articleList:any[];

  constructor(private wxCodeService: WxCodeService, private  httpClient: HttpClient) {
  }

  ngOnInit() {
    var x = this.httpClient.get(this.wxCodeService.getCodeToWxUserUrl() + this.wxCodeService.code).subscribe(data => {
        var tempResult: any = data;
        this.wxUser = tempResult.data;
        console.log("wxUser=" + JSON.stringify(this.wxUser));
        this.httpClient.get<ResultCode>(this.wxCodeService.baseUrl + "/public/article/newsList/" + this.wxUser.wxUserOpenId).subscribe(data1 => {
          this.articleList=data1.data;
          console.log("artcleList="+JSON.stringify(this.articleList));
        })

      }
    );
  }
  getImgUrl(imgUrl:string){
    return "http://www.cu0515.com:8030/wd"+imgUrl;
  }

}
