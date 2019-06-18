import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, CanActivate} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class JugadorService {

  constructor(private http: HttpClient) { }
  root: string = "http://127.0.0.1:3333/";
  //una sola ruta
  jugador(nickname: string, password: string, url: string) {

    let jugador = {
      nickname: nickname,
      password: password
    }

    return this.http.post(this.root + url, jugador, {responseType: 'text'});
  }
}
