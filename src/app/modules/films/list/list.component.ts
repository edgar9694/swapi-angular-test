import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Film } from 'src/app/data/schemas/film.model';
import { SWStateService } from 'src/app/data/state/sw-state.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  constructor(private swStateService: SWStateService, private router: Router) {}
  /**
   * lista de elementos guardados en el estado
   */
  filmsList$: Observable<Film[]> = this.swStateService.filmsList$;
  /**
   * indica si la lista se ha cargado completamente
   */
  filmsLoaded$: Observable<boolean> = this.swStateService.filmsLoaded$;
  /**
   * notifica de un error en la llamada del servicio
   */
  filmError$: Observable<boolean> = this.swStateService.filmsError$;
  /**
   * selecciona el elemento para guardarse en el estado especifico
   * @param film variable que contiene el elemento
   */
  selectFilm(film: Film) {
    this.swStateService.setElement(film, 'film');
    this.router.navigate(['/films/detail', film.episode_id]);
  }
  /**
   * recarga la página
   */
  reloadPage() {
    window.location.reload();
  }
}
