import { Component, OnInit } from '@angular/core';
import {ResultCode} from "../../result-code";
import {WxCodeService} from "../../wx-code.service";
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-news-list',
  // templateUrl: './news-list.component.html',
  // styleUrls: ['./news-list.component.css']
  templateUrl: '../article-list/article-list.component.html',
  styleUrls: ['../article-list/article-list.component.css']
})
export class NewsListComponent implements OnInit {
  wxUser: {openId:string};
  articleList:any[];

  constructor(public wxCodeService: WxCodeService, private  httpClient: HttpClient,private  router:Router) {
  }

  ngOnInit() {
    var x = this.httpClient.get<ResultCode>(this.wxCodeService.getCodeToWxUserUrl() + this.wxCodeService.getCode()).subscribe(data => {
        this.wxUser = data["data"];
        //console.log(`wxUser=${JSON.stringify(this.wxUser)}`);
        this.httpClient.get<ResultCode>(this.wxCodeService.baseUrl + "/public/article/newsList/" + this.wxUser.openId).subscribe(data1 => {
          console.log("artcleList="+JSON.stringify(data1));
          this.articleList=data1.data;
          //console.log("artcleList="+JSON.stringify(this.articleList));
        })
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
