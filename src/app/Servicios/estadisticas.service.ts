import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import * as conecta from '../Modelos/Urls';
@Injectable({
  providedIn: 'root'
})
export class EstadisticasService {
  root: string = conecta.url_http;
  estadistica: string = "estadisticas/";
  constructor(private conexion: HttpClient) { }

  partidas( id) {
    return this.conexion.get(this.root + this.estadistica + id , {responseType: 'json'});
  }

}
