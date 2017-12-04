import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
// import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import {HttpClient} from "@angular/common/http";
import {WxCodeService} from "../../wx-code.service";
import {ResultCode} from "../../result-code";
import {Observable} from '_rxjs@5.5.2@rxjs/Observable';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})

export class ArticleComponent implements OnInit {
  wxArticle: any;
  qrCodeUrl:string;
  wxQrCodeUrl:string;

  constructor(private route: ActivatedRoute, private  httpClient: HttpClient, private  wxCodeService: WxCodeService) {
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

    this.getQrCodeUrl().then(x=>{this.qrCodeUrl=this.wxCodeService.baseUrl+"/public/show_pict/"+x;console.log("qrCodeUrl="+this.qrCodeUrl);});
    this.getWxQrCodeUrl().then(x=>this.wxQrCodeUrl=x)

  }

  getQrCodeUrl():Promise<string> {
    let imgUrl = this.wxCodeService.baseUrl + "/public/article/qrCodeIdByShareId/" + this.wxCodeService.getShareId();
    console.log("imgUrl="+imgUrl);
     return this.httpClient.get<ResultCode>(imgUrl).map(x=> x.data ).toPromise();
  }
// /public/userPermQrCode/{openId}
  getWxQrCodeUrl():Promise<any> {
    let imgUrl:any; //this.wxCodeService.baseUrl + "/public/userPermQrCode/" + ;
    console.log("imgUrl="+imgUrl);
   return this.wxCodeService.getWxUser()
      .then(x=>imgUrl=this.wxCodeService.baseUrl + "/public/userPermQrCode/"+x.openId)
      .then(y=>this.httpClient.get<ResultCode>(y).map(z=> z.data).toArray)

   // return this.httpClient.get<ResultCode>(imgUrl).map(x=> x.data).toPromise();
  }

  getDate(): Date {
    return (new Date());
  }

}
