import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, CanActivate} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class JugadorService {

  constructor(private http: HttpClient) { }
  root: string = "http://192.168.50.10:3333/";
  //una sola ruta
  jugador(nickname: string, password: string, url: string) {

    let jugador = {
      nickname: nickname,
      password: password
    }

    return this.http.post(this.root + url, jugador, {responseType: 'text'});
  }

  createroom(nombre_sala:string){
    let juego= {nombre_sala :nombre_sala}
    return this.http.post(this.root+'createroom',juego, {responseType: 'text'});   
  }

}
