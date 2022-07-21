import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { People } from 'src/app/data/schemas/people.model';
import { SwService } from 'src/app/data/service/sw.service';
import { SWStateService } from 'src/app/data/state/sw-state.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  constructor(
    private swService: SwService,
    private swStateService: SWStateService,
    private location: Location,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) {}
  /**
   * Variable que contiene al elemento para su visualización
   */
  personDetail$: Observable<People> = this.swStateService.personDetail$;
  /**
   * se llama manualmente al elemento para tener la data ya cargada
   */
  ngOnInit(): void {
    let ID = this.route.snapshot.params['ID'];
    let people = {};
    this.personDetail$.subscribe((result) => (people = result));
    if (ID && !people) {
      this.loadPerson(ID);
    }
  }
  /**
   * llamada al servicio
   * @param id variable para llamar al elemento
   */
  loadPerson(id: string) {
    this.swService.loadSpecificData('people', +id).subscribe({
      next: (result: People) => {
        this.swStateService.setElement(result, 'person');
      },
      error: (e) => {
        console.log(['error', 'ha ocurrido un error']);
        this.toastr.error(
          'Ha ocurrido un error cargando la información del personaje',
          'Error',
          {
            timeOut: 3000,
          }
        );
        this.router.navigate(['/people/list']);
      },
    });
  }
  /**
   * filtra los elementos recibidos por sección para llevarlos a su vista correspondiente
   * @param url variable con el texto a filtrar
   * @param filter la sección a la que pertenece
   * @returns
   */
  filterId(url: string, filter: string): string {
    if (filter == 'films') {
      return (
        url.replace('https://swapi.dev/api/films/', '').replace('/', '') ?? ''
      );
    } else {
      return (
        url.replace('https://swapi.dev/api/starships/', '').replace('/', '') ??
        ''
      );
    }
  }
  /**
   * regresa a la pantalla anterior
   */
  onBack() {
    this.location.back();
  }
}
