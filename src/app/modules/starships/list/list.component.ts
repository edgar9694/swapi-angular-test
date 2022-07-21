import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Starship } from 'src/app/data/schemas/starship.model';
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
  starshipsList$: Observable<Starship[]> = this.swStateService.starshipsList$;
  /**
   * indica si la lista se ha cargado completamente
   */
  starshipLoaded$: Observable<boolean> = this.swStateService.starshipLoaded$;
  /**
   * notifica de un error en la llamada del servicio
   */
  starshipError$: Observable<boolean> = this.swStateService.starshipError$;
  /**
   * variabla para dar una vista del elemento seleccionado
   */
  titleStarship: string = '';
  /**
   * selecciona el elemento para guardarse en el estado especifico
   * @param starship variable que contiene el elemento
   */

  selectStarship(starship: Starship) {
    this.swStateService.setElement(starship, 'starship');
    this.router.navigate(['/starships/detail', starship.id]);
  }
  /**
   * asigna el nombre del elemento para la previsualización
   * @param starship variable que contiene el elemento
   */
  previewStarship(starship: Starship) {
    this.titleStarship = starship.name;
  }

  /**
   * recarga la página
   */
  reloadPage() {
    window.location.reload();
  }

  /**
   * regresa a la pagina de selección de vista
   */
  onBack() {
    this.router.navigate(['/index']);
  }
}
