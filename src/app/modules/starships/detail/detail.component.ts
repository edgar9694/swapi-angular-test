import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Starship } from 'src/app/data/schemas/starship.model';
import { SwService } from 'src/app/data/service/sw.service';
import { SWStateService } from 'src/app/data/state/sw-state.service';

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
  starshipDetail$: Observable<Starship> = this.swStateService.starshipsDetail$;
  /**
   * se llama manualmente al elemento para tener la data ya cargada
   */
  ngOnInit(): void {
    let ID = this.route.snapshot.params['ID'];
    let starhhip = {};
    this.starshipDetail$.subscribe((result) => (starhhip = result));
    if (ID && !starhhip) {
      this.loadStarship(ID);
    }
  }

  /**
   * llamada al servicio
   * @param id variable para llamar al elemento
   */
  loadStarship(id: string) {
    this.swService.loadSpecificData('starships', +id).subscribe({
      next: (result: Starship) => {
        console.log(result);
        this.swStateService.setElement(result, 'starship');
      },
      error: (e) => {
        console.log(['error', 'ha ocurrido un error']);
        this.toastr.error(
          'Ha ocurrido un error cargando la información de la nave',
          'Error',
          {
            timeOut: 3000,
          }
        );
        this.router.navigate(['/starships/list']);
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
        url.replace('https://swapi.dev/api/people/', '').replace('/', '') ?? ''
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
