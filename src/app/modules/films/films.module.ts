import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilmsRoutingModule } from './films-routing.module';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { OpeningCrawlComponent } from './opening-crawl/opening-crawl.component';


@NgModule({
  declarations: [
    ListComponent,
    DetailComponent,
    OpeningCrawlComponent
  ],
  imports: [
    CommonModule,
    FilmsRoutingModule
  ]
})
export class FilmsModule { }
