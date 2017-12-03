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
    let code = this.wxCodeService.getRequestParams()["code"];

    if(!code)
      //todo to删除,用于测试
      code="8346102";

    console.log("code="+code)
    this.wxCodeService.code = code;
    // this.wxCodeService.initWxUser();
    //alert("in app.component:"+JSON.stringify(this.wxCodeService.wxUser));
  }

}

