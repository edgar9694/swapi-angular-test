import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StarshipsRoutingModule } from './starships-routing.module';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ListComponent, DetailComponent],
  imports: [CommonModule, StarshipsRoutingModule],
})
export class StarshipsModule {}
