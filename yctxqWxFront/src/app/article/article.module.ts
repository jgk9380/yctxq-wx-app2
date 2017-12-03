import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ArticleListComponent} from './article-list/article-list.component';

import {NewsComponent} from './news/news.component';
import {KnowledgesComponent} from './knowledges/knowledges.component';
import {MainComponent} from './main.component';
import {ArticleRouterModule} from "./article.router";

@NgModule({
  imports: [
    CommonModule,
    ArticleRouterModule,
    // HttpClientModule
  ],
  declarations: [
    ArticleListComponent,
    NewsComponent,
    KnowledgesComponent,
    MainComponent
  ]
})

export class ArticleModule {
}
