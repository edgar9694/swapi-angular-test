import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailComponent } from './detail/detail.component';
import { FilmsComponent } from './films.component';
import { ListComponent } from './list/list.component';
import { OpeningCrawlComponent } from './opening-crawl/opening-crawl.component';

const routes: Routes = [
  {
    path: '',
    component: FilmsComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      {
        path: 'list',
        component: ListComponent,
      },
      {
        path: 'detail/:ID',
        component: DetailComponent,
      },
      {
        path: 'opening/:ID',
        component: OpeningCrawlComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FilmsRoutingModule {}
