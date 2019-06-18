import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageServiceService {

  constructor(private http:HttpClient) { }

  //---GET IMAGENES--//
  readonly UrlGetImagenes = "http://127.0.0.1:3333/Imagen";
  img:any;
  GetImage(){
    this.img=this.http.get(this.UrlGetImagenes);
    return this.img;
  }

}
