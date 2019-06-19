import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageServiceService {

  constructor(private http:HttpClient) { }

  //---GET IMAGENES--//
  readonly UrlGetCartas = "http://127.0.0.1:3333/Imagen";
  img:any;
  GetCartas(){
    this.img=this.http.get(this.UrlGetCartas);
    return this.img;
  }

}
