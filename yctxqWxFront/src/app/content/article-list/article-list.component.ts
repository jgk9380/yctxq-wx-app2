///<reference path="../../result-code.ts"/>
import {Component, OnInit} from '@angular/core';
import {WxCodeService} from "../../wx-code.service";
import {HttpClient} from "@angular/common/http";
import {ResultCode} from "../../result-code";
import {Router} from '@angular/router';
import {WxArticleService} from "../article-service";

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {
  wxUser: {openId:string};

  constructor(public wxCodeService: WxCodeService, private  httpClient: HttpClient,private  router:Router ,public  wxArticleService:WxArticleService) {
  }

  ngOnInit() {
    var x = this.httpClient.get<ResultCode>(this.wxCodeService.getCodeToWxUserUrl() + this.wxCodeService.getCode()).subscribe(data => {
        this.wxUser = data["data"];
        this.wxArticleService.getNewsArticle(this.wxUser);
      }
    );
  }

  getImgUrl(imgUrl:string):string{
    return "http://www.cu0515.com:8030/wd"+imgUrl;
  }

  getDate():Date{
    return (new Date());
  }

  clickTitle(id:number){
    console.log("clicked "+id);
    this.router.navigate(['/content/article', id]);
  }
}
