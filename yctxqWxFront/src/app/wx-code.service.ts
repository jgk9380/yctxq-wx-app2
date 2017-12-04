import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {Observable} from "rxjs";
import {ResultCode} from "./result-code";
import "rxjs/add/operator/map"
@Injectable()
export class WxCodeService {
  //baseUrl = "http://www.cu0515.com";
  baseUrl = "http://127.0.0.1:8888";
  //appCommit中初始化
  code:string;
  shareId:number;
  wxUser:any;//app中初始化

  getWxUser():Promise<any>{
    return  this.httpClient.get<ResultCode>(this.getCodeToWxUserUrl() +this.getCode()).map(data =>data.data).toPromise();
  }

  getShareId():number{
    if(!this.shareId)
      return 0;
    return this.shareId;
  }
  getCode():string{
    if(!this.code)
      return "8346102";
    return this.code;
  }

  constructor(private  httpClient:HttpClient){}
   getRequestParams() {
    var url = "" + window.location; //获取url中"?"符后的字串
    var theRequest = new Object();
    console.log("url=" + url);
    // console.log("url.indexOf(?)=" + url.indexOf("?"));
    if (url.indexOf("?") != -1) {
      var str = url.substr(url.indexOf("?") + 1);
      if (str.indexOf("#") != -1) {
        str = str.substring(0, str.indexOf("#"))  //截掉后部
      }
      console.log("str=   " + str);
      var strs = str.split("&");
      for (var i = 0; i < strs.length; i++) {
        //theRequest[strs[i].split("=")[0]] = window.unescape(strs[i].split("=")[1]);
        theRequest[strs[i].split("=")[0]] = decodeURIComponent(strs[i].split("=")[1]);
      }
    }
    console.log("theRequest=" + JSON.stringify(theRequest))
    return theRequest;
  }


  getCodeToWxUserUrl(){
    if(!this.getCode()||this.getCode().length==7)
      return this.baseUrl+  "/wx/codeToOpenIdTestTest/";
    else
      return this.baseUrl+ "/wx/codeToOpenId/";
  }
}
