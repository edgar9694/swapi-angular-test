import { Component, OnInit } from '@angular/core';
import { SWStateService } from 'src/app/data/state/sw-state.service';

@Component({
  selector: 'app-starships',
  templateUrl: './starships.component.html',
  styleUrls: ['./starships.component.scss'],
})
export class StarshipsComponent {
  constructor(private swStateService: SWStateService) {}
  /**
   * variable que activa la animación de carga mientras el servicio no este listo
   */
  isLoading$ = this.swStateService.starshipsIsLoading$;
}
