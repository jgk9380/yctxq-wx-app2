import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {Observable} from "rxjs";

@Injectable()
export class WxCodeService {
  //baseUrl = "http://www.cu0515.com";
  baseUrl = "http://127.0.0.1:8888";
  code:string;
  wxUser:any;
  constructor(private  httpClient:HttpClient){}
  // initWxUser():Observable<any>{
  //   //alert("begin initWxUser.code="+this.code)
  //   // var x = this.httpClient.get(this.baseUrl + "/wx/codeToOpenId/" + this.code).subscribe(data => {
  //   //     var tempResult: any = data;
  //   //     this.wxUser = tempResult.data;
  //   //     alert("begin initWxUser. wxUser="+JSON.stringify(this.wxUser));
  //   //     //this.newTele = this.wxUser.tele;
  //   //     console.log("wxUser=" + JSON.stringify(this.wxUser));
  //   //   }
  //   // );
  //   var x = this.httpClient.get(this.baseUrl + "/wx/codeToOpenId/" + this.code).map(data => {
  //       var tempResult: any = data;
  //       this.wxUser = tempResult.data;
  //       //alert("begin initWxUser. wxUser="+JSON.stringify(this.wxUser));
  //       //this.newTele = this.wxUser.tele;
  //       console.log("wxUser=" + JSON.stringify(this.wxUser));
  //       return this.wxUser;
  //     }
  //   );
  //   return x;
  // }

  getRequestParams() {
    var url = "" + window.location; //获取url中"?"符后的字串
    var theRequest = new Object();
    console.log("url=" + url);
    console.log("url.indexOf(?)=" + url.indexOf("?"));
    if (url.indexOf("?") != -1) {
      var str = url.substr(url.indexOf("?") + 1);
      if (str.indexOf("#") != -1) {
        //截掉后部
        str = str.substring(0, str.indexOf("#"))
      }
      console.log("str=   " + str);
      var strs = str.split("&");
      for (var i = 0; i < strs.length; i++) {
        //theRequest[strs[i].split("=")[0]] = window.unescape(strs[i].split("=")[1]);
        theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
      }
    }
    console.log("theRequest=" + JSON.stringify(theRequest))
    return theRequest;
  }


  getCodeToWxUserUrl(){
    if(!this.code||this.code.length==7)
      return this.baseUrl+  "/wx/codeToOpenIdTestTest/";
    else
      return this.baseUrl+ "/wx/codeToOpenId/";
  }
}
