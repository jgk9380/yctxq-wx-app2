import {NgModule} from '@angular/core';
import {RouterModule, Routes, PreloadAllModules} from '@angular/router';

import {ArticleListComponent} from "./article-list/article-list.component";
import {ArticleComponent} from "./article/article.component";
import {ContentMainComponent} from "./content-main.component";



const routes: Routes = [
  {
    path: '', component:ContentMainComponent,
    children: [
      {path: 'list', component: ArticleListComponent},
      {path: 'article/:id', component: ArticleComponent},
      // {path: 'knowledge', component: KnowledgesComponent}
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

export class ContentRouterModule {

}
