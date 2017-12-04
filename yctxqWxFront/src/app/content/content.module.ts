import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ArticleListComponent} from './article-list/article-list.component';

import {ArticleComponent} from './article/article.component';

import {ContentMainComponent} from './content-main.component';
import {ContentRouterModule} from "./content.router";

@NgModule({
  imports: [
    CommonModule,
    ContentRouterModule,
    // HttpClientModule
  ],
  declarations: [
    ArticleListComponent,
    ArticleComponent,
    ContentMainComponent
  ]
})

export class ContentModule {
}
