import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class StorageServiceService {

  constructor(private http:HttpClient) { }

  //---GET IMAGENES--//
  readonly UrlGetImagenes = "http://127.0.0.1:3333/Imagen";
  GetImage(){
    return this.http.get(this.UrlGetImagenes);
  }

}
