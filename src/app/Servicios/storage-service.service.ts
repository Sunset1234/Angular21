import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Carta } from '../Modelos/Carta';
import Ws from '@adonisjs/websocket-client';

@Injectable({
  providedIn: 'root'
})
export class StorageServiceService {

  constructor(private http:HttpClient) { }

  //---GET IMAGENES--//
  readonly UrlGetCartas = "http://127.0.0.1:3333/Cartas";
  carta:any;
  GetCartas(){
    this.carta=this.http.get(this.UrlGetCartas);
    console.log(this.carta)
    return this.carta;
  }

}
