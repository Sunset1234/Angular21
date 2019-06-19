import { Component, OnChanges } from '@angular/core';
import { StorageServiceService} from'./Servicios/storage-service.service';

import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import { Ptor } from 'protractor';
import { Carta } from './Modelos/Carta';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{

  title = 'BlackJack';

  constructor(private _StorageService:StorageServiceService){
    
  }

  img:any;
  img2:any;
  getImage(){
    this._StorageService.GetCartas().subscribe(resultado => {
      this.img=resultado;
      this.img2=this.img[2].src;
      console.log(this.img2);
    });
  }

}
