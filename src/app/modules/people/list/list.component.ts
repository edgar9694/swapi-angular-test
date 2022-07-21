import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { People } from 'src/app/data/schemas/people.model';
import { SWStateService } from 'src/app/data/state/sw-state.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  constructor(
    private swStateService: SWStateService,
    private router: Router,
    private location: Location
  ) {}
  /**
   * lista de elementos guardados en el estado
   */
  peopleList$: Observable<People[]> = this.swStateService.peopleList$;
  /**
   * indica si la lista se ha cargado completamente
   */
  peopleLoaded$: Observable<boolean> = this.swStateService.peopleLoaded$;
  /**
   * notifica de un error en la llamada del servicio
   */
  peopleError$: Observable<boolean> = this.swStateService.peopleError$;
  /**
   * variabla para dar una vista del elemento seleccionado
   */
  titlePerson: string = '';

  /**
   * selecciona el elemento para guardarse en el estado especifico
   * @param person variable que contiene el elemento
   */
  selectPeople(person: People) {
    this.swStateService.setElement(person, 'person');
    this.router.navigate(['/people/detail', person.id]);
  }

  /**
   * asigna el nombre del elemento para la previsualización
   * @param person variable que contiene el elemento
   */
  previewPeople(person: People) {
    this.titlePerson = person.name;
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
