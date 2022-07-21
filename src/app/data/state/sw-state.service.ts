import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { People } from '../schemas/people.model';
import { Planet } from '../schemas/planet.model';
import { ApiResponse, ResultModel } from '../schemas/api.model';
import { Starship } from '../schemas/starship.model';
import { SwService } from '../service/sw.service';
import { StateService } from './state.service';
import { Film } from '../schemas/film.model';
import { ToastrService } from 'ngx-toastr';

/**
 * Creando el estado para almacenar la información
 */
interface SWState {
  selectedStarship: Starship;
  starships: {
    isLoading: boolean;
    list: Starship[];
    count: number;
    loaded: boolean;
    error: boolean;
  };
  selectedPerson: People;
  people: {
    isLoading: boolean;
    list: People[];
    count: number;
    loaded: boolean;
    error: boolean;
  };
  selectedFilm: Film;
  films: {
    isLoading: boolean;
    list: Film[];
    count: number;
    loaded: boolean;
    error: boolean;
  };
}
/**
 * Creando el valor inicial del estado
 */
const initialState: SWState = {
  selectedStarship: null!,
  starships: {
    isLoading: true,
    list: [],
    count: 0,
    loaded: false,
    error: false,
  },
  selectedPerson: null!,
  people: {
    isLoading: true,
    list: [],
    count: 0,
    loaded: false,
    error: false,
  },
  selectedFilm: null!,
  films: {
    isLoading: true,
    list: [],
    count: 0,
    loaded: false,
    error: false,
  },
};

@Injectable({
  providedIn: 'root',
})
export class SWStateService extends StateService<SWState> {
  /**
   * selectores para el estado de las naves
   */
  starshipsIsLoading$: Observable<boolean> = this.select(
    (state) => this.state.starships.isLoading
  );
  starshipsList$: Observable<Starship[]> = this.select(
    (state) => this.state.starships.list
  );

  starshipsDetail$: Observable<Starship> = this.select(
    (state) => this.state.selectedStarship
  );

  starshipLoaded$: Observable<boolean> = this.select(
    (state) => this.state.starships.loaded
  );

  starshipError$: Observable<boolean> = this.select(
    (state) => this.state.starships.error
  );

  /**
   * selectores para el estado de las películas
   */
  filmsIsLoading$: Observable<boolean> = this.select(
    (state) => this.state.starships.isLoading
  );

  filmsList$: Observable<Film[]> = this.select(
    (state) => this.state.films.list
  );

  filmDetail$: Observable<Film> = this.select(
    (state) => this.state.selectedFilm
  );

  filmsLoaded$: Observable<boolean> = this.select(
    (state) => this.state.films.loaded
  );

  filmsError$: Observable<boolean> = this.select(
    (state) => this.state.films.error
  );

  /**
   * selectores para el estado de los personajes
   */
  PeopleIsLoading$: Observable<boolean> = this.select(
    (state) => this.state.people.isLoading
  );

  peopleList$: Observable<People[]> = this.select(
    (state) => this.state.people.list
  );

  personDetail$: Observable<People> = this.select(
    (state) => this.state.selectedPerson
  );

  peopleLoaded$: Observable<boolean> = this.select(
    (state) => this.state.people.loaded
  );

  peopleError$: Observable<boolean> = this.select(
    (state) => this.state.people.error
  );
  constructor(private swService: SwService, private toastr: ToastrService) {
    super(initialState);
    this.firstCall();
  }

  incrementPage: number = 0;
  resultUrl: string = environment.baseURL; //+ 'starships/';
  orderCallApi = ['', 'films', 'starships', 'people'];
  resultUrls: ApiResponse = {
    films: environment.baseURL,
    people: environment.baseURL,
    planets: environment.baseURL,
    species: environment.baseURL,
    starships: environment.baseURL,
    vehicles: environment.baseURL,
  };

  /**
   * primera llamada al servicio para almacenar las urls
   */
  firstCall() {
    this.swService.loadDataWithUrl().subscribe({
      next: (result: ResultModel<any>) => {
        this.resultUrls = result as any;
        this.incrementPage++;
        this.loadCycleApi(this.orderCallApi[this.incrementPage]);
      },
      error: (e) => {
        console.log(['error', 'ha ocurrido un error']);
        this.errorSetState('');
      },
    });
  }

  /**
   * llamada especifica para traer los elementos del servidor
   * @param element variable que especifica que sección estamos llamando
   */
  loadCycleApi(element: string) {
    this.swService.loadDataWithUrl(this.resultUrls[element]).subscribe({
      next: (result: ResultModel<any>) => {
        this.filterState(element, result);
      },
      error: (e) => {
        this.incrementPage = 1;
        this.errorSetState(element);
      },
    });
  }

  /**
   * guardar la informacion en el estado
   * @param element variable que especifica que sección estamos guardando
   * @param result informacion recibida del servidor
   */
  filterState(element: string, result: ResultModel<any>) {
    switch (element) {
      case 'starships':
        let starships: Starship[] = result.results.map(
          (result) => new Starship(result)
        );
        this.setState({
          ...this.state,
          starships: {
            list: [...this.state.starships.list, ...starships],
            count: result.count,
            loaded: true,
            error: false,
            isLoading: true,
          },
        });

        if (this.state.starships.list.length == result.count) {
          this.setState({
            ...this.state,
            starships: {
              ...this.state.starships,
              isLoading: false,
            },
          });
        }

        if (result.next) {
          this.resultUrls[element] = result.next;
          this.loadCycleApi(element);
        } else {
          this.incrementPage++;
          this.loadCycleApi(this.orderCallApi[this.incrementPage]);
        }
        break;

      case 'people':
        let people: People[] = result.results.map(
          (result) => new People(result)
        );
        this.setState({
          ...this.state,

          people: {
            list: [...this.state.people.list, ...people],
            count: result.count,
            loaded: true,
            error: false,
            isLoading: true,
          },
        });
        if (this.state.people.list.length == result.count) {
          this.setState({
            ...this.state,
            people: {
              ...this.state.people,
              isLoading: false,
            },
          });
        }
        if (result.next) {
          this.resultUrls[element] = result.next;
          this.loadCycleApi(element);
        } else {
          this.incrementPage++;
          this.loadCycleApi(this.orderCallApi[this.incrementPage]);
        }
        break;
      case 'films':
        this.setState({
          ...this.state,

          films: {
            list: [...this.state.films.list, ...result.results],
            count: result.count,
            loaded: true,
            error: false,
            isLoading: true,
          },
        });
        if (this.state.films.list.length == result.count) {
          this.setState({
            ...this.state,
            films: {
              ...this.state.films,
              isLoading: false,
            },
          });
        }

        if (result.next) {
          this.resultUrls[element] = result.next;
          this.loadCycleApi(element);
        } else {
          this.incrementPage++;
          this.loadCycleApi(this.orderCallApi[this.incrementPage]);
        }
        break;
    }
  }

  /**
   * notificar que hubo un error en la llamada del servicio
   * @param element variable que especifica que sección estamos notificando el error
   */
  errorSetState(element: string) {
    switch (element) {
      case 'starships':
        this.setState({
          ...this.state,
          starships: {
            list: this.state.starships.list,
            count: this.state.starships.count,
            loaded: this.state.starships.count > 0 ? true : false,
            error: true,
            isLoading: false,
          },
        });
        this.toastr.error(
          'no se ha podido llamar toda la información de naves',
          'Error',
          {
            timeOut: 3000,
          }
        );
        break;
      case 'people':
        this.setState({
          ...this.state,
          people: {
            list: this.state.people.list,
            count: this.state.people.count,
            loaded: this.state.people.count > 0 ? true : false,
            error: true,
            isLoading: false,
          },
        });
        this.toastr.error(
          'no se ha podido llamar toda la información de personas',
          'Error',
          {
            timeOut: 3000,
          }
        );
        break;
      case 'films':
        this.setState({
          ...this.state,
          films: {
            list: this.state.films.list,
            count: this.state.films.count,
            loaded: this.state.films.count > 0 ? true : false,
            error: true,
            isLoading: false,
          },
        });
        this.toastr.error(
          'no se ha podido llamar toda la información de peliculas',
          'Error',
          {
            timeOut: 3000,
          }
        );
        break;
      default:
        this.setState({
          starships: {
            list: this.state.starships.list,
            count: this.state.starships.count,
            loaded: this.state.starships.count > 0 ? true : false,
            error: true,
            isLoading: false,
          },
          people: {
            list: this.state.people.list,
            count: this.state.people.count,
            loaded: this.state.people.count > 0 ? true : false,
            error: true,
            isLoading: false,
          },
          films: {
            list: this.state.films.list,
            count: this.state.films.count,
            loaded: this.state.films.count > 0 ? true : false,
            error: true,
            isLoading: false,
          },
        });
        this.toastr.error('Ha ocurrido un error con el servicio', 'Error', {
          timeOut: 3000,
        });
        break;
    }
  }

  /**
   * guarda en el estado cual ha sido el elemento seleccionado
   * @param selected elemento seleccionado de la lista
   * @param element variable que especifica que sección estamos notificando el error
   */
  setElement(selected: any, element: 'starship' | 'film' | 'person') {
    switch (element) {
      case 'starship':
        this.setState({ selectedStarship: selected });
        break;
      case 'film':
        this.setState({ selectedFilm: selected });
        break;
      case 'person':
        this.setState({ selectedPerson: selected });
        break;
      default:
        this.setState({ selectedStarship: selected });
        break;
    }
  }
}
