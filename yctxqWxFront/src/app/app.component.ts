import {Component, OnInit} from "@angular/core";
import {WxCodeService} from "./wx-code.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';
  constructor(private wxCodeService: WxCodeService) {

  }

  ngOnInit(){
    this.wxCodeService.code = this.wxCodeService.getRequestParams()["code"];
    this.wxCodeService.shareId== this.wxCodeService.getRequestParams()["shareId"];
    //初始化wxUser，供其他组件调用。
    this.wxCodeService.getWxUser().then(x=>{this.wxCodeService.wxUser=x;console.log("wxUser.nickname="+this.wxCodeService.wxUser.nickname);});
  }

}

