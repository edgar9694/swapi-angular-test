import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ResultModel } from '../schemas/api.model';

@Injectable({
  providedIn: 'root',
})
export class SwService {
  constructor(private http: HttpClient) {}

  /**
   * llamar al servicio con url modificada
   * @param url variable que contiene la url para el servicio
   * @returns
   */
  loadDataWithUrl(url: string = environment.baseURL) {
    return this.http.get<ResultModel<any>>(url);
  }

  /**
   * llamar al servicio por un elemento en especifico
   * @param topic indica la seccion que estamos llamando
   * @param id indica el id del elemento
   * @returns
   */
  loadSpecificData(topic: string, id: number) {
    return this.http.get<any>(
      `${environment.baseURL + topic + '/' + id + '/'}`
    );
  }
}
