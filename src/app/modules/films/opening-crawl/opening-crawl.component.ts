import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Film } from 'src/app/data/schemas/film.model';
import { SwService } from 'src/app/data/service/sw.service';
import { SWStateService } from 'src/app/data/state/sw-state.service';

@Component({
  selector: 'app-opening-crawl',
  templateUrl: './opening-crawl.component.html',
  styleUrls: ['./opening-crawl.component.scss'],
})
export class OpeningCrawlComponent implements OnInit {
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
  filmDetail$: Observable<Film> = this.swStateService.filmDetail$;

  /**
   * se llama manualmente al elemento para tener la data ya cargada
   */
  ngOnInit(): void {
    let ID = this.route.snapshot.params['ID'];
    let film = {};
    this.filmDetail$.subscribe((result) => (film = result));
    if (ID && !film) {
      this.loadFilm(ID);
    }
  }
  /**
   * llamada al servicio
   * @param id variable para llamar al elemento
   */
  loadFilm(id: string) {
    this.swService.loadSpecificData('films', +id).subscribe({
      next: (result: Film) => {
        this.swStateService.setElement(result, 'film');
      },
      error: (e) => {
        console.log(['error', 'ha ocurrido un error']);
        this.toastr.error(
          'Ha ocurrido un error cargando la información de la película',
          'Error',
          {
            timeOut: 3000,
          }
        );
        this.router.navigate(['/films/list']);
      },
    });
  }
  /**
   * regresa a la pantalla anterior
   */
  onBack() {
    this.location.back();
  }
}
