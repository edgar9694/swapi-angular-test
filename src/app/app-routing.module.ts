import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'starships',
    loadChildren: () =>
      import('./modules/starships/starships.module').then(
        (m) => m.StarshipsModule
      ),
  },
  {
    path: 'people',
    loadChildren: () =>
      import('./modules/people/people.module').then((m) => m.PeopleModule),
  },
  {
    path: 'films',
    loadChildren: () =>
      import('./modules/films/films.module').then((m) => m.FilmsModule),
  },
  {
    path: 'index',
    loadChildren: () =>
      import('./modules/index/index.module').then((m) => m.IndexModule),
  },
  { path: '', redirectTo: 'starships', pathMatch: 'full' },
  { path: '**', redirectTo: 'starships', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
