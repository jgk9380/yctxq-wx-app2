import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ArticleListComponent} from './article-list/article-list.component';

import {ArticleComponent} from './article/article.component';

import {ContentMainComponent} from './content-main.component';
import {ContentRouterModule} from "./content.router";
import {ToasterService, ToasterModule} from "angular2-toaster";
@NgModule({
  imports: [
    CommonModule,
    ContentRouterModule,
    // HttpClientModule
    ToasterModule
  ],
  declarations: [
    ArticleListComponent,
    ArticleComponent,
    ContentMainComponent
  ],
  providers:[ToasterService]
})

export class ContentModule {
}
