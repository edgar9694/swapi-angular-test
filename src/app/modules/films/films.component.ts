import { Component, OnInit } from '@angular/core';
import { SWStateService } from 'src/app/data/state/sw-state.service';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.scss'],
})
export class FilmsComponent {
  constructor(private swStateService: SWStateService) {}
  /**
   * variable que activa la animación de carga mientras el servicio no este listo
   */
  isLoading$ = this.swStateService.filmsIsLoading$;
}
