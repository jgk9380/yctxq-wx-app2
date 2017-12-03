import {NgModule} from '@angular/core';
import {RouterModule, Routes, PreloadAllModules} from '@angular/router';

import {ArticleListComponent} from "./article-list/article-list.component";
import {NewsComponent} from "./news/news.component";
import {KnowledgesComponent} from "./knowledges/knowledges.component";
import {MainComponent} from "./main.component";



const routes: Routes = [
  {
    path: '', component:MainComponent,
    children: [
      {path: 'list', component: ArticleListComponent},
      {path: 'news', component: NewsComponent},
      {path: 'knowledge', component: KnowledgesComponent}
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ]
})

export class ArticleRouterModule {

}
