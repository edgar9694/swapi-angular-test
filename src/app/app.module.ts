import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { SwService } from './data/service/sw.service';
import { StarshipsComponent } from './modules/starships/starships.component';
import { PeopleComponent } from './modules/people/people.component';
import { FilmsComponent } from './modules/films/films.component';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from './shared/shared.module';
@NgModule({
  declarations: [
    AppComponent,
    StarshipsComponent,
    PeopleComponent,
    FilmsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    SharedModule,
  ],
  providers: [SwService],
  bootstrap: [AppComponent],
})
export class AppModule {}
