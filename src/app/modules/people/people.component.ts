import { Component, OnInit } from '@angular/core';
import { SWStateService } from 'src/app/data/state/sw-state.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss'],
})
export class PeopleComponent {
  constructor(private swStateService: SWStateService) {}
  /**
   * variable que activa la animación de carga mientras el servicio no este listo
   */
  isLoading$ = this.swStateService.PeopleIsLoading$;
}
